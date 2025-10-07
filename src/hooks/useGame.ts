import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Game, { GameLoopManager } from "../game/index.ts";

interface GameData {
  game: Game;
  isRunning: boolean;
}

interface GameControls {
  start: () => void;
  stop: () => void;
}

function useGame(): [GameData, GameControls] {
  const gameRef = useRef<Game | null>(null);
  const gameLoopRef = useRef<GameLoopManager | null>(null);
  const unregisterRef = useRef<(() => void) | null>(null);

  if (!gameRef.current) {
    gameRef.current = new Game();
  }
  if (!gameLoopRef.current) {
    gameLoopRef.current = new GameLoopManager();
  }

  const game = gameRef.current;
  const gameLoop = gameLoopRef.current;

  // Subscribe to game state changes
  useSyncExternalStore(
    useCallback(
      (onStoreChange) => game.subscribeToStateChange(onStoreChange),
      [game],
    ),
    () => game.state,
  );

  // Subscribe to gameLoop isRunning state
  const isRunning = useSyncExternalStore(
    useCallback(
      (onStoreChange) => gameLoop.subscribeToStateChange(onStoreChange),
      [gameLoop],
    ),
    () => gameLoop.isRunning,
  );

  // Register game loop (but don't start it)
  useEffect(() => {
    unregisterRef.current = game.registerGameLoop(gameLoop);

    return () => {
      gameLoop.stop();
      unregisterRef.current?.();
      gameLoop.destroy();
      game.destroy();
    };
  }, [game, gameLoop]);

  const start = useCallback(() => {
    gameLoop.start();
  }, [gameLoop]);

  const stop = useCallback(() => {
    gameLoop.stop();
  }, [gameLoop]);

  const controls: GameControls = { start, stop };
  const gameData: GameData = { game, isRunning };

  return [gameData, controls];
}

export default useGame;
