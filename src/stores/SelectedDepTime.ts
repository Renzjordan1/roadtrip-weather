import { create } from 'zustand'

// Store to share selected Departure Time between components
type DepTimeState = {
    depTime: string,
    setdepTime: (newTime: string) => void,
}

const useDepTimeStore = create<DepTimeState>((set) => ({
  depTime: '',
  setdepTime: (newTime) => set({ depTime: newTime }),
}))

export default useDepTimeStore;