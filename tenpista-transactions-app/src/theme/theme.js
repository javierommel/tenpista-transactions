// src/theme/theme.js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import * as locales from '@mui/material/locale';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#003366', 
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#006699', 
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f6f8', 
      paper: 'transparent', 
    },
    text: {
      primary: '#1c1c1c',
      secondary: '#5f6368',
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#2e7d32',
    },
    action: {
      active: '#ffffff', 
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },
  typography: {
    fontFamily: 'Josefin Sans, sans-serif',
    fontSize: 14,
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 400,
      fontSize: '1.75rem',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', 
      fontSize: '0.94rem',
    },
  },
  shape: {
    borderRadius: 10, 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
          fontWeight: 500,
          borderRadius: '5px',
          height: '50px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          backdropFilter: "blur(5px)",
          backgroundColor: 'transparent',
          color: 'white'
        },

      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          backgroundColor: 'rgba(24, 23, 23, 0.4)',
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'none', 
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', 
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', 
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.1)', 
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'gray', 
          },
        },
        input: {
          color: 'white', 
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.5)', 
            WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)', 
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'gray', 
          '&.Mui-focused': {
            color: 'white', 
          },
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.5)', 
            WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)', 
          },
          '&.Mui-error': {
            color: 'rgba(255, 255, 255, 0.5)', 
            WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)', 
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'orange',
          '&.Mui-error': {
            color: 'orange', 
            WebkitTextFillColor: 'rgba(235, 152, 78, 0.8 )' 
          },
        },
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(215deg, rgb(30, 30, 30, 0.5),rgb(85, 83, 83, 0.5))',
          fontFamily: 'Josefin Sans, sans-serif',
          fontWeight: 'bold'
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          background: 'linear-gradient(215deg, rgb(30, 30, 30, 0.5),rgb(85, 83, 83))',
          color: '#ffffff',
          minHeight: '56px', 
          paddingLeft: '16px',
          paddingRight: '16px',
          borderRadius: "5px",
          fontSize: '0.94rem',
        },
        selectLabel: {
          color: '#ffffff',
          fontSize: '0.94rem',
        },
        displayedRows: {
          color: '#ffffff',
          fontSize: '0.94rem',
        },
        selectIcon: {
          color: '#ffffff',
          fontSize: '0.94rem',
        },
        actions: {
          '& .MuiIconButton-root': {
            color: '#ffffff',
            '&.Mui-disabled': {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'white', 
        },
      },
    },
    MuiPickerPopper: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(24, 23, 23, 0.65)', 
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          borderRadius: '10px',
          overflow: 'hidden', 

          
          '& .MuiPickersCalendarHeader-root': {
            backgroundColor: 'rgba(43, 44, 44, 0.9)', 
            color: 'white',
          },

        
          '& .MuiPickersDay-root': {
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&.Mui-selected': {
              backgroundColor: '#006699', 
              '&:hover': {
                backgroundColor: '#0088cc',
              },
            },
            '&.Mui-disabled': {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },

          
          '& .MuiPickersToolbar-root': {
            backgroundColor: 'rgba(91, 123, 155, 0.7)',
          },
          '& .MuiDialogActions-root .MuiButton-root': {
            
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            '&:first-of-type': { 
              backgroundColor: 'rgba(59, 57, 57, 0.2)'
            },
            '&:last-of-type': { 
              backgroundColor: 'rgba(130, 224, 170,0.6)'
            }
          }
        },
      },
    },
    MuiMultiSectionDigitalClockSection: {
      styleOverrides: {
        item: {
          
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            color: 'white !important',
            '&:hover': {
              backgroundColor: '#0088cc !important', 
            },
          },
          
          '&.MuiButtonBase-root': {
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
        },
      },
    },
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          backgroundColor: 'rgba(24, 23, 23, 0.4)',
          color: 'white',
          '&:hover': {
            borderColor: 'white',
          },
          '&.Mui-focused': {
            borderColor: 'white',
            boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)',
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', 

          },
        },
        input: {
          
          color: 'white',
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: 'white', 
        },
      },
    },
  },
}, locales["es-ES"]);

//theme = responsiveFontSizes(theme); // hace la tipografía responsiva automáticamente

export default theme;
