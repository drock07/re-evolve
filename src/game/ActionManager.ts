import GameState from './GameState'
import actions, { ActionDescription } from './Actions'

interface Action {
  id: string
  title: string
  description: string
  disabled: boolean
  action: () => void
}

export default class ActionManager {
  private canAfford(state: GameState, action: ActionDescription): boolean {
    if (!action.cost) return true

    return action.cost.every(({ resource, amount }) => {
      const r = state.resources[resource]
      if (!r) return false
      amount = amount instanceof Function ? amount() : amount
      return r.amount >= amount
    })
  }

  public getEnabledActions(
    state: GameState,
    dispatchStateEdit: (editState: (s: GameState) => void) => void
  ): Action[] {
    return state.actions.reduce<Action[]>((filteredActions, actionId) => {
      const action = actions[actionId]
      filteredActions.push({
        id: actionId,
        title: action.title,
        description: action.description,
        disabled: !this.canAfford(state, action),
        action: () =>
          dispatchStateEdit((s) => {
            action.cost?.forEach(({ resource, amount }) => {
              const r = s.resources[resource]
              if (!r) return
              amount = amount instanceof Function ? amount() : amount
              r.amount -= amount
            })

            action.results.forEach(({ resource, amount }) => {
              const r = s.resources[resource]
              if (!r) return
              amount = amount instanceof Function ? amount() : amount
              r.amount += amount
            })
          }),
      })
      return filteredActions
    }, [])
  }
}
