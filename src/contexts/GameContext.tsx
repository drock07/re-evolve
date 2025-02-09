import React, { createContext, useContext } from 'react'
import { useGame } from '../hooks/index.ts'

const GameContext = createContext<ReturnType<typeof useGame> | undefined>(
  undefined
)

function GameContextProvider(props: React.PropsWithChildren) {
  const ctx = useGame()
  return <GameContext.Provider value={ctx} {...props} />
}

const useGameContext = () => {
  const c = useContext(GameContext)
  if (c === undefined) {
    throw new Error('useGameContext must be inside a Provider with a value')
  }
  return c
}

export { GameContext, GameContextProvider, useGameContext }
