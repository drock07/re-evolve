import { produce } from "immer";
import ActionManager from "./ActionManager.ts";
import { ActionIds } from "./Actions.ts";
import BuildingManager from "./BuildingManager.ts";
// import { BuildingIds } from './Buildings.ts'
import GameLoopManager from "./GameLoopManager.ts";
import GameState from "./GameState/GameState.ts";
import ResourceManager from "./ResourceManager.ts";
import Resource from "./types/Resources.ts";

export default class Game {
  private _state: GameState;
  public get state(): GameState {
    return this._state;
  }
  private set state(newValue: GameState) {
    this._state = newValue;
    this.notifyStateChange();
  }

  private timeMultiplier: number = 1;

  private stateChangeListeners: Set<() => void> = new Set();
  private resourceManager: ResourceManager = new ResourceManager();
  private actionManager: ActionManager = new ActionManager();
  private buildingManager: BuildingManager = new BuildingManager();

  constructor(importString?: string) {
    if (importString) {
      this._state = new GameState();
    } else {
      const s = new GameState();
      this.resourceManager.enable(s, Resource.RNA);
      this.resourceManager.enable(s, Resource.DNA);
      s.actions.push(ActionIds.RNA);
      s.actions.push(ActionIds.DNA);
      this._state = s;
    }
  }

  private notifyStateChange(): void {
    this.stateChangeListeners.forEach((listener) => listener());
  }

  public registerGameLoop(loopManager: GameLoopManager): () => void {
    const unsubShort = loopManager.subscribe("short", () => this.fastLoop());
    const unsubMid = loopManager.subscribe("mid", () => this.midLoop());
    const unsubLong = loopManager.subscribe("long", () => this.longLoop());

    this.timeMultiplier = loopManager.options.shortTimer / 1000;

    return () => {
      unsubShort();
      unsubMid();
      unsubLong();
    };
  }

  public subscribeToStateChange(listener: () => void): () => void {
    this.stateChangeListeners.add(listener);
    return () => this.stateChangeListeners.delete(listener);
  }

  public fastLoop(): void {
    this.state = produce(this.state, (draft) => {
      let resource: Resource;
      for (resource in draft.resources) {
        if (Object.prototype.hasOwnProperty.call(draft.resources, resource)) {
          const r = draft.resources[resource]!;
          if (r.rate !== 0) {
            r.amount += r.rate * this.timeMultiplier;
            // Clamp to valid range
            r.amount = Math.max(0, Math.min(r.amount, r.max));
          }
        }
      }
    });
  }
  public midLoop(): void {}
  public longLoop(): void {}

  public get resources() {
    return this.resourceManager.getEnabledResources(this.state);
  }

  public get actions() {
    return this.actionManager.getEnabledActions(this.state, (editState) => {
      this.state = produce(this.state, (draft) => {
        editState(draft);
      });
    });
  }

  public get buildings() {
    return this.buildingManager.getEnabledBuildings(this.state, (editState) => {
      this.state = produce(this.state, (draft) => {
        editState(draft);
      });
    });
  }

  public destroy(): void {
    this.stateChangeListeners.clear();
  }
}
