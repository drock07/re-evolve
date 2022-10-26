import clsx from 'clsx'

function FooterTab({
  icon,
  label,
  active = false,
  ...props
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <div
      {...props}
      className={clsx(
        'flex flex-1 flex-col items-center',
        active && 'bg-white'
      )}
    >
      <div className='text-3xl'>{icon}</div>
      {label && <div className='text-sm'>{label}</div>}
    </div>
  )
}

export default FooterTab
