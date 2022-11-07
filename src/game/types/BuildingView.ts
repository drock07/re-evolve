export default interface BuildingView {
  id: string
  title: string
  description: string
  disabled: boolean
  action: () => void
}
