export default interface ActionView {
  id: string
  title: string
  description: string
  disabled: boolean
  action: () => void
}
