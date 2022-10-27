import { createContext, useContext } from 'react'
import { useGame } from '~/hooks'
import { Game } from '~/game'
const GameContext = createContext<ReturnType<typeof useGame>>([
  Game.new(),
  {
    start: () => {},
    stop: () => {},
    importGame: (x) => {},
    exportGame: () => 'game',
  },
])

function GameContextProvider(props: any) {
  const ctx = useGame()
  return <GameContext.Provider value={ctx} {...props} />
}

const useGameContext = () => useContext(GameContext)

export { GameContext, GameContextProvider, useGameContext }
