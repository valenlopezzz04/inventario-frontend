import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { Inventory, Person, Warning, Update } from '@mui/icons-material'; // Íconos de MUI

function Dashboard() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [inventarioActivo, setInventarioActivo] = useState(0);
  const [productosAgotados, setProductosAgotados] = useState(0);
  const [ultimaActualizacion, setUltimaActualizacion] = useState("No disponible");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/gestion/productos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const productos = response.data;
        setTotalProductos(productos.length);
        setInventarioActivo(productos.filter((producto) => producto.estado === 'Disponible').length);
        setProductosAgotados(productos.filter((producto) => producto.cantidad === 0).length);
        setUltimaActualizacion(new Date().toLocaleString());
      } catch (error) {
        console.error('Error al cargar los datos del dashboard:', error);
      }
    };

    fetchData();
  }, []);

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
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de Inventario
      </Typography>
      <Grid container spacing={3}>
        {/* Tarjeta: Total de Productos */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={cardStyle}>
            <Inventory fontSize="large" />
            <Typography variant="h6">Total Productos</Typography>
            <Typography variant="h4">{totalProductos}</Typography>
          </Paper>
        </Grid>

        {/* Tarjeta: Inventario Activo */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ ...cardStyle, backgroundColor: '#2196f3' }}> {/* Azul */}
            <Inventory fontSize="large" />
            <Typography variant="h6">Inventario Activo</Typography>
            <Typography variant="h4">{inventarioActivo}</Typography>
          </Paper>
        </Grid>

        {/* Tarjeta: Productos Agotados */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ ...cardStyle, backgroundColor: '#f44336' }}> {/* Rojo */}
            <Warning fontSize="large" />
            <Typography variant="h6">Productos Agotados</Typography>
            <Typography variant="h4">{productosAgotados}</Typography>
          </Paper>
        </Grid>

        {/* Tarjeta: Última Actualización */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ ...cardStyle, backgroundColor: '#ff9800' }}> {/* Naranja */}
            <Update fontSize="large" />
            <Typography variant="h6">Última Actualización</Typography>
            <Typography variant="h6">{ultimaActualizacion}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
