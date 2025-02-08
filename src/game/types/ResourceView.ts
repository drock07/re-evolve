import { BuildingIds } from '../Buildings.ts'

export default interface ResourceView {
  id: string
  title: string
  amount: number
  max: number
  rate: number
  modifiers: {
    buildingId: BuildingIds
    buildingName: string
    max?: number
    rate?: number
  }[]
}
