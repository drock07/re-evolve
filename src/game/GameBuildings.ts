import AmountCalculator from './types/AmountCalculator'
import Resource from './types/Resources'

export enum BuildingIds {
  MEMBRANE = 'membrane',
  ORGANELLES = 'organelles',
  NUCLEUS = 'nucleus',
  EUKARYOTIC_CELL = 'eukaryotic_cell',
  MITOCHONDRIA = 'mitochondria',
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
  readonly effectDescription?: string
  readonly toggleable?: boolean
  readonly cost?: {
    readonly resource: Resource
    readonly amount: AmountCalculator
  }[]
}

const buildings: {
  [key in BuildingIds]?: BuildingDescription
} = {
  [BuildingIds.MEMBRANE]: {
    title: 'Membrane',
    description: 'Evolve Membranes',
    effectDescription: 'Increases RNA capacity by 5',
    cost: [
      {
        resource: Resource.RNA,
        amount: (state) => {
          return 5
        },
      },
    ],
  },
}

export default buildings
