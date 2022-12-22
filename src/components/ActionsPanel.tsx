import { useState } from 'react'
import clsx from 'clsx'
import { GiStoneAxe, GiHouse, GiMagnifyingGlass } from 'react-icons/gi'
import ActionView from '~/game/types/ActionView'
import BuildingView from '~/game/types/BuildingView'
import ActionButton from './ActionButton'
import PanelTitle from './PanelTitle'

enum TabIds {
  Actions = 'actions',
  Buildings = 'buildings',
  Research = 'research',
}

interface Tab {
  title: string
  icon: React.ReactElement
  content: React.ReactElement
}

function ActionsPanel({
  actions = [],
  buildings = [],
  className,
}: {
  actions: ActionView[]
  buildings: BuildingView[]
  className?: string
}) {
  const [currentTab, setCurrentTab] = useState<TabIds>(TabIds.Actions)

  const tabs: {
    [key in TabIds]: Tab
  } = {
    [TabIds.Actions]: {
      title: 'Collect',
      icon: <GiStoneAxe />,
      content: (
        <>
          {actions.map(({ id, title, description, disabled, action, cost }) => (
            <ActionButton
              key={id}
              title={title}
              description={description}
              disabled={disabled}
              cost={cost}
              action={action}
            />
          ))}
        </>
      ),
    },
    [TabIds.Buildings]: {
      title: 'Buildings',
      icon: <GiHouse />,
      content: (
        <>
          {buildings.map(
            ({
              id,
              title,
              description,
              effectDescription,
              amount,
              disabled,
              action,
              cost,
            }) => (
              <ActionButton
                key={id}
                title={title}
                description={description}
                effectDescription={effectDescription}
                amount={amount}
                disabled={disabled}
                cost={cost}
                action={action}
              />
            )
          )}
        </>
      ),
    },
    [TabIds.Research]: {
      title: 'Research',
      icon: <GiMagnifyingGlass />,
      content: <div></div>,
    },
  }

  return (
    <div className={clsx('flex h-full flex-col overflow-hidden', className)}>
      <PanelTitle>Actions</PanelTitle>
      <div className='grid flex-1 grid-cols-1 content-start gap-2 overflow-y-auto p-2 md:order-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {tabs[currentTab].content}
      </div>
      <div className='safe-bottom flex flex-row justify-around bg-gray-200 p-2 md:order-2 md:justify-start md:gap-4 md:bg-transparent'>
        {(Object.entries(tabs) as [TabIds, Tab][]).map(
          ([id, { title, icon }]) => (
            <button
              key={id}
              type='button'
              className={clsx(
                'flex flex-col items-center pb-1 after:mt-1 after:h-0.5 after:transition-[width] after:content-[""]',
                currentTab === id
                  ? 'after:w-full after:bg-blue-300'
                  : 'after:w-4/5'
              )}
              onClick={() => setCurrentTab(id)}
            >
              <div className='mb-1 text-xl md:hidden'>{icon}</div>
              <div className='text-sm'>{title}</div>
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default ActionsPanel
