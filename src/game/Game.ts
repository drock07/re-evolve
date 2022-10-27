import { produce } from 'immer'
import { GameState } from './GameState'
import Stage from './Stages'
import ResourceNames from './Resources'
import { HarvestActionIds } from './HarvestActions'
import { Command } from './Commands'

export default class Game {
  public fastLoop(state: GameState): GameState {
    return state
  }
  public midLoop(state: GameState): GameState {
    return produce(state, (draft) => {
      if (draft.resources.RNA.amount < draft.resources.RNA.max) {
        draft.resources.RNA.amount++
      }
    })
  }
  public longLoop(state: GameState): GameState {
    return state
  }

  public executeCommands(state: GameState, commands: Command[]): GameState {
    return produce(state, (draft) => {
      commands.forEach((command) => command(draft))
    })
  }

  public static new(): GameState {
    return {
      stage: Stage.Protoplasm,
      resources: {
        [ResourceNames.RNA]: {
          display: true,
          amount: 0,
          max: 100,
          // rate: 0,
        },
        [ResourceNames.DNA]: {
          display: false,
          amount: 0,
          max: 100,
          // rate: 0,
        },
        [ResourceNames.FOOD]: {
          display: false,
          amount: 0,
          max: 100,
          // rate: 0,
        },
        [ResourceNames.LUMBER]: {
          display: false,
          amount: 0,
          max: 100,
          // rate: 0,
        },
        [ResourceNames.STONE]: {
          display: false,
          amount: 0,
          max: 100,
          // rate: 0,
        },
      },
      actions: {
        [HarvestActionIds.RNA]: {
          display: true,
        },
        [HarvestActionIds.DNA]: {
          display: false,
        },
      },
      buildings: {
        rna: {
          display: true,
          amount: 0,
        },
      },
    }
  }
}
