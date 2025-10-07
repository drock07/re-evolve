import clsx from 'clsx'
import PanelTitle from './PanelTitle.tsx'

function MessagesPanel({ className }: { className?: string }) {
  return (
    <div className={clsx(className)}>
      <PanelTitle className='hidden md:block'>Log</PanelTitle>
      messages appear here
    </div>
  )
}

export default MessagesPanel
