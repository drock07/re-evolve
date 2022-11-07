import { useEffect, useCallback, useMemo, useState, useRef } from 'react'
// import LZString from 'lz-string'
import Game, { GameLoopManager, GameState } from '~/game'

// const gameLoop = new GameLoopManager()

function useGame(): Game {
  const [game] = useState(() => new Game())
  const [state, setState] = useState<GameState>(game.state)

  useEffect(() => {
    game.subscribeToStateChange(setState)
    return () => game.unsubscribeToStateChange(setState)
  }, [])

  // useEffect(() => {
  //   function short() {
  //     dispatch({ type: 'short' })
  //   }
  //   function mid() {
  //     dispatch({ type: 'mid' })
  //   }
  //   function long() {
  //     dispatch({ type: 'long' })
  //   }
  //   gameLoop.subscribe('short', short)
  //   gameLoop.subscribe('mid', mid)
  //   gameLoop.subscribe('long', long)
  //   gameLoop.start()
  //   return () => {
  //     gameLoop.unsubscribe('short', short)
  //     gameLoop.unsubscribe('mid', mid)
  //     gameLoop.unsubscribe('long', long)
  //   }
  // }, [])
  // const dispatchCommands = useCallback((commands: Command | Command[]) => {
  //   dispatch({ type: 'commands', commands })
  // }, [])
  // const start = useCallback(() => {
  //   gameLoop.start()
  // }, [])
  // const stop = useCallback(() => {
  //   gameLoop.stop()
  // }, [])
  // const importGame = useCallback((importString: string) => {
  //   const gameStateString = LZString.decompressFromBase64(importString)
  //   if (gameStateString === null)
  //     throw Error('importGame: corrupted import string')
  //   const gameState = JSON.parse(gameStateString)
  //   // migrate gameState if previous version
  //   dispatch({
  //     type: 'import',
  //     data: gameState,
  //   })
  // }, [])
  // const exportGame = useCallback(() => {
  //   return LZString.compressToBase64(JSON.stringify(gameState))
  // }, [gameState])
  // const metaMethods = useMemo(
  //   () => ({
  //     start,
  //     stop,
  //     importGame,
  //     exportGame,
  //   }),
  //   []
  // )
  // return [
  //   gameState,
  //   // command dispatcher
  //   metaMethods,
  // ]
  return game
}

export default useGame
