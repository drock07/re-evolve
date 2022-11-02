import { immerable } from 'immer'

interface ResourceStateConstructorArgs {
  display?: boolean
  max?: number
  rate?: number
}

export default class ResourceState {
  [immerable] = true

  public display: boolean = false
  public amount: number = 0

  public readonly maxBase: number = 0
  public get base(): number {
    return this.maxBase
  }

  public readonly rateBase: number = 0
  public get rate(): number {
    return this.rateBase
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

  // value: number;
  // diff: number;
  // delta: number;

  // stackable: boolean;
  // crates: number;
  // containers: number;

  // tradeable: boolean;
  // trade: number;
}
