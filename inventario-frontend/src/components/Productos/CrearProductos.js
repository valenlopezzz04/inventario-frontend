import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, Snackbar, FormControlLabel, Checkbox } from '@mui/material';
import axiosInstance from '../../Config/axiosConfig';

function CrearProductos() {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [estado, setEstado] = useState('Disponible');
  const [categoria, setCategoria] = useState('');
  const [habilitarReposicion, setHabilitarReposicion] = useState(false); // Nuevo estado
  const [cantidadReposicion, setCantidadReposicion] = useState(10); // Nueva cantidad por defecto
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mensajeAlerta, setMensajeAlerta] = useState(false);

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
          habilitarReposicion, // Enviar al backend
          cantidad_reposicion: parseInt(cantidadReposicion), // Enviar cantidad de reposición
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
      setHabilitarReposicion(false);
      setCantidadReposicion(10);

      // Mostrar alerta si la cantidad es menor a 5
      if (parseInt(cantidad) < 5) {
        setMensajeAlerta(true);
      }
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
        <FormControlLabel
          control={
            <Checkbox
              checked={habilitarReposicion}
              onChange={(e) => setHabilitarReposicion(e.target.checked)}
            />
          }
          label="Habilitar Reposición Automática"
        />
        {habilitarReposicion && (
          <TextField
            fullWidth
            margin="normal"
            label="Cantidad de Reposición"
            type="number"
            value={cantidadReposicion}
            onChange={(e) => setCantidadReposicion(e.target.value)}
          />
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Crear Producto
        </Button>
      </form>

      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {/* Mensaje emergente */}
      <Snackbar
        open={mensajeAlerta}
        autoHideDuration={5000}
        onClose={() => setMensajeAlerta(false)}
      >
        <Alert onClose={() => setMensajeAlerta(false)} severity="warning" sx={{ width: '100%' }}>
          ¡Stock insuficiente! Revisar notificaciones.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CrearProductos;

