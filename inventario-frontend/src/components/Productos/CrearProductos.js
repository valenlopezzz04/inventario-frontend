import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from '../../Config/axiosConfig'; // Importamos la configuración de Axios

function CrearProductos() {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [estado, setEstado] = useState('Disponible'); // Por defecto, 'Disponible'
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar datos al backend
      const response = await axios.post('/gestion/productos', {
        nombre_producto: nombre,
        cantidad: parseInt(cantidad), // Aseguramos que la cantidad sea un número
        ubicacion_almacen: ubicacion,
        estado,
        categoria,
      });

      // Mostrar mensaje de éxito
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
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crear Producto
      </Typography>
      <form onSubmit={handleSubmit}>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Crear Producto
        </Button>
      </form>

      {/* Mensajes de éxito o error */}
      {success && <Typography color="success.main">{success}</Typography>}
      {error && <Typography color="error.main">{error}</Typography>}
    </Box>
  );
}

export default CrearProductos;
