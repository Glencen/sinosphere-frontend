import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
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
  },
  userAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#2563EB',
    fontSize: '0.875rem',
    fontWeight: 600
  }
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    return () => {
      navigate(path);
      if (isMobile) setMobileOpen(false);
    };
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    if (isMobile) setMobileOpen(false);
  };

  const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'Словарь', path: '/dictionary' },
    { label: 'Профиль', path: '/profile' },
    { label: 'О нас', path: '/about' },
  ];

  const getInitials = (username) => {
    return username ? username.charAt(0).toUpperCase() : 'U';
  };

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
          <ListItem key={item.label} component="a" onClick={handleNavigation(item.path)} disablePadding>
            <ListItemText 
              primary={item.label} 
              sx={{ textAlign: 'center', '& .MuiListItemText-primary': { fontWeight: 500 } }}
            />
          </ListItem>
        ))}
        
        {isAuthenticated ? (
          <>
            <ListItem>
              <ListItemText 
                primary={`Привет, ${user?.user?.username || 'Пользователь'}!`} 
                sx={{ textAlign: 'center', fontWeight: 600 }}
              />
            </ListItem>
            <ListItem sx={navigationStyles.drawerAuthContainer}>
              <Button variant="outlined" fullWidth onClick={handleLogout}>
                Выйти
              </Button>
            </ListItem>
          </>
        ) : (
          <ListItem sx={navigationStyles.drawerAuthContainer}>
            <Button variant="outlined" fullWidth onClick={handleNavigation('/login')}>
              Войти
            </Button>
            <Button variant="contained" fullWidth onClick={handleNavigation('/register')}>
              Начать учиться
            </Button>
          </ListItem>
        )}
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
                  <Button key={item.label} onClick={handleNavigation(item.path)} sx={navigationStyles.navButton}>
                    {item.label}
                  </Button>
                ))}
              </Box>
              
              {isAuthenticated ? (
                <Box sx={navigationStyles.authContainer}>
                  <IconButton onClick={handleUserMenuOpen} size="small">
                    <Avatar sx={navigationStyles.userAvatar}>
                      {getInitials(user?.user?.username)}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={handleUserMenuClose}
                  >
                    <MenuItem onClick={() => {
                        handleUserMenuClose();
                        navigate('/profile');
                      }}>
                      Профиль: {user?.user?.username}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box sx={navigationStyles.authContainer}>
                  <Button 
                    variant="outlined" 
                    sx={navigationStyles.loginButton} 
                    onClick={handleNavigation('/login')}
                  >
                    Войти
                  </Button>
                  <Button 
                    variant="contained" 
                    sx={navigationStyles.signupButton} 
                    onClick={handleNavigation('/register')}
                  >
                    Начать учиться
                  </Button>
                </Box>
              )}
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