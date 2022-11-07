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
      <div className='gap-2 overflow-y-auto p-2 md:flex md:items-start md:justify-start'>
        {actions.map(({ id, title, description, disabled, action }) => (
          <button
            type='button'
            key={id}
            className='md:flex-inline mb-2 flex w-full flex-col rounded-md border p-3 text-left md:w-1/2'
            disabled={disabled}
            onClick={() => action()}
          >
            <span>{title}</span>
            <span className='text-sm'>{description}</span>
          </button>
        ))}
      </div>
      <div className='bg-gray-200'>footer</div>
    </div>
  )
}

export default ActionsPanel
