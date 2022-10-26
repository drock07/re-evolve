import { useGameContext } from '~/contexts/GameContext'

function ResourcesPane() {
  const [gameState] = useGameContext()
  const resources = gameState?.resources
  return (
    <div className=''>
      <h1>Resources</h1>
      {resources &&
        Object.entries(resources)
          .filter(([, resourceState]) => resourceState.display)
          .map(([resourceName, resourceState]) => (
            <div key={resourceName}>
              {resourceName}: {resourceState.amount}
            </div>
          ))}
    </div>
  )
}

export default ResourcesPane
