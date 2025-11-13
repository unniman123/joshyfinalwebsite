import * as React from "react"

// Tailwind's lg breakpoint is 1024px
// We use this for the itinerary image gallery layout switch
const LG_BREAKPOINT = 1024

export function useItineraryMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${LG_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < LG_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < LG_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

