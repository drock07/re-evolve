import Resources from './Resources'

export enum HarvestActionIds {
  RNA = 'rna',
  DNA = 'dna',
}

export interface HarvestAction {
  title: string
  description: string
  cost?: {
    [resource in keyof typeof Resources]?: () => number
  }
  result: { [resource in keyof typeof Resources]?: () => number }
}

const harvestActions: {
  [id in typeof HarvestActionIds[keyof typeof HarvestActionIds]]: HarvestAction
} = {
  [HarvestActionIds.RNA]: {
    title: 'RNA',
    description: 'Creates new RNA',
    result: {
      [Resources.RNA]: function () {
        return 1
      },
    },
  },
  [HarvestActionIds.DNA]: {
    title: 'Form DNA',
    description: 'Creates a new strand of DNA',
    cost: {
      [Resources.RNA]: function () {
        return 2
      },
    },
    result: {
      [Resources.DNA]: function () {
        return 1
      },
    },
  },
}

export default harvestActions
