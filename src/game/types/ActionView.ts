export default interface ActionView {
  id: string
  title: string
  description: string
  disabled: boolean
  cost?: {
    resource: string
    amount: number
  }[]
  action: () => void
}
