import { GameState } from './Types/GameState'
import Stage from './Types/Stages'
export default class Game {
  public fastLoop(state: GameState): GameState {
    return state
  }
  public midLoop(state: GameState): GameState {
    return state
  }
  public longLoop(state: GameState): GameState {
    return state
  }

  public new(): GameState {
    return {
      stage: Stage.Protoplasm,
      resources: {
        [Stage.Protoplasm]: {
          RNA: {
            display: true,
            amount: 0,
            max: 100,
            rate: 0,
          },
          DNA: {
            display: false,
            amount: 0,
            max: 100,
            rate: 0,
          },
        },
      },
    }
  }
}
