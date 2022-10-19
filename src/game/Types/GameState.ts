import Stage, { type StageValues } from './Stages'
import { ResourceState } from './Resources'

interface GameState {
  stage: StageValues
  resources: {
    [Stage.Protoplasm]?: {
      RNA: ResourceState
      DNA: ResourceState
    }
  }
}

export type { GameState }
