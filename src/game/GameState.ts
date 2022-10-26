import Stage, { type StageValues } from './Stages'
import ResourceNames, { ResourceState } from './Resources'
import GameBuildings, { type GameBuildingState } from './GameBuildings'

interface GameState {
  stage: StageValues
  resources: {
    [Property in typeof ResourceNames[keyof typeof ResourceNames]]: ResourceState
  }
  buildings: {
    [BuildingId in keyof typeof GameBuildings]: GameBuildingState
  }
}

export type { GameState }
