import GameState from '../GameState/index.ts'

type AmountCalculator = number | ((state: GameState) => number)

export default AmountCalculator
