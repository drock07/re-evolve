import GameState from './GameState'
import buildings, { BuildingDescription, BuildingIds } from './Buildings'
import BuildingView from './types/BuildingView'

export default class BuildingManager {
  private canAfford(state: GameState, building: BuildingDescription): boolean {
    if (!building.cost) return true

    return building.cost.every(({ resource, amount }) => {
      const r = state.resources[resource]
      if (!r) return false
      amount = amount instanceof Function ? amount(state) : amount
      return r.amount >= amount
    })
  }

  public getEnabledBuildings(
    state: GameState,
    dispatchStateEdit: (editState: (s: GameState) => void) => void
  ): BuildingView[] {
    const filteredBuildings: BuildingView[] = []

    let id: BuildingIds
    for (id in state.buildings) {
      const buildingState = state.buildings[id]
      if (!buildingState?.display) continue

      const building = buildings[id]
      filteredBuildings.push({
        id,
        title: building.title,
        description: building.description,
        disabled: !this.canAfford(state, building),
        action: () =>
          dispatchStateEdit((s) => {
            building.cost?.forEach(({ resource, amount }) => {
              const r = s.resources[resource]
              if (!r) return
              amount = amount instanceof Function ? amount(s) : amount
              r.amount -= amount
            })

            if (building.modifies?.resources) {
              building.modifies.resources.forEach(({ resource, rate, max }) => {
                const r = s.resources[resource]
                if (!r) return
                if (max) r.adjustModifier(id, 'max', max)
              })
            }
          }),
      })
    }

    return filteredBuildings
  }

  public enable(state: GameState, id: BuildingIds): void {
    if (state.buildings[id]) {
      state.buildings[id]!.display = true
    } else {
      state.buildings[id] = {
        display: true,
        amount: 0,
      }
    }
  }
}
