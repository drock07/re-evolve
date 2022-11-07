import clsx from 'clsx'
import ActionView from '~/game/types/ActionView'
import BuildingView from '~/game/types/BuildingView'
import PanelTitle from './PanelTitle'

function ActionsPanel({
  actions = [],
  buildings = [],
  className,
}: {
  actions: ActionView[]
  buildings: BuildingView[]
  className?: string
}) {
  return (
    <div
      className={clsx('grid grid-cols-1 grid-rows-[auto_1fr_auto]', className)}
    >
      <PanelTitle>Actions</PanelTitle>
      <div className='overflow-y-auto'>
        {actions.map(({ id, title, description, disabled, action }) => (
          <div key={id}>{title}</div>
        ))}
      </div>
      <div className='bg-gray-200'>footer</div>
    </div>
  )
}

export default ActionsPanel
