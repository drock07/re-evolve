import Buildings, { BuildingIds } from './Buildings'
import GameState from './GameState'
import ResourceState from './GameState/ResourceState'
import Resources from './types/Resources'

interface Resource {
  id: string
  title: string
  amount: number
  max: number
  rate: number
  modifiers: {
    buildingId: BuildingIds
    buildingName: string
    max?: number
    rate?: number
  }[]
}

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

  public getEnabledResources(state: GameState): Resource[] {
    const filteredResources: Resource[] = []

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
