import GameState from './GameState/index.ts'
import buildings, { BuildingDescription, BuildingIds } from './Buildings.ts'
import BuildingView from './types/BuildingView.ts'

export default class BuildingManager {
  private calculateCost(
    base: number,
    multiplier: number,
    count: number
  ): number {
    return count * multiplier + base
  }

  private canAfford(
    state: GameState,
    building: BuildingDescription,
    buildingCount: number
  ): boolean {
    if (!building.cost) return true

    return building.cost.every(({ resource, base, multiplier }) => {
      const r = state.resources[resource]
      if (!r) return false
      const amount = this.calculateCost(base, multiplier, buildingCount)
      return r.amount >= amount
    })
  }

  public getEnabledBuildings(
    state: GameState,
    dispatchStateEdit: (editState: (s: GameState) => void) => void
  ): BuildingView[] {
    const filteredBuildings: BuildingView[] = []

    for (const id in buildings) {
      const buildingId = id as BuildingIds
      const building = buildings[buildingId]
      const buildingState = state.buildings[buildingId]

      const isAvailable = building.available(state)
      if (!isAvailable) continue

      filteredBuildings.push({
        id,
        title: building.title,
        description: building.description,
        effectDescription:
          building.effectDescription instanceof Function
            ? building.effectDescription(state)
            : building.effectDescription,
        disabled: !this.canAfford(state, building, buildingState?.amount ?? 0),
        amount: buildingState?.amount ?? 0,
        cost: building.cost?.map(({ resource, base, multiplier }) => {
          return {
            resource,
            amount: this.calculateCost(
              base,
              multiplier,
              buildingState?.amount ?? 0
            ),
          }
        }),
        action: () => {
          dispatchStateEdit((s) => {
            let buildingState = s.buildings[buildingId]
            if (!buildingState) {
              buildingState = s.buildings[buildingId] = {
                display: true,
                amount: 0,
              }
            }

            building.cost?.forEach(({ resource, base, multiplier }) => {
              const r = s.resources[resource]
              if (!r) return
              const amount = this.calculateCost(
                base,
                multiplier,
                buildingState?.amount ?? 0
              )
              r.amount -= amount
            })

            buildingState.amount += 1

            if (building.modifies?.resources) {
              building.modifies.resources.forEach(({ resource, rate, max }) => {
                const r = s.resources[resource]
                if (!r) return
                if (max) r.adjustModifier(buildingId, 'max', max)
                if (rate) {
                  if (typeof rate === 'number') {
                    r.adjustModifier(buildingId, 'rate', rate)
                  } else {
                    /// TODO
                    r.adjustModifier(buildingId, 'rate', 1)
                  }
                }
              })
            }
          })
        },
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
