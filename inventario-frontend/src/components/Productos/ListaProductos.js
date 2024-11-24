import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  // URL absoluta del backend
  const backendUrl = 'https://inventario-backend-1.onrender.com/gestion/productos';

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de que el token está configurado
        if (!token) {
          throw new Error('No se encontró un token de autenticación.');
        }

        // Realizar la solicitud con la URL absoluta
        const response = await fetch(backendUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener productos: ${response.statusText}`);
        }

        const data = await response.json();
        setProductos(data);
      } catch (err) {
        console.error('Error al cargar los productos:', err.message || err);
        setError('Error al cargar los productos. Por favor, inténtalo de nuevo.');
      }
    };

    fetchProductos();
  }, []);

  return (
    <Box sx={{ padding: '20px', marginLeft: '240px' }}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Productos
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          {error ? (
            <Typography
              variant="body1"
              sx={{ mt: 2, textAlign: 'center', color: 'red' }}
            >
              {error}
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Nombre</strong></TableCell>
                    <TableCell><strong>Cantidad</strong></TableCell>
                    <TableCell><strong>Ubicación</strong></TableCell>
                    <TableCell><strong>Estado</strong></TableCell>
                    <TableCell><strong>Categoría</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productos.map((producto) => (
                    <TableRow key={producto._id}>
                      <TableCell>{producto.nombre_producto}</TableCell>
                      <TableCell>{producto.cantidad}</TableCell>
                      <TableCell>{producto.ubicacion_almacen}</TableCell>
                      <TableCell>{producto.estado}</TableCell>
                      <TableCell>{producto.categoria}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {productos.length === 0 && !error && (
            <Typography
              variant="body1"
              sx={{ mt: 2, textAlign: 'center', color: 'gray' }}
            >
              No hay productos disponibles en el inventario.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default ListaProductos;
