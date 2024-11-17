import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { Group, List } from '@mui/icons-material'; // Íconos de MUI
import { useNavigate } from 'react-router-dom';

function GestionUsuarios() {
  const navigate = useNavigate();

  // Estilo de las tarjetas
  const cardStyle = {
    backgroundColor: '#4caf50', // Verde
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    height: '150px',
  };

  return (
    <Box sx={{ padding: '20px', marginLeft: '240px' }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>
      <Grid container spacing={3}>
        {/* Ver Usuarios */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={cardStyle}>
            <Group fontSize="large" />
            <Typography variant="h6">Ver Usuarios</Typography>
            <Button
              variant="contained"
              style={{ marginTop: '10px', backgroundColor: 'white', color: '#4caf50' }}
              onClick={() => navigate('/usuarios/lista')}
            >
              Ver
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GestionUsuarios;
