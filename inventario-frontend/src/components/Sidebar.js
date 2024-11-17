import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#001E3C', // Fondo oscuro
          color: '#fff', // Texto blanco
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Encabezado del Sidebar */}
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h6" noWrap sx={{ color: '#90CAF9', fontWeight: 'bold' }}>
          InventarioApp
        </Typography>
        <Typography variant="body2" sx={{ color: '#B0BEC5' }}>
          Administrador
        </Typography>
      </Box>

      {/* Lista de opciones del Sidebar */}
      <List>
        {/* Botón para Dashboard */}
        <ListItem button component={Link} to="/">
          <ListItemIcon sx={{ color: '#90CAF9' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            sx={{
              color: '#fff', // Texto blanco
              fontWeight: 'bold', // Negrita
            }}
          />
        </ListItem>

        {/* Botón para Gestión de Productos */}
        <ListItem button component={Link} to="/productos">
          <ListItemIcon sx={{ color: '#90CAF9' }}>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText
            primary="Gestión de Productos"
            sx={{
              color: '#fff', // Texto blanco
              fontWeight: 'bold', // Negrita
            }}
          />
        </ListItem>

        {/* Botón para Gestión de Usuarios */}
        <ListItem button component={Link} to="/usuarios">
          <ListItemIcon sx={{ color: '#90CAF9' }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Gestión de Usuarios"
            sx={{
              color: '#fff', // Texto blanco
              fontWeight: 'bold', // Negrita
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
