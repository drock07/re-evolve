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
          {actions.map(({ id, title, description, disabled, action }) => (
            <ActionButton
              key={id}
              title={title}
              description={description}
              disabled={disabled}
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
          {buildings.map(({ id, title, description, disabled, action }) => (
            <ActionButton
              key={id}
              title={title}
              description={description}
              disabled={disabled}
              action={action}
            />
          ))}
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
    <div
      className={clsx(
        'grid grid-cols-1 grid-rows-[auto_1fr_auto] md:grid-rows-[auto_auto_1fr]',
        className
      )}
    >
      <PanelTitle>Actions</PanelTitle>
      <div className='gap-2 overflow-y-auto p-2 md:order-3 md:flex md:items-start md:justify-start md:px-0 md:py-2'>
        {tabs[currentTab].content}
      </div>
      <div className='flex flex-row justify-around bg-gray-200 p-2 md:order-2 md:justify-start md:gap-4 md:bg-transparent'>
        {(Object.entries(tabs) as [TabIds, Tab][]).map(
          ([id, { title, icon }]) => (
            <button
              key={id}
              type='button'
              className='flex flex-col items-center'
              onClick={() => setCurrentTab(id)}
            >
              <div className='mb-1 text-2xl md:hidden'>{icon}</div>
              <div className='text-sm'>{title}</div>
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default ActionsPanel
