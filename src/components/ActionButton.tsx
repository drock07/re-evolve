import { useState } from 'react'
import clsx from 'clsx'
import { GiInfo } from 'react-icons/gi'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useMediaQuery } from '@react-hookz/web'

function ActionButton({
  title,
  description,
  effectDescription,
  amount,
  cost,
  disabled,
  action,
}: {
  title: string
  description: string
  effectDescription?: string
  amount?: number
  cost?: { resource: string; amount: number }[]
  disabled: boolean
  action: () => void
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const Root = isDesktop ? Tooltip.Root : Collapsible.Root

  let button = (
    <button
      type='button'
      className='relative flex w-full flex-col p-2'
      onClick={() => action()}
      disabled={disabled}
    >
      <span>{title}</span>
      <span className='text-sm'>{description}</span>
      {typeof amount !== undefined && (
        <div className='absolute top-0 right-0 rounded-bl rounded-tr border-b border-l bg-white px-1'>
          {amount}
        </div>
      )}
    </button>
  )

  if (isDesktop) {
    button = <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
  }

  const detailContent = (
    <div className='divide-y md:text-center'>
      <div>
        {cost?.map(({ resource, amount }) => (
          <div key={resource}>
            {resource}: {amount}
          </div>
        ))}
        {!cost && 'No cost'}
      </div>
      {effectDescription && <div>{effectDescription}</div>}
    </div>
  )

  const detailWrapper = isDesktop ? (
    <Tooltip.Portal>
      <Tooltip.Content
        className='rounded border bg-white py-2 px-4 drop-shadow'
        sideOffset={8}
        hideWhenDetached
        side='bottom'
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {detailContent}
        <Tooltip.Arrow className='fill-white drop-shadow' />
      </Tooltip.Content>
    </Tooltip.Portal>
  ) : (
    <Collapsible.Content className='overflow-hidden data-[state=open]:animate-[slideDown_300ms_ease-out] data-[state=closed]:animate-[slideUp_300ms_ease-out]'>
      <div className='mx-2 bg-gray-50 p-2'>{detailContent}</div>
    </Collapsible.Content>
  )

  return (
    <Root open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <div
        className={clsx('flex flex-row divide-x rounded border', {
          'bg-gray-100': disabled,
        })}
      >
        {button}
        {!isDesktop && (
          <Collapsible.Trigger asChild>
            <button
              type='button'
              title='Info'
              onClick={() => setIsDetailsOpen((s) => !s)}
              className={`w-10 ${isDetailsOpen ? 'bg-gray-50' : 'bg-white'}`}
            >
              <GiInfo className='m-auto' />
            </button>
          </Collapsible.Trigger>
        )}
      </div>
      {detailWrapper}
    </Root>
  )
}

export default ActionButton
