import { createContext, useContext } from 'react'
import { useGame, useGameReturnValues } from '~/hooks'
const GameContext = createContext<useGameReturnValues | {}>({})

function GameContextProvider(props: any) {
  const ctx = useGame()
  return <GameContext.Provider value={ctx} {...props} />
}

const useGameContext = () => useContext(GameContext)

export { GameContext, GameContextProvider, useGameContext }
