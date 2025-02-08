import { immerable } from 'immer'
import Stage from '../types/Stages.ts'
import Resource from '../types/Resources.ts'
import { BuildingIds } from '../Buildings.ts'
import { ActionIds } from '../Actions.ts'
import ResourceState from './ResourceState.ts'
import BuildingState from './BuildingState.ts'

export default class GameState {
  [immerable] = true

  public readonly stage: Stage = Stage.Protoplasm
  public readonly resources: { [key in Resource]?: ResourceState } = {}
  public readonly actions: ActionIds[] = []
  public readonly buildings: { [key in BuildingIds]?: BuildingState } = {}
}
