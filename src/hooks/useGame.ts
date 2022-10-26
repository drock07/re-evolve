import { useEffect, useCallback, useMemo, useState, useReducer } from 'react'
import { useLocalStorage } from 'react-use'
import LZString from 'lz-string'
import { Game, GameLoopManager, type GameState, type Command } from '~/game'

const game = new Game()
const gameLoop = new GameLoopManager()

type ACTIONTYPE =
  | { type: 'short' }
  | { type: 'mid' }
  | { type: 'long' }
  | { type: 'import'; data: GameState }
  | { type: 'commands'; commands: Command | Command[] }

function reducer(state: GameState, action: ACTIONTYPE): GameState {
  switch (action.type) {
    case 'short':
      return game.fastLoop(state)
    case 'mid':
      return game.midLoop(state)
    case 'long':
      return game.longLoop(state)
    case 'import':
      return action.data
    case 'commands':
      return game.executeCommands(
        state,
        Array.isArray(action.commands) ? action.commands : [action.commands]
      )
    default:
      return state
  }
}

function useGame(): [GameState, typeof metaMethods] {
  // const [] = useLocalStorage(
  //   'gameState',
  //   {},
  //   {
  //     raw: false,
  //     serializer: (gameState: GameState): string => {
  //       return JSON.stringify(gameState)
  //     },
  //     deserializer: (saveString: string): GameState => {
  //       return JSON.parse(saveString)
  //     },
  //   }
  // )
  const [gameState, dispatch] = useReducer(reducer, game.new())

  useEffect(() => {
    function short() {
      dispatch({ type: 'short' })
    }
    function mid() {
      dispatch({ type: 'mid' })
    }
    function long() {
      dispatch({ type: 'long' })
    }

    gameLoop.subscribe('short', short)
    gameLoop.subscribe('mid', mid)
    gameLoop.subscribe('long', long)

    gameLoop.start()
    return () => {
      gameLoop.unsubscribe('short', short)
      gameLoop.unsubscribe('mid', mid)
      gameLoop.unsubscribe('long', long)
    }
  }, [])

  const dispatchCommands = useCallback((commands: Command | Command[]) => {
    dispatch({ type: 'commands', commands })
  }, [])

  const start = useCallback(() => {
    gameLoop.start()
  }, [])

  const stop = useCallback(() => {
    gameLoop.stop()
  }, [])

  const importGame = useCallback((importString: string) => {
    const gameStateString = LZString.decompressFromBase64(importString)
    if (gameStateString === null)
      throw Error('importGame: corrupted import string')
    const gameState = JSON.parse(gameStateString)

    // migrate gameState if previous version

    dispatch({
      type: 'import',
      data: gameState,
    })
  }, [])

  const exportGame = useCallback(() => {
    return LZString.compressToBase64(JSON.stringify(gameState))
  }, [gameState])

  const metaMethods = useMemo(
    () => ({
      start,
      stop,
      importGame,
      exportGame,
    }),
    []
  )

  return [
    gameState,
    // command dispatcher
    metaMethods,
  ]
}

export default useGame
