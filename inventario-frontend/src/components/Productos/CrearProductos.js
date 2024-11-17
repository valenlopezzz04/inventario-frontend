import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from '@mui/material';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

function CrearProductos() {
  const [formData, setFormData] = useState({
    nombre_producto: '',
    cantidad: '',
    ubicacion_almacen: '',
    estado: 'Disponible',
    categoria: '',
  });

  const [mensaje, setMensaje] = useState('');

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Enviar los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/gestion/productos',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMensaje('Producto creado con éxito.');
      setFormData({
        nombre_producto: '',
        cantidad: '',
        ubicacion_almacen: '',
        estado: 'Disponible',
        categoria: '',
      });
      console.log('Respuesta del backend:', response.data);
    } catch (error) {
      console.error('Error al crear el producto:', error);
      setMensaje('Hubo un error al crear el producto.');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Navbar */}
        <Navbar />

        {/* Formulario */}
        <Typography variant="h4" gutterBottom>
          Crear Nuevo Producto
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Producto"
                  name="nombre_producto"
                  value={formData.nombre_producto}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cantidad"
                  name="cantidad"
                  type="number"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ubicación en Almacén"
                  name="ubicacion_almacen"
                  value={formData.ubicacion_almacen}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  <MenuItem value="Disponible">Disponible</MenuItem>
                  <MenuItem value="Agotado">Agotado</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Categoría"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Crear Producto
                </Button>
              </Grid>
            </Grid>
          </form>
          {mensaje && (
            <Typography variant="body1" sx={{ mt: 2, color: 'green' }}>
              {mensaje}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default CrearProductos;
