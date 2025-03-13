import { create } from 'zustand'

type LatLngObject = {
  lat?: number,
  lng?: number
}

// Store to share selected Origin and Destination betwen components
type PlacesState = {
    orig: LatLngObject,
    dest: LatLngObject,
    setPlaces: (newOrig, newDest) => void
}

const usePlacesStore = create<PlacesState>((set) => ({
  orig: {},
  dest: {},
  setPlaces: (newOrig, newDest) => set({ orig: newOrig, dest: newDest }),
}))

export default usePlacesStore;