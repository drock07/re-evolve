import Buildings from './Buildings.ts'
import GameState from './GameState/index.ts'
import ResourceState from './GameState/ResourceState.ts'
import Resources from './types/Resources.ts'
import ResourceView from './types/ResourceView.ts'

export default class ResourceManager {
  public enable(state: GameState, resource: Resources): void {
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

  public disable(state: GameState, resource: Resources): void {
    const r = state.resources[resource]
    if (r) {
      r.display = false
    }
  }

  public getEnabledResources(state: GameState): ResourceView[] {
    const filteredResources: ResourceView[] = []

    let id: Resources
    for (id in state.resources) {
      const r = state.resources[id]
      if (!r?.display) continue

      filteredResources.push({
        id,
        title: id,
        amount: r.amount,
        max: r.max,
        rate: r.rate,
        modifiers: r.modifiers.map((m) => ({
          buildingId: m.id,
          buildingName: Buildings[m.id].title,
          max: m.max,
          rate: m.rate,
        })),
      })
    }

    return filteredResources
  }
}
