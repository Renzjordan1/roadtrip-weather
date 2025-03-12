import { create } from 'zustand'

// Store to share selected Latitude and Longitude betwen Map and Weather data
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