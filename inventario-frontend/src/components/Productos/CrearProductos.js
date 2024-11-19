import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import axiosInstance from '../../Config/axiosConfig'; // Asegúrate de que el path sea correcto

function CrearProductos() {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [estado, setEstado] = useState('Disponible');
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(
        '/gestion/productos',
        {
          nombre_producto: nombre,
          cantidad: parseInt(cantidad),
          ubicacion_almacen: ubicacion,
          estado,
          categoria,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Producto creado con éxito');
      setError('');
      setNombre('');
      setCantidad('');
      setUbicacion('');
      setCategoria('');
    } catch (err) {
      setError('Error al crear el producto. Inténtalo nuevamente.');
      setSuccess('');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Crear Producto
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre del Producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Cantidad"
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Ubicación en el Almacén"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Crear Producto
        </Button>
      </form>

      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}

export default CrearProductos;
