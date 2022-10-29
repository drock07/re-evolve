import produce, { immerable } from 'immer'
import Stage from '../types/Stages'
import Resource from '../types/Resources'
import GameBuildings, { type GameBuildingState } from '../GameBuildings'
import { ActionIds } from '../Actions'
import ResourceState from './ResourceState'

export default class GameState {
  [immerable] = true

  public readonly stage: Stage = Stage.Protoplasm
  public readonly resources: { [key in Resource]?: ResourceState } = {}
  public readonly actions: ActionIds[] = []
}
