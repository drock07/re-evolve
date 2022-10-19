import { useMedia } from 'react-use'

export function useBreakpoint() {}

export function useIsMobileBreakpoint() {
  return !useMedia('(min-width: 768px)')
}
