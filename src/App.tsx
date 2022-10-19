import { GameContextProvider } from './contexts/GameContext'

function App() {
  return (
    <GameContextProvider>
      <div className='grid h-full w-full grid-cols-site-layout grid-rows-site-layout'>
        <header className='col-span-3 bg-slate-300'>header</header>

        <div className='bg-lime-100'>resources</div>

        <div className='bg-stone-300'>actions</div>

        <div className='bg-emerald-100'>message log</div>

        <footer className='col-span-3 bg-sky-300'>footer</footer>
      </div>
    </GameContextProvider>
  )
}

export default App
