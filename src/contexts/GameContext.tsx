import { createContext, useContext } from 'react'
import { useGame } from '~/hooks'
const GameContext = createContext<ReturnType<typeof useGame> | []>([])

function GameContextProvider(props: any) {
  const ctx = useGame()
  return <GameContext.Provider value={ctx} {...props} />
}

const useGameContext = () => useContext(GameContext)

export { GameContext, GameContextProvider, useGameContext }
