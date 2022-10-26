import type { GameState } from './GameState'

export type Command = (state: GameState) => void
