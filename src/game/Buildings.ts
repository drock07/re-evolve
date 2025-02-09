import GameState from './GameState/index.ts'
import AmountCalculator from './types/AmountCalculator.ts'
import Resource from './types/Resources.ts'

export enum BuildingIds {
  MEMBRANE = 'membrane',
  ORGANELLES = 'organelles',
  // NUCLEUS = 'nucleus',
  // EUKARYOTIC_CELL = 'eukaryotic_cell',
  // MITOCHONDRIA = 'mitochondria',
  // SEXUAL_REPRODUCTION = 'sexual_reproduction',

  // PHAGOCYTOSIS = 'phagocytosis',
  // CHLOROPLASTS = 'chloroplasts',
  // CHITIN = 'chitin',
  // MULTICELLULAR = 'multicellular',
  // SPORES = 'spores',
  // POIKILOHYDRIC = 'poikilohydric',
  // BILATERAL_SYMMETRY = 'bilateral_symmetry',
  // BRYOPHYTE = 'bryophyte',
  // ARTHROPODS = 'arthropods',
  // MAMMALS = 'mammals',
  // HUMANOID = 'humanoid',
  // GIGANTISM = 'gigantism',
  // DWARFISM = 'dwarfism',
  // ANIMALISM = 'animalism',
  // CARNIVORE = 'carnivore',
  // HERBIVORE = 'herbivore',
  // OMNIVORE = 'omnivore',
  // EGGSHELL = 'eggshell',
  // ENDOTHERMIC = 'endothermic',
  // ECTOTHERMIC = 'ectothermic',
  // SENTIENCE = 'sentience',
}

export interface BuildingDescription {
  readonly title: string
  readonly description: string
  readonly effectDescription?: string | ((state: GameState) => string)
  readonly available: (state: GameState) => boolean
  readonly toggleable?: boolean
  readonly cost?: {
    readonly resource: Resource
    // readonly amount: AmountCalculator
    readonly base: number
    readonly multiplier: number
    readonly offset?: number
  }[]
  /*
   * There are multiple types of modifires:
   * - increase/decrease rate of resource gain
   * - convert one resource into another (-2 RNA => +1 DNA)
   * - changing the effectiveness of another modifier?
   */
  readonly modifies?: {
    resources?: [
      {
        resource: Resource
        rate?:
          | number
          | {
              amount: number
              costs: {
                resource: Resource
                amount: number
              }[]
            }
        max?: number
      }
    ]
    // buildings?: {
    //   [key in BuildingIds]: {}
    // }
  }
}

const buildings: {
  [key in BuildingIds]: BuildingDescription
} = {
  [BuildingIds.MEMBRANE]: {
    title: 'Membrane',
    description: 'Evolve Membranes',
    effectDescription: 'Increases RNA capacity by 5',
    available: (state) => {
      return (state.resources[Resource.RNA]?.amount ?? 0) >= 10 || (state.buildings.membrane?.amount ?? 0) > 0
    },
    cost: [
      {
        resource: Resource.RNA,
        base: 2,
        multiplier: 2,
      },
    ],
    modifies: {
      resources: [
        {
          resource: Resource.RNA,
          max: 5,
        },
      ],
    },
  },
  [BuildingIds.ORGANELLES]: {
    title: 'Organelles',
    description: 'Evolve Organelles',
    effectDescription: (state) => {
      // check for 'rapid mutation' trait on race
      const rna = 1
      // check if sexual reproduction has been researched
      return `Automatically generate ${rna} RNA`
    },
    available: (state) => {
      return (state.resources[Resource.DNA]?.amount ?? 0) >= 4 || (state.buildings.organelles?.amount ?? 0) > 0
    },
    cost: [
      {
        resource: Resource.RNA,
        base: 12,
        multiplier: 8,
      },
      {
        resource: Resource.DNA,
        base: 4,
        multiplier: 4,
      },
    ],
    modifies: {
      resources: [
        {
          resource: Resource.RNA,
          rate: 1,
        },
      ],
    },
  },
  // [BuildingIds.NUCLEUS]: {
  //   title: 'Membrane',
  //   description: 'Evolve Membranes',
  //   effectDescription: 'Increases RNA capacity by 5',
  //   cost: [
  //     {
  //       resource: Resource.RNA,
  //       amount: (state) => {
  //         return 2
  //       },
  //     },
  //   ],
  //   modifies: {
  //     resources: [
  //       {
  //         resource: Resource.RNA,
  //         max: 5,
  //       },
  //     ],
  //   },
  // },
  // [BuildingIds.EUKARYOTIC_CELL]: {
  //   title: 'Membrane',
  //   description: 'Evolve Membranes',
  //   effectDescription: 'Increases RNA capacity by 5',
  //   cost: [
  //     {
  //       resource: Resource.RNA,
  //       amount: (state) => {
  //         return 2
  //       },
  //     },
  //   ],
  //   modifies: {
  //     resources: [
  //       {
  //         resource: Resource.RNA,
  //         max: 5,
  //       },
  //     ],
  //   },
  // },
  // [BuildingIds.MITOCHONDRIA]: {
  //   title: 'Membrane',
  //   description: 'Evolve Membranes',
  //   effectDescription: 'Increases RNA capacity by 5',
  //   cost: [
  //     {
  //       resource: Resource.RNA,
  //       amount: (state) => {
  //         return 2
  //       },
  //     },
  //   ],
  //   modifies: {
  //     resources: [
  //       {
  //         resource: Resource.RNA,
  //         max: 5,
  //       },
  //     ],
  //   },
  // },
  // [BuildingIds.SEXUAL_REPRODUCTION]: {
  //   title: 'Membrane',
  //   description: 'Evolve Membranes',
  //   effectDescription: 'Increases RNA capacity by 5',
  //   cost: [
  //     {
  //       resource: Resource.RNA,
  //       amount: (state) => {
  //         return 2
  //       },
  //     },
  //   ],
  //   modifies: {
  //     resources: [
  //       {
  //         resource: Resource.RNA,
  //         max: 5,
  //       },
  //     ],
  //   },
  // },
}

export default buildings
