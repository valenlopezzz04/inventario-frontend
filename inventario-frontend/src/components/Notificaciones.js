import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const backendUrl = 'https://inventario-backend-1.onrender.com';

const Notificaciones = ({ notificaciones, setNotificaciones }) => {
  const eliminarNotificacion = async (id) => {
    try {
      await axios.delete(`${backendUrl}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotificaciones((prev) => prev.filter((notificacion) => notificacion._id !== id));
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
    }
  };

  return (
    <Box sx={{ padding: 3, marginLeft: '240px' }}>
      <Typography variant="h4" gutterBottom>
        Notificaciones
      </Typography>
      {notificaciones.length === 0 ? (
        <Typography>No hay notificaciones pendientes</Typography>
      ) : (
        <List>
          {notificaciones.map((notificacion) => (
            <ListItem key={notificacion._id} sx={{ marginBottom: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <ListItemText
                primary={notificacion.nombre_producto}
                secondary={`Cantidad: ${notificacion.cantidad} | Fecha: ${new Date(
                  notificacion.fecha
                ).toLocaleString()}`}
              />
              <IconButton edge="end" color="success" onClick={() => eliminarNotificacion(notificacion._id)}>
                <CheckCircleIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Notificaciones;
