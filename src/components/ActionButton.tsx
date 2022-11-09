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
      className='md:flex-inline mb-2 flex w-full flex-col rounded-md border p-3 text-left disabled:bg-gray-100 disabled:text-gray-500 md:w-1/2'
      disabled={disabled}
      onClick={() => action()}
    >
      <span>{title}</span>
      <span className='text-sm'>{description}</span>
    </button>
  )
}

export default ActionButton
