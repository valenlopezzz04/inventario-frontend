import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';


function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [alerta, setAlerta] = useState(false);

  const backendUrl = 'https://inventario-backend-1.onrender.com';
  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/gestion/ordenes`, { 
 
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrdenes(response.data);
      } catch (err) {
        setError('Error al cargar las órdenes.');
        console.error(err);
      }
    };

    fetchOrdenes();
  }, []);

  const handleActualizarEstado = async (id, estado) => {
    try {
      const response = await axios.put(
        `/gestion/ordenes/${id}`,
        { estado },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setOrdenes((prevOrdenes) =>
        prevOrdenes.map((orden) =>
          orden._id === id ? { ...orden, estado: response.data.orden.estado } : orden
        )
      );
      setSuccess('Orden actualizada con éxito.');
      setAlerta(true);
    } catch (err) {
      setError('Error al actualizar la orden.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ padding: '20px', marginLeft: '240px' }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Órdenes
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      {success && (
        <Snackbar open={alerta} autoHideDuration={3000} onClose={() => setAlerta(false)}>
          <Alert onClose={() => setAlerta(false)} severity="success">
            {success}
          </Alert>
        </Snackbar>
      )}
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Producto</strong></TableCell>
                <TableCell><strong>Cantidad Actual</strong></TableCell>
                <TableCell><strong>Reabastecer</strong></TableCell>
                <TableCell><strong>Estado</strong></TableCell>
                <TableCell><strong>Fecha</strong></TableCell>
                <TableCell><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordenes.map((orden) => (
                <TableRow key={orden._id}>
                  <TableCell>{orden.nombre_producto}</TableCell>
                  <TableCell>{orden.cantidad_actual}</TableCell>
                  <TableCell>{orden.cantidad_reposicion}</TableCell>
                  <TableCell>
                    <Chip
                      label={orden.estado}
                      color={orden.estado === 'Pendiente' ? 'warning' : 'success'}
                    />
                  </TableCell>
                  <TableCell>{new Date(orden.fecha).toLocaleString()}</TableCell>
                  <TableCell>
                    {orden.estado === 'Pendiente' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleActualizarEstado(orden._id, 'Completada')}
                      >
                        Completar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {ordenes.length === 0 && (
          <Typography color="textSecondary" align="center" sx={{ marginTop: '20px' }}>
            No hay órdenes disponibles.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default Ordenes;
