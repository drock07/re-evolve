// import { produce } from 'immer'
import produce from 'immer'
import ActionManager from './ActionManager'
import { ActionIds } from './Actions'
import BuildingManager from './BuildingManager'
import { BuildingIds } from './Buildings'
import GameState from './GameState/GameState'
import ResourceManager from './ResourceManager'
import Resource from './types/Resources'

type StateChangeCallback = (state: GameState) => void

export default class Game {
  private _state: GameState
  public get state(): GameState {
    return this._state
  }
  private set state(newValue: GameState) {
    this._state = newValue
    this.stateChangeSubscriptions.forEach((cb) => cb(this._state))
  }

  private stateChangeSubscriptions: StateChangeCallback[] = []
  private resourceManager: ResourceManager = new ResourceManager()
  private actionManager: ActionManager = new ActionManager()
  private buildingManager: BuildingManager = new BuildingManager()

  constructor(importString?: string) {
    if (importString) {
      this._state = new GameState()
    } else {
      var s = new GameState()
      this.resourceManager.enable(s, Resource.RNA)
      this.resourceManager.enable(s, Resource.DNA)
      s.actions.push(ActionIds.RNA)
      s.actions.push(ActionIds.DNA)
      this.buildingManager.enable(s, BuildingIds.MEMBRANE)
      this._state = s
    }
  }

  public subscribeToStateChange(callback: StateChangeCallback) {
    this.stateChangeSubscriptions.push(callback)
  }

  public unsubscribeToStateChange(callback: StateChangeCallback) {
    var index = this.stateChangeSubscriptions.findIndex((cb) => cb === callback)
    if (index < -1) return
    this.stateChangeSubscriptions = this.stateChangeSubscriptions.splice(
      index,
      1
    )
  }

  public fastLoop(): void {}
  public midLoop(): void {}
  public longLoop(): void {}

  public get actions() {
    return this.actionManager.getEnabledActions(this.state, (editState) => {
      this.state = produce(this.state, (draft) => {
        editState(draft)
      })
    })
  }

  public get buildings() {
    return this.buildingManager.getEnabledBuildings(this.state, (editState) => {
      this.state = produce(this.state, (draft) => {
        editState(draft)
      })
    })
  }

  // public midLoop(state: GameState): GameState {
  //   return produce(state, (draft) => {
  //     if (draft.resources.RNA.amount < draft.resources.RNA.max) {
  //       draft.resources.RNA.amount++
  //     }
  //   })
  // }
}
