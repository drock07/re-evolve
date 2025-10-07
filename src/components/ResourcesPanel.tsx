import clsx from 'clsx'
import type ResourceView from '../game/types/ResourceView.ts'
import PanelTitle from './PanelTitle.tsx'

function ResourcesPanel({
  resources = [],
  className,
}: {
  resources: ResourceView[]
  className?: string
}) {
  return (
    <div className={clsx('overflow-y-auto', className)}>
      <PanelTitle>Resources</PanelTitle>
      {resources.map(({ id, title, amount, max, rate }) => (
        <div
          key={id}
          className='flex items-center justify-between p-2 even:bg-slate-100'
        >
          <span>{title}</span>
          <div>
            {amount} / {max}
          </div>
          <div>{rate}/s</div>
        </div>
      ))}
    </div>
  )
}

export default ResourcesPanel
