import { create } from 'zustand'

// Store to share waypoints in between the route between components
type EnrouteWPState = {
    startTime: string,
    waypoints: [number, number][],
    setWaypoints: (waypointArr: [number, number][], start: string) => void,
}

const useEnrouteWPStore = create<EnrouteWPState>((set) => ({
  startTime: '',
  waypoints: [],
  setWaypoints: (waypointArr, start) => set({ waypoints: waypointArr, startTime: start }),
}))

export default useEnrouteWPStore;