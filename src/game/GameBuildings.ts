import ResourceNames from './types/Resources'
import Resources from './types/Resources'
import type { Command } from './Commands'

export interface GameBuilding {
  title: string
  description: string
  effect?: string
  cost?: {
    -readonly [Value in typeof ResourceNames[keyof typeof ResourceNames]]?: () => number
  }
  action: Command
}

export interface GameBuildingState {
  display: boolean
  amount: number
}

const buildings = {
  rna: {
    title: 'RNA',
    description: 'Creates new RNA',
    action: (state) => {
      if (
        state.resources[Resources.RNA].amount <
        state.resources[Resources.RNA].max
      ) {
        state.resources[Resources.RNA].amount++
      }
    },
  } as GameBuilding,
} as const

export default buildings
