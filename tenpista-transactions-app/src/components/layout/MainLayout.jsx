import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { IoBusiness, IoCard, IoLogoGithub } from "react-icons/io5";

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#f0f0f0',
      }}
    >
      <AppBar
        position="static"
        sx={{
          width: '100%',
          background: 'linear-gradient(to right, #1f1f1f, #3a3a3a)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
        }}
      >
        <Toolbar
          sx={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box 
            display="flex" 
            alignItems="center"
          >
            <IoBusiness
              size={28}
              style={{ marginRight: 12 }}
              color="white"
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontWeight: 600,
                letterSpacing: '.05rem',
                color: 'white',
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              CHALLENGE TENPO
            </Typography>
          </Box>
          <Box>
            <IconButton 
              href="https://github.com" 
              target="_blank"
            >
              <IoLogoGithub 
                size={22} 
                color="white" 
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          maxWidth: '1440px',
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: 4,
          textAlign: "-webkit-center"
        }}
      >
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          width: '100%',
          backgroundColor: '#1a1a1a',
          color: '#ccc',
          textAlign: 'center',
          py: 2,
          mt: 'auto',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Rommel Chocho — Todos los derechos reservados
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;
