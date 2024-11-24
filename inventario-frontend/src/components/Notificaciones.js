const Notificaciones = ({ notificaciones, setNotificaciones }) => {
    const marcarComoLeida = async (id) => {
      try {
        await axios.delete(`https://tu-backend-url/gestion/notificaciones/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setNotificaciones((prev) => prev.filter((notificacion) => notificacion._id !== id));
      } catch (error) {
        console.error('Error al marcar como leída:', error);
      }
    };
  
    return (
      <Box sx={{ padding: 3, marginLeft: '240px', width: 'calc(100% - 240px)' }}>
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
