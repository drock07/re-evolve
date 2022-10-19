import './App.css'
import { GameContextProvider } from './contexts/GameContext'

function App() {
  return (
    <GameContextProvider>
      <div className='App'>hello</div>
    </GameContextProvider>
  )
}

export default App
