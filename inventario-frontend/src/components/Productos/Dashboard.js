import React, { useEffect, useState } from 'react';
import axios from '../../Config/axiosConfig';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Inventory, Warning, Update } from '@mui/icons-material';

function Dashboard() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [inventarioActivo, setInventarioActivo] = useState(0);
  const [productosAgotados, setProductosAgotados] = useState(0);
  const [ultimaActualizacion, setUltimaActualizacion] = useState("No disponible");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/gestion/productos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const productos = response.data;
        setTotalProductos(productos.length);
        setInventarioActivo(productos.filter((producto) => producto.estado === 'Disponible').length);
        setProductosAgotados(productos.filter((producto) => producto.cantidad === 0).length);
        setUltimaActualizacion(new Date().toLocaleString());
      } catch (error) {
        console.error('Error al cargar los datos del dashboard:', error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  const cardStyle = {
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    height: '150px',
  };

  return (
    <Box sx={{ padding: '20px', marginLeft: '240px' }}> {/* Añadido para alinear con Sidebar */}
      <Typography variant="h4" gutterBottom>
        Inventario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ ...cardStyle, backgroundColor: '#4caf50' }}>
            <Inventory fontSize="large" />
            <Typography variant="h6">Total Productos</Typography>
            <Typography variant="h4">{totalProductos}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ ...cardStyle, backgroundColor: '#2196f3' }}>
            <Inventory fontSize="large" />
            <Typography variant="h6">Inventario Activo</Typography>
            <Typography variant="h4">{inventarioActivo}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ ...cardStyle, backgroundColor: '#f44336' }}>
            <Warning fontSize="large" />
            <Typography variant="h6">Productos Agotados</Typography>
            <Typography variant="h4">{productosAgotados}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} style={{ ...cardStyle, backgroundColor: '#ff9800' }}>
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
