import { useState } from 'react'
// import {clsx} from '@nick/clsx'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import * as Collapsible from '@radix-ui/react-collapsible'
// import * as Tooltip from '@radix-ui/react-tooltip'
// import { useMediaQuery } from '@react-hookz/web'

function ActionButton({
  title,
  description,
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
  const [isDetailsOpen, setIsDetailsOpen] = useState(true)

  return (
    <Collapsible.Root
      open={isDetailsOpen}
      onOpenChange={setIsDetailsOpen}
      className='overflow-hidden rounded bg-black/20'
    >
      <Collapsible.Trigger asChild>
        <button
          type='button'
          title={`Toggle ${title} open/closed`}
          className='flex w-full flex-row items-center p-2 pb-0'
          onClick={() => setIsDetailsOpen((s: boolean) => !s)}
        >
          <ChevronDownIcon className='mr-1 h-5 w-5' /> {title}
          <span className='ml-auto'>
            {amount !== undefined ? `x${amount}` : null}
          </span>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content className='overflow-hidden data-[state=open]:animate-[slideDown_300ms_ease-out] data-[state=closed]:animate-[slideUp_300ms_ease-out]'>
        <div className='flex flex-col p-2 text-sm md:flex-row'>
          <div className='flex-1'>{description}</div>
          <div className='flex-1'>
            {(cost?.length ?? 0) > 0 && (
              <>
                <div className='w-full rounded bg-white/30 p-1 text-xs uppercase'>
                  COSTS
                </div>
                {cost?.map(({ resource, amount }) => (
                  <div key={resource} className='flex flex-row'>
                    <div className='flex-1'>{resource}</div>
                    <div className=''>{amount}</div>
                    <div></div>
                  </div>
                ))}
              </>
            )}
            <button
              type='button'
              className='float-right cursor-pointer rounded bg-white/30 py-1 px-2 text-xs'
              onClick={() => action()}
              disabled={disabled}
            >
              Do
            </button>
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )

  // const isDesktop = useMediaQuery('(min-width: 768px)')

  // const Root = isDesktop ? Tooltip.Root : Collapsible.Root

  // let button = (
  //   <button
  //     type='button'
  //     className='relative flex w-full flex-col p-2'
  //     onClick={() => action()}
  //     disabled={disabled}
  //   >
  //     <span>{title}</span>
  //     <span className='text-sm'>{description}</span>
  //     {typeof amount !== undefined && (
  //       <div className='absolute top-0 right-0 rounded-bl rounded-tr border-b border-l bg-white px-1'>
  //         {amount}
  //       </div>
  //     )}
  //   </button>
  // )

  // if (isDesktop) {
  //   button = <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
  // }

  // const detailContent = (
  //   <div className='divide-y md:text-center'>
  //     <div>
  //       {cost?.map(({ resource, amount }) => (
  //         <div key={resource}>
  //           {resource}: {amount}
  //         </div>
  //       ))}
  //       {!cost && 'No cost'}
  //     </div>
  //     {effectDescription && <div>{effectDescription}</div>}
  //   </div>
  // )

  // const detailWrapper = isDesktop ? (
  //   <Tooltip.Portal>
  //     <Tooltip.Content
  //       className='rounded border bg-white py-2 px-4 drop-shadow'
  //       sideOffset={8}
  //       hideWhenDetached
  //       side='bottom'
  //       onPointerDownOutside={(e) => e.preventDefault()}
  //     >
  //       {detailContent}
  //       <Tooltip.Arrow className='fill-white drop-shadow' />
  //     </Tooltip.Content>
  //   </Tooltip.Portal>
  // ) : (
  //   <Collapsible.Content className='overflow-hidden data-[state=open]:animate-[slideDown_300ms_ease-out] data-[state=closed]:animate-[slideUp_300ms_ease-out]'>
  //     <div className='mx-2 bg-gray-50 p-2'>{detailContent}</div>
  //   </Collapsible.Content>
  // )

  // return (
  //   <Root open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
  //     <div
  //       className={clsx('flex flex-row divide-x rounded border', {
  //         'bg-gray-100': disabled,
  //       })}
  //     >
  //       {button}
  //       {!isDesktop && (
  //         <Collapsible.Trigger asChild>
  //           <button
  //             type='button'
  //             title='Info'
  //             onClick={() => setIsDetailsOpen((s) => !s)}
  //             className={`w-10 ${isDetailsOpen ? 'bg-gray-50' : 'bg-white'}`}
  //           >
  //             <GiInfo className='m-auto' />
  //           </button>
  //         </Collapsible.Trigger>
  //       )}
  //     </div>
  //     {detailWrapper}
  //   </Root>
  // )
}

export default ActionButton
