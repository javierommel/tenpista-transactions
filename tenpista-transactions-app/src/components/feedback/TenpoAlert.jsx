import {Fragment} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTheme } from '@mui/material/styles';

export const TenpoAlert = ({ open, message, title, handleAlert }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => handleAlert(true)}
        aria-labelledby="1-dialog"
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 0 80px rgba(0, 0, 0, 1)",
            color: 'white',
            paddingTop: '20px',
            width: '400px'
          },
        }}
      >
        <DialogTitle id="1-dialog">
          <Box textAlign={"center"}>
            <InfoOutlinedIcon
              sx={{
                backgroundColor: 'white',
                borderRadius: "50%",
                padding: "5px",
                fontSize: 56,
                color: "rgb(235, 152, 78 , 0.9)",
                boxShadow: "5px 3px 20px rgba(0, 0, 0, 1)",
              }}
            />
          </Box>
          <Box textAlign={"center"}>
            <Typography variant="h6">{title}</Typography>
          </Box>

        </DialogTitle>
        <DialogContent>
          <DialogContentText 
            sx={{ 
              color: 'rgb(255,255,255,0.8)', 
              paddingTop: '15px' 
              }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            color="success"
            onClick={() => handleAlert(false)}>
            Aceptar
          </Button>
          <Button
            variant="outlined"
            color="background"
            onClick={() => handleAlert(true)} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}