import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { AddCircle, List, Edit } from '@mui/icons-material'; // Íconos de MUI
import { useNavigate } from 'react-router-dom';

function GestionProductos() {
  const navigate = useNavigate();

  // Estilo de las tarjetas
  const cardStyle = {
    backgroundColor: '#2196f3', // Azul
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    height: '150px',
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>
      <Grid container spacing={3}>
        {/* Crear Producto */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={cardStyle}>
            <AddCircle fontSize="large" />
            <Typography variant="h6">Crear Producto</Typography>
            <Button
              variant="contained"
              style={{ marginTop: '10px', backgroundColor: 'white', color: '#2196f3' }}
              onClick={() => navigate('/productos/crear')}
            >
              Crear
            </Button>
          </Paper>
        </Grid>

        {/* Ver Productos */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ ...cardStyle, backgroundColor: '#4caf50' }}> {/* Verde */}
            <List fontSize="large" />
            <Typography variant="h6">Ver Productos</Typography>
            <Button
              variant="contained"
              style={{ marginTop: '10px', backgroundColor: 'white', color: '#4caf50' }}
              onClick={() => navigate('/productos/lista')}
            >
              Ver
            </Button>
          </Paper>
        </Grid>

        {/* Editar Productos */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ ...cardStyle, backgroundColor: '#f44336' }}> {/* Rojo */}
            <Edit fontSize="large" />
            <Typography variant="h6">Editar Producto</Typography>
            <Button
              variant="contained"
              style={{ marginTop: '10px', backgroundColor: 'white', color: '#f44336' }}
              onClick={() => navigate('/productos/editar')}
            >
              Editar
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GestionProductos;
