import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const TenpoNotification = ({ open, message, type, onNotificationClose }) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        onNotificationClose();
    }

    return (

        <Snackbar 
            open={open} 
            autoHideDuration={3000} 
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={type}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}