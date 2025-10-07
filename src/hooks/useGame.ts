import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Game, { GameLoopManager, GameState } from "../game/index.ts";

const gameLoop = new GameLoopManager();

function useGame(): Game {
  const [game] = useState(() => new Game());
  const [, setState] = useState<GameState>(game.state);

  useEffect(() => {
    game.subscribeToStateChange(setState);
    return () => game.unsubscribeToStateChange(setState);
  }, []);

  useEffect(() => {
    const unregister = game.registerGameLoop(gameLoop);
    gameLoop.start();
    return unregister;
  }, []);
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
  return game;
}

export default useGame;
