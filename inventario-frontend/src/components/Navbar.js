import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    // Redirige a una página de perfil (puedes implementarla luego)
    navigate('/perfil');
    handleMenuClose();
  };

  const handleLogout = () => {
    // Elimina el token del localStorage y redirige al login
    localStorage.removeItem('token');
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Icono del menú (opcional) */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* Título */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard de Inventario
        </Typography>

        {/* Avatar y menú desplegable */}
        <IconButton onClick={handleMenuOpen} color="inherit">
          <Avatar alt="Admin User" src="/static/images/avatar/1.jpg" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleProfile}>Perfil</MenuItem>
          <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
