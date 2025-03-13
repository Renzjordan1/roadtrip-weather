import { create } from 'zustand'

// Store to share waypoints in between the route between components
type EnrouteWPState = {
    startTime: 0,
    waypoints: [],
    setWaypoints: (waypointArr, start) => void,
}

const useEnrouteWPStore = create<EnrouteWPState>((set) => ({
  startTime: 0,
  waypoints: [],
  setWaypoints: (waypointArr, start) => set({ waypoints: waypointArr, startTime: start }),
}))

export default useEnrouteWPStore;