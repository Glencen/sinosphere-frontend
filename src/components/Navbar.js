import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { ReactComponent as AppIcon } from '../logo.svg';

const navigationStyles = {
  appBar: {
    backgroundColor: 'white',
    color: '#1F2937',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  toolbar: {
    justifyContent: 'space-between',
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logoText: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: { xs: '1.1rem', sm: '1.25rem' }
  },
  navContainer: {
    display: 'flex',
    gap: 4
  },
  navButton: {
    margin: 0,
    padding: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1F2937',
    fontWeight: 500,
    textTransform: 'none',
    fontSize: '16px',
    '&:hover': {
      color: '#2563EB',
      backgroundColor: 'transparent'
    }
  },
  authContainer: {
    display: 'flex',
    gap: 2
  },
  loginButton: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    borderColor: '#2563EB',
    borderWidth: '3px',
    borderRadius: '6px',
    py: '10px',
    px: '20px',
    color: '#2563EB',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      borderColor: '#1d4ed8',
      backgroundColor: 'rgba(37, 99, 235, 0.04)'
    }
  },
  signupButton: {
    backgroundColor: '#2563EB',
    fontWeight: 600,
    textTransform: 'none',
    px: 3,
    '&:hover': {
      backgroundColor: '#1d4ed8'
    }
  },
  mobileMenuButton: {
    color: '#1F2937'
  },
  drawer: {
    '& .MuiDrawer-paper': {
      width: 280,
      backgroundColor: 'white'
    }
  },
  drawerContent: {
    textAlign: 'center',
    py: 2
  },
  drawerLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 2
  },
  drawerAuthContainer: {
    flexDirection: 'column',
    gap: 1,
    mt: 2
  }
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Главная', href: '#' },
    { label: 'Словарь', href: '#' },
    { label: 'О нас', href: '#' },
  ];

  const drawer = (
    <Box sx={navigationStyles.drawerContent} onClick={handleDrawerToggle}>
      <Box sx={navigationStyles.drawerLogo}>
        <AppIcon width={50} height={50} />
        <Typography variant="h6" component="div" sx={navigationStyles.logoText}>
          Sinosphere
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} component="a" href={item.href} disablePadding>
            <ListItemText 
              primary={item.label} 
              sx={{ textAlign: 'center', '& .MuiListItemText-primary': { fontWeight: 500 } }}
            />
          </ListItem>
        ))}
        <ListItem sx={navigationStyles.drawerAuthContainer}>
          <Button variant="outlined" fullWidth>
            Войти
          </Button>
          <Button variant="contained" fullWidth>
            Начать учиться
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={navigationStyles.appBar}>
        <Toolbar sx={navigationStyles.toolbar}>
          <Box py={'20px'} sx={navigationStyles.logoContainer}>
            <AppIcon width={50} height={50} />
            <Typography pl="12px" variant="h6" component="div" sx={navigationStyles.logoText}>
              Sinosphere
            </Typography>
          </Box>

          {!isMobile && (
            <>
              <Box sx={navigationStyles.navContainer}>
                {navItems.map((item) => (
                  <Button key={item.label} href={item.href} sx={navigationStyles.navButton}>
                    {item.label}
                  </Button>
                ))}
              </Box>
              <Box sx={navigationStyles.authContainer}>
                <Button variant="outlined" sx={navigationStyles.loginButton}>
                  Войти
                </Button>
                <Button variant="contained" sx={navigationStyles.signupButton}>
                  Начать учиться
                </Button>
              </Box>
            </>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={navigationStyles.mobileMenuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={navigationStyles.drawer}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;