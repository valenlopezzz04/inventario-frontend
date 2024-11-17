import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from '@mui/material';

import Sidebar from '../Sidebar';

function EditarProducto() {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre_producto: '',
    cantidad: '',
    ubicacion_almacen: '',
    estado: 'Disponible',
    categoria: '',
  });

  const [mensaje, setMensaje] = useState('');

  // Cargar los datos del producto
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/gestion/productos/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setForm(response.data);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
        setMensaje('No se pudo cargar el producto.');
      }
    };

    fetchProducto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/gestion/productos/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMensaje('Producto actualizado con éxito.');
      setTimeout(() => navigate('/productos'), 2000); // Redirige después de 2 segundos
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      setMensaje('Hubo un error al actualizar el producto.');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />
        
        {/* Encabezado */}
        <Typography variant="h4" gutterBottom>
          Editar Producto
        </Typography>

        {/* Formulario */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre del Producto"
                  name="nombre_producto"
                  value={form.nombre_producto}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Cantidad"
                  name="cantidad"
                  value={form.cantidad}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ubicación en el Almacén"
                  name="ubicacion_almacen"
                  value={form.ubicacion_almacen}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Estado"
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                >
                  <MenuItem value="Disponible">Disponible</MenuItem>
                  <MenuItem value="No disponible">No disponible</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Categoría"
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                Guardar Cambios
              </Button>
            </Box>
          </form>
        </Paper>

        {/* Mensaje de confirmación */}
        {mensaje && (
          <Typography variant="body1" sx={{ mt: 2, color: mensaje.includes('éxito') ? 'green' : 'red' }}>
            {mensaje}
          </Typography>
        )}
      </Box>

      )
}

export default EditarProducto;
