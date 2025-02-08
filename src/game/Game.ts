import { produce } from 'immer'
import ActionManager from './ActionManager.ts'
import { ActionIds } from './Actions.ts'
import BuildingManager from './BuildingManager.ts'
// import { BuildingIds } from './Buildings.ts'
import GameLoopManager from './GameLoopManager.ts'
import GameState from './GameState/GameState.ts'
import ResourceManager from './ResourceManager.ts'
import Resource from './types/Resources.ts'

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

  private timeMultiplier: number = 1

  private stateChangeSubscriptions: StateChangeCallback[] = []
  private resourceManager: ResourceManager = new ResourceManager()
  private actionManager: ActionManager = new ActionManager()
  private buildingManager: BuildingManager = new BuildingManager()

  constructor(importString?: string) {
    if (importString) {
      this._state = new GameState()
    } else {
      const s = new GameState()
      this.resourceManager.enable(s, Resource.RNA)
      this.resourceManager.enable(s, Resource.DNA)
      s.actions.push(ActionIds.RNA)
      s.actions.push(ActionIds.DNA)
      this._state = s
    }
  }

  public registerGameLoop(loopManager: GameLoopManager): () => void {
    const short = () => {
      this.fastLoop()
    }
    const mid = () => {
      this.midLoop()
    }
    const long = () => {
      this.longLoop()
    }
    loopManager.subscribe('short', short)
    loopManager.subscribe('mid', mid)
    loopManager.subscribe('long', long)

    this.timeMultiplier = loopManager.options.shortTimer / 1000

    return () => {
      loopManager.unsubscribe('short', short)
      loopManager.unsubscribe('mid', mid)
      loopManager.unsubscribe('long', long)
    }
  }

  public subscribeToStateChange(callback: StateChangeCallback) {
    this.stateChangeSubscriptions.push(callback)
  }

  public unsubscribeToStateChange(callback: StateChangeCallback) {
    const index = this.stateChangeSubscriptions.findIndex((cb) => cb === callback)
    if (index < -1) return
    this.stateChangeSubscriptions = this.stateChangeSubscriptions.splice(
      index,
      1
    )
  }

  public fastLoop(): void {
    this.state = produce(this.state, (draft) => {
      let resource: Resource
      for (resource in draft.resources) {
        if (Object.prototype.hasOwnProperty.call(draft.resources, resource)) {
          const r = draft.resources[resource]!
          if (r.amount < r.max) {
            r.amount += r.rate * this.timeMultiplier
          }
        }
      }
    })
  }
  public midLoop(): void {}
  public longLoop(): void {}

  public get resources() {
    return this.resourceManager.getEnabledResources(this.state)
  }

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
}
