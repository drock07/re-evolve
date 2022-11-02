import AmountCalculator from './types/AmountCalculator'
import Resources from './types/Resources'

export enum ActionIds {
  RNA = 'rna',
  DNA = 'dna',
}

export interface ActionDescription {
  readonly title: string
  readonly description: string
  readonly cost?: {
    readonly resource: Resources
    readonly amount: AmountCalculator
  }[]
  readonly results: {
    readonly resource: Resources
    readonly amount: AmountCalculator
  }[]
}

const actions: {
  [key in ActionIds]: ActionDescription
} = {
  [ActionIds.RNA]: {
    title: 'RNA',
    description: 'Creates new RNA',
    results: [
      {
        resource: Resources.RNA,
        amount: 1,
      },
    ],
  },
  [ActionIds.DNA]: {
    title: 'Form DNA',
    description: 'Creates a new strand of DNA',
    cost: [
      {
        resource: Resources.RNA,
        amount: 2,
      },
    ],
    results: [
      {
        resource: Resources.DNA,
        amount: 1,
      },
    ],
  },
}

export default actions
