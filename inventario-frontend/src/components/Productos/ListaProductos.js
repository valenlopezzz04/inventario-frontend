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
import Sidebar from '../Sidebar';

const backendUrl = 'https://inventario-backend-1.onrender.com'; // URL del backend

function ListaProductos() {
  const [productos, setProductos] = useState([]);

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`${backendUrl}/gestion/productos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProductos(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <Box sx={{ padding: '20px', marginLeft: '240px' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Productos
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
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
          {productos.length === 0 && (
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
