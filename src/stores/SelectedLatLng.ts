import { create } from 'zustand'

// Store to share selected Latitude and Longitude betwen Map and Weather data
type LatLngState = {
    lat: number,
    lng: number,
    setLatLng: (newLat: number, newLng: number) => void,
    setLat: (newLat: number) => void,
    setLng: (newLng: number) => void
}

const useLatLngStore = create<LatLngState>((set) => ({
  lat: 0,
  lng: 0,
  setLatLng: (newLat, newLng) => set({ lat: newLat, lng: newLng }),
  setLat: (newLat) => set({ lat: newLat }),
  setLng: (newLng) => set({ lng: newLng })
}))

export default useLatLngStore;