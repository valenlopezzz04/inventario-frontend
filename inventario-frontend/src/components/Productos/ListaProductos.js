import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  Button,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

function ListaProductos() {
  const [productos, setProductos] = useState([]);

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/gestion/productos', {
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

  // Manejar la eliminación de productos
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/gestion/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProductos(productos.filter((producto) => producto._id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px', marginLeft: '240px' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Navbar */}
        <Navbar />

        {/* Contenido */}
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
                  <TableCell><strong>Acciones</strong></TableCell>
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
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => console.log(`Editar producto con ID: ${producto._id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(producto._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
