import { immerable } from 'immer'
import { BuildingIds } from '../Buildings'

interface Modifier {
  id: BuildingIds
  max?: number
  rate?: number
}

type ModifiableProperties = Exclude<keyof Modifier, 'id'>

interface ResourceStateConstructorArgs {
  display?: boolean
  max?: number
  rate?: number
}

export default class ResourceState {
  [immerable] = true

  public display: boolean = false
  public amount: number = 0
  public modifiers: Modifier[] = []

  public readonly maxBase: number = 0
  public get max(): number {
    return (
      this.maxBase +
      this.modifiers
        .filter(({ max }) => max !== undefined)
        .map(({ max }) => max!)
        .reduce((prev, cur) => prev + cur, 0)
    )
  }

  public readonly rateBase: number = 0
  public get rate(): number {
    return (
      this.rateBase +
      this.modifiers
        .filter(({ rate }) => rate !== undefined)
        .map(({ rate }) => rate!)
        .reduce((prev, cur) => prev + cur, 0)
    )
  }

  constructor(initialValues: ResourceStateConstructorArgs) {
    if (initialValues.display !== undefined) {
      this.display = initialValues.display
    }

    if (initialValues.max !== undefined) {
      this.maxBase = initialValues.max
    }

    if (initialValues.rate !== undefined) {
      this.rateBase = initialValues.rate
    }
  }

  public adjustModifier(
    id: BuildingIds,
    property: ModifiableProperties,
    amount: number
  ): void {
    let i = this.modifiers.findIndex(({ id: modId }) => modId === id)
    if (i < 0) {
      i = this.modifiers.push({ id }) - 1
    }
    this.modifiers[i][property] = (this.modifiers[i][property] ?? 0) + amount
  }

  // value: number;
  // diff: number;
  // delta: number;

  // stackable: boolean;
  // crates: number;
  // containers: number;

  // tradeable: boolean;
  // trade: number;
}
