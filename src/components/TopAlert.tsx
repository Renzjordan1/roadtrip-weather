import { useEffect } from 'react'
import { Alert, Fade } from '@mui/material'
import useMessageAlertStore from '../stores/MessageAlert'


// Render Alert Box
const TopAlert = () => {
    
    // Global Stores
    const messageAlertStore = useMessageAlertStore()

    // Update alert message
    useEffect(() => {
        if (messageAlertStore.showAlert) {
        const timer = setTimeout(() => {
          messageAlertStore.setShowAlert(false);
        }, 3000); // Hide after 3 seconds (adjust as needed)

        return () => clearTimeout(timer); // Clear timeout if component unmounts or showAlert changes
      }

    }, [messageAlertStore])


    // Fade alert in and out
    return (
        <>
        <Fade in={messageAlertStore.showAlert} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
          <Alert severity={messageAlertStore.severity} sx={{ mt: 2 }}>
            {messageAlertStore.message}
          </Alert>
        </Fade>
        </>
    )

}


export default TopAlert
