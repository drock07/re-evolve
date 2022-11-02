import GameState from './GameState'
import ResourceState from './GameState/ResourceState'
import Resource from './types/Resources'

export default class ResourceManager {
  public enable(state: GameState, resource: Resource): void {
    const r = state.resources[resource]
    if (r) {
      r.display = true
    } else {
      state.resources[resource] = new ResourceState({
        display: true,
        max: 100,
      })
    }
  }

  public disable(state: GameState, resource: Resource): void {
    const r = state.resources[resource]
    if (r) {
      r.display = false
    }
  }
}
