import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await axios.get('https://tu-backend-url/gestion/notificaciones', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setNotificaciones(response.data);
      } catch (error) {
        console.error('Error al cargar notificaciones:', error);
      }
    };
    fetchNotificaciones();
  }, []);

  const marcarComoLeida = async (id) => {
    try {
      await axios.put(`https://tu-backend-url/gestion/notificaciones/${id}`, { leida: true }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotificaciones((prev) => prev.filter((notificacion) => notificacion._id !== id));
    } catch (error) {
      console.error('Error al marcar como leída:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Notificaciones
      </Typography>
      {notificaciones.length === 0 ? (
        <Typography>No hay notificaciones pendientes</Typography>
      ) : (
        <List>
          {notificaciones.map((notificacion) => (
            <ListItem
              key={notificacion._id}
              sx={{
                backgroundColor: '#f5f5f5',
                marginBottom: 2,
                borderRadius: 1,
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  color="success"
                  onClick={() => marcarComoLeida(notificacion._id)}
                >
                  <CheckCircleIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={notificacion.nombre_producto}
                secondary={`Cantidad: ${notificacion.cantidad} | Fecha: ${new Date(
                  notificacion.fecha
                ).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Notificaciones;
