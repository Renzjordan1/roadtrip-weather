import { create } from 'zustand'


// Store to share common alert component
type MessageAlertState = {
    showAlert: boolean,
    message: string,
    severity: "warning" | "info" | "error" | "success",
    setShowAlert: (newShowAlert: boolean) => void,
    setMessage: (newMessage: string) => void,
    setSeverity: (newSeverity: "warning" | "info" | "error" | "success") => void,
    setAlert: (newShowAlert: boolean, newMessage: string, newSeverity: "warning" | "info" | "error" | "success") => void

}

const useMessageAlertStore = create<MessageAlertState>((set) => ({
  showAlert: false,
  message: "default",
  severity: "info",
  setShowAlert: (newShowAlert) => set({ showAlert: newShowAlert }),
  setMessage: (newMessage) => set({ message: newMessage }),
  setSeverity: (newSeverity) => set({ severity: newSeverity }),
  setAlert: (newShowAlert, newMessage, newSeverity) => set({ showAlert: newShowAlert, message: newMessage, severity: newSeverity })

}))

export default useMessageAlertStore;