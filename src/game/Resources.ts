export default {
  RNA: 'RNA',
  DNA: 'DNA',
  FOOD: 'Food',
  LUMBER: 'Lumber',
  STONE: 'Stone',
} as const

export interface ResourceState {
  display: boolean
  // value: number;
  amount: number
  max: number
  // diff: number;
  // delta: number;
  // rate: number

  // stackable: boolean;
  // crates: number;
  // containers: number;

  // tradeable: boolean;
  // trade: number;
}
