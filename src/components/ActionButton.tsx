function ActionButton({
  title,
  description,
  disabled,
  action,
}: {
  title: string
  description: string
  disabled: boolean
  action: () => void
}) {
  return (
    <button
      type='button'
      className='md:flex-inline mb-2 flex w-full flex-col rounded-md border p-3 text-left md:w-1/2'
      disabled={disabled}
      onClick={() => action()}
    >
      <span>{title}</span>
      <span className='text-sm'>{description}</span>
    </button>
  )
}

export default ActionButton
