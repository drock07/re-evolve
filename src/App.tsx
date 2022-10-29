import { useGame } from './hooks'

function App() {
  const [gameState, game] = useGame()

  return (
    <div>
      <pre>{JSON.stringify(gameState, null, 2)}</pre>

      {game.actions.map(({ id, title, disabled, action }) => (
        <button key={id} disabled={disabled} onClick={action}>
          {title}
        </button>
      ))}
    </div>
  )
}

export default App
