import Stage, { type StageValues } from './Stages'
import ResourceNames, { ResourceState } from './Resources'
import GameBuildings, { type GameBuildingState } from './GameBuildings'
import { type HarvestActionIds } from './HarvestActions'

interface GameState {
  stage: StageValues
  resources: {
    [Property in typeof ResourceNames[keyof typeof ResourceNames]]: ResourceState
  }
  actions: {
    [ActionId in HarvestActionIds]: {
      display: boolean
    }
  }
  buildings: {
    [BuildingId in keyof typeof GameBuildings]: GameBuildingState
  }
}

export type { GameState }
