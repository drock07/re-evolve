import GameState from './GameState/index.ts'
import actions, { ActionDescription } from './Actions.ts'
import ActionView from './types/ActionView.ts'

export default class ActionManager {
  private canAfford(state: GameState, action: ActionDescription): boolean {
    if (!action.cost) return true

    return action.cost.every(({ resource, amount }) => {
      const r = state.resources[resource]
      if (!r) return false
      amount = amount instanceof Function ? amount(state) : amount
      return r.amount >= amount
    })
  }

  public getEnabledActions(
    state: GameState,
    dispatchStateEdit: (editState: (s: GameState) => void) => void
  ): ActionView[] {
    return state.actions.reduce<ActionView[]>((filteredActions, actionId) => {
      const action = actions[actionId]
      filteredActions.push({
        id: actionId,
        title: action.title,
        description: action.description,
        disabled: !this.canAfford(state, action),
        cost: action.cost?.map(({ resource, amount }) => ({
          resource,
          amount: amount instanceof Function ? amount(state) : amount,
        })),
        action: () =>
          dispatchStateEdit((s) => {
            action.cost?.forEach(({ resource, amount }) => {
              const r = s.resources[resource]
              if (!r) return
              amount = amount instanceof Function ? amount(s) : amount
              r.amount -= amount
            })

            action.results.forEach(({ resource, amount }) => {
              const r = s.resources[resource]
              if (!r) return
              amount = amount instanceof Function ? amount(s) : amount
              r.amount += amount
            })
          }),
      })
      return filteredActions
    }, [])
  }
}
