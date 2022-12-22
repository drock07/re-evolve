import { useGame } from './hooks'
import ResourcesPanel from './components/ResourcesPanel'
import ActionsPanel from './components/ActionsPanel'
import MessagesPanel from './components/MessagesPanel'
import * as Tooltip from '@radix-ui/react-tooltip'

function App() {
  const game = useGame()

  return (
    <Tooltip.Provider delayDuration={0}>
      <div className='grid h-full w-full grid-cols-1 grid-rows-[auto_1fr_3fr] divide-y overflow-hidden md:grid-cols-[300px_1fr] md:grid-rows-[auto_1fr] md:gap-x-2'>
        <header className='bg-gray-200 md:col-span-3'>
          {game.state.stage}
        </header>
        {/* <MessagesPanel className='md:order-3' /> */}
        <ResourcesPanel resources={game.resources} />
        <ActionsPanel actions={game.actions} buildings={game.buildings} />
        <div className='hidden w-80 overflow-auto md:block'>
          <pre>{JSON.stringify(game.state, null, 2)}</pre>
        </div>
      </div>
    </Tooltip.Provider>
  )
}

export default App
