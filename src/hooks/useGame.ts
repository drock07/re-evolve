import { useEffect, useCallback, useMemo } from "react";
import { useLocalStorage } from "react-use";
import Game, { type GameState } from "~/game";

const game = new Game();

function useGame() {
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

  useEffect(() => {
    game.start();
  }, []);

  const start = useCallback(() => {
    game.start();
  }, []);

  const stop = useCallback(() => {
    game.stop();
  }, []);

  const importGameState = useCallback(() => {}, []);

  const exportGameState = useCallback(() => {}, []);

  const metaMethods = useMemo(
    () => ({
      start,
      stop,
      importGameState,
      exportGameState,
    }),
    []
  );

  return [
    // game state
    // command dispatcher
    metaMethods,
  ];
}

export default useGame;
