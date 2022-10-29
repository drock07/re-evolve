import GameState from './GameState'
import Resource from './types/Resources'

export default class ResourceManager {
  public enable(state: GameState, resource: Resource): void {
    const r = state.resources[resource]
    if (r) {
      r.display = true
    } else {
      state.resources[resource] = {
        display: true,
        amount: 0,
        max: 100,
        rate: 0,
      }
    }
  }

  public disable(state: GameState, resource: Resource): void {
    const r = state.resources[resource]
    if (r) {
      r.display = false
    }
  }
}
