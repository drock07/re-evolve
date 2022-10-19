import { useEffect, useCallback, useMemo, useState } from 'react'
import { useLocalStorage } from 'react-use'
import LZString from 'lz-string'
import { Game, GameLoopManager, type GameState } from '~/game'

const game = new Game()
const gameLoop = new GameLoopManager()

interface MetaMethods {
  start: () => void
  stop: () => void
  importGame: (importString: string) => void
  exportGame: () => void
}

export type useGameReturnValues = [GameState, MetaMethods]

function useGame(): useGameReturnValues {
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
  const [gameState, setGameState] = useState<GameState>(game.new())

  useEffect(() => {
    function short() {
      setGameState((gs) => (gs ? game.fastLoop(gs) : gs))
    }
    function mid() {
      setGameState((gs) => (gs ? game.midLoop(gs) : gs))
    }
    function long() {
      setGameState((gs) => (gs ? game.longLoop(gs) : gs))
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

    setGameState(gameState)
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
