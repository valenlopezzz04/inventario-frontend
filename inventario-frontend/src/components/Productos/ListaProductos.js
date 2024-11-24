import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Config/axiosConfig';
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
  const [error, setError] = useState(''); // Para manejar errores

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegurarse de obtener el token
        if (!token) {
          throw new Error('No se encontró un token de autenticación');
        }

        const response = await axiosInstance.get('/gestion/productos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProductos(response.data);
      } catch (err) {
        console.error('Error al cargar los productos:', err.message || err);
        setError('Error al cargar los productos. Por favor, inténtalo de nuevo.');
      }
    };

    fetchProductos();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '900px',
        margin: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>
      <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
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
  );
}

export default ListaProductos;
