import { useGame } from './hooks'

function App() {
  const [gameState, game] = useGame()

  return (
    <div className='flex'>
      <pre>{JSON.stringify(gameState, null, 2)}</pre>

      <div className='ml-auto'>
        <div className='flex flex-col'>
          {game.actions.map(({ id, title, disabled, action }) => (
            <button
              type='button'
              className='rounded border border-slate-400 py-1 px-2 disabled:border-red-400'
              key={id}
              disabled={disabled}
              onClick={action}
            >
              {title}
            </button>
          ))}
        </div>

        <div className='my-2 w-full border-t border-slate-400' />

        <div className='flex flex-col'>
          {game.buildings.map(({ id, title, disabled, action }) => (
            <button
              type='button'
              className='rounded border border-slate-400 py-1 px-2 disabled:border-red-400'
              key={id}
              disabled={disabled}
              onClick={action}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
