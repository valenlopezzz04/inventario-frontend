import React from 'react';
import { Box, Typography, Paper, Avatar, Grid } from '@mui/material';

function Perfil() {
  // Simulación de los datos del usuario (luego puedes cargarlos desde el backend)
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrador",
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Perfil del Usuario
      </Typography>
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
        <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}>
          {user.name.charAt(0)}
        </Avatar>
        <Typography variant="h5" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {user.email}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Rol:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{user.role}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Perfil;
