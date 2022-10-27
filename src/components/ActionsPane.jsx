import { HarvestActions } from '~/game'
import { useGameContext } from '~/contexts/GameContext'

function ActionsPane() {
  const [{ actions }] = useGameContext()
  const visibleActions = Object.entries(actions)
    .filter(([, { display }]) => display)
    .map(([id]) => HarvestActions[id])
  return (
    <div className='bg-stone-300'>
      {visibleActions.map(({ title, description }) => (
        <div>
          <div>{title}</div>
          <div>{description}</div>
        </div>
      ))}
    </div>
  )
}

export default ActionsPane
