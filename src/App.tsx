import { useGame } from './hooks'
import ResourcesPanel from './components/ResourcesPanel'
import ActionsPanel from './components/ActionsPanel'
import MessagesPanel from './components/MessagesPanel'

function App() {
  const game = useGame()

  return (
    <div className='grid h-full w-full grid-cols-1 grid-rows-[auto_1fr_2fr_3fr] md:grid-cols-[300px_1fr_250px] md:grid-rows-[auto_1fr] md:gap-x-2'>
      <header className='bg-gray-200 md:col-span-3'>{game.state.stage}</header>
      <MessagesPanel className='md:order-3' />
      <ResourcesPanel resources={game.resources} />
      <ActionsPanel actions={game.actions} buildings={game.buildings} />
    </div>
  )
}

export default App
