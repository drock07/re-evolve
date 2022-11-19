import { useMediaQuery } from '@react-hookz/web'

export function useBreakpoint() {}

export function useIsMobileBreakpoint() {
  return !useMediaQuery('(min-width: 768px)')
}
