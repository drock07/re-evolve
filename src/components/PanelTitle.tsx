import { clsx } from '@nick/clsx'

function PanelTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx('p-2 text-lg font-semibold', className)}>
      {children}
    </div>
  )
}

export default PanelTitle
