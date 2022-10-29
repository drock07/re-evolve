import { useState } from 'react'
// import { GameContextProvider } from './contexts/GameContext'
import { useGame, useIsMobileBreakpoint } from './hooks'

import ResourcesPane from './components/ResourcesPane'
import ActionsPane from './components/ActionsPane'
import MessagesPane from './components/MessagesPane'
import Header from './components/Header'
import FooterTab from './components/FooterTab'

import { GiWoodPile, GiFist, GiTalk } from 'react-icons/gi'

const Tabs = {
  RESOURCES: 'RESOURCES',
  ACTIONS: 'ACTIONS',
  MESSAGES: 'MESSAGES',
}

function App() {
  const isMobile = useIsMobileBreakpoint()
  const [currentTab, setCurrentTab] = useState(Tabs.RESOURCES)

  const [gameState, game] = useGame()

  return (
    // <GameContextProvider>
    // <div className='grid h-full w-full grid-cols-1  grid-rows-[60px_1fr_60px] md:grid-cols-[100px_1fr_100px]'>
    <div>
      <pre>{JSON.stringify(gameState, null, 2)}</pre>

      {game.actions.map(({ id, title, disabled, action }) => (
        <button key={id} disabled={disabled} onClick={action}>
          {title}
        </button>
      ))}
      {/* <Header />

        {isMobile ? (
          {
            [Tabs.RESOURCES]: <ResourcesPane />,
            [Tabs.ACTIONS]: <ActionsPane />,
            [Tabs.MESSAGES]: <MessagesPane />,
          }[currentTab]
        ) : (
          <>
            <ResourcesPane />
            <ActionsPane />
            <MessagesPane />
          </>
        )}

        <footer className='flex flex-row flex-nowrap items-center bg-sky-300 md:col-span-3'>
          <FooterTab
            icon={<GiWoodPile />}
            label='Resources'
            onClick={() => setCurrentTab(Tabs.RESOURCES)}
            active={currentTab === Tabs.RESOURCES}
          />
          <FooterTab
            icon={<GiFist />}
            label='Actions'
            onClick={() => setCurrentTab(Tabs.ACTIONS)}
            active={currentTab === Tabs.ACTIONS}
          />
          <FooterTab
            icon={<GiTalk />}
            label='Messages'
            onClick={() => setCurrentTab(Tabs.MESSAGES)}
            active={currentTab === Tabs.MESSAGES}
          />
        </footer> */}
    </div>
    // </GameContextProvider>
  )
}

export default App
