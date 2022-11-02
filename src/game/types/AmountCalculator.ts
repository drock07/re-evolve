import GameState from '../GameState'

type AmountCalculator = number | ((state: GameState) => number)

export default AmountCalculator
