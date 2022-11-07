import { createContext, useContext } from 'react'
import { useGame } from '~/hooks'

const GameContext = createContext<ReturnType<typeof useGame> | undefined>(
  undefined
)

function GameContextProvider(props: any) {
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
