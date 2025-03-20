import { create } from 'zustand'
import { WeatherObject } from '../types/myTypes';



// Store to share weather info at waypoints in between the route
type EnrouteInfoState = {
    wpInfo: WeatherObject[],
    setInfo: (weatherObjectArr) => void
}

const useEnrouteInfoStore = create<EnrouteInfoState>((set) => ({
  wpInfo: [],
  setInfo: (weatherObjectArr) => set({ wpInfo: weatherObjectArr }),
}))

export default useEnrouteInfoStore;