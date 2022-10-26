const Stage = {
  Protoplasm: 'protoplasm',
  Civilization: 'civilization',
} as const

export type StageValues = typeof Stage[keyof typeof Stage]

export default Stage
