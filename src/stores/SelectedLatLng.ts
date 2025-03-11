import { create } from 'zustand'

// Store to share selected Latitude and Longitude betwen Map and Weather data
type LatLngState = {
    lat: 0,
    lng: 0,
    setLatLng: (newLat, newLng) => void,
    setLat: (newLat) => void,
    setLng: (newLng) => void
}

const useLatLonStore = create<LatLngState>((set) => ({
  lat: 0,
  lng: 0,
  setLatLng: (newLat, newLng) => set({ lat: newLat, lng: newLng }),
  setLat: (newLat) => set({ lat: newLat }),
  setLng: (newLng) => set({ lng: newLng })
}))

export default useLatLonStore;