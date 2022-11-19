export default interface BuildingView {
  id: string
  title: string
  description: string
  effectDescription?: string
  disabled: boolean
  cost?: {
    resource: string
    amount: number
  }[]
  action: () => void
}
