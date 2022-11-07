import { useGame } from './hooks'

function App() {
  const game = useGame()

  return (
    <div className='flex'>
      <div className='ml-auto'>
        {game.resources.map(({ id, title, amount, max, rate, modifiers }) => (
          <div key={id}>
            <div className='flex flex-row'>
              <span className='flex-1'>{title}</span>
              <span>
                {amount} / {max}
              </span>
              <span>{rate}/s</span>
            </div>
            <div>
              {modifiers.map(({ buildingId, buildingName, max, rate }) => (
                <div key={buildingId}>
                  <span>{buildingName}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
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
