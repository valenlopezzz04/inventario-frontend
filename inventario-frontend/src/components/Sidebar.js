import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Badge } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListAltIcon from '@mui/icons-material/ListAlt';

const drawerWidth = 240;

function Sidebar({ notificaciones }) {
  // Manejo seguro de `notificaciones`
  const notificacionesCount = notificaciones?.length || 0;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#001E3C',
          color: '#fff',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h6" noWrap sx={{ color: '#90CAF9', fontWeight: 'bold' }}>
          InventarioApp
        </Typography>
        <Typography variant="body2" sx={{ color: '#B0BEC5' }}>
          Administrador
        </Typography>
      </Box>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon sx={{ color: '#90CAF9' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: '#fff', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button component={Link} to="/productos">
          <ListItemIcon sx={{ color: '#90CAF9' }}>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Gestión de Productos" sx={{ color: '#fff', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button component={Link} to="/usuarios">
          <ListItemIcon sx={{ color: '#90CAF9' }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Gestión de Usuarios" sx={{ color: '#fff', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button component={Link} to="/notificaciones">
          <ListItemIcon sx={{ color: '#90CAF9' }}>
            <Badge
              badgeContent={notificacionesCount > 0 ? "!" : null}
              color="error"
              variant={notificacionesCount > 0 ? "standard" : "dot"}
            >
              <NotificationsIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Notificaciones" sx={{ color: '#fff', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button component={Link} to="/auditorias">
          <ListItemIcon sx={{ color: '#90CAF9' }}>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Auditorías" sx={{ color: '#fff', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button component={Link} to="/ordenes">
          <ListItemIcon sx={{ color: '#90CAF9' }}>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Gestión de Órdenes" sx={{ color: '#fff', fontWeight: 'bold' }} />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
