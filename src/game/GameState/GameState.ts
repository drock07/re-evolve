import { immerable } from 'immer'
import Stage from '../types/Stages'
import Resource from '../types/Resources'
import { BuildingIds } from '../GameBuildings'
import { ActionIds } from '../Actions'
import ResourceState from './ResourceState'
import BuildingState from './BuildingState'

export default class GameState {
  [immerable] = true

  public readonly stage: Stage = Stage.Protoplasm
  public readonly resources: { [key in Resource]?: ResourceState } = {}
  public readonly actions: ActionIds[] = []
  public readonly buildings: { [key in BuildingIds]?: BuildingState } = {}
}
