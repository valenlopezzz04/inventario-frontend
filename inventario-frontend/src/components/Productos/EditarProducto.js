import React, { useState, useEffect } from 'react';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function EditarProducto() {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axiosInstance.get('/gestion/productos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProductos(response.data);
      } catch (error) {
        setError('Error al cargar los productos.');
      }
    };

    fetchProductos();
  }, []);

  const handleEdit = (producto) => {
    setSelectedProducto(producto);
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/gestion/productos/${selectedProducto._id}`, selectedProducto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccess('Producto actualizado con éxito.');
      setError('');
      setOpen(false);

      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto._id === selectedProducto._id ? selectedProducto : producto
        )
      );

      if (selectedProducto.cantidad < 5) {
        setMensajeAlerta(true);
      }
    } catch (err) {
      setError('Error al actualizar el producto.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/gestion/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto._id !== id)
      );
      setSuccess('Producto eliminado con éxito.');
      setError('');
    } catch (err) {
      setError('Error al eliminar el producto.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ padding: '20px', marginLeft: '240px' }}>
      <Typography variant="h4" gutterBottom>
        Editar Productos
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
                      onClick={() => handleEdit(producto)}
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre del Producto"
            name="nombre_producto"
            value={selectedProducto?.nombre_producto || ''}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Cantidad"
            name="cantidad"
            type="number"
            value={selectedProducto?.cantidad || ''}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ubicación en el Almacén"
            name="ubicacion_almacen"
            value={selectedProducto?.ubicacion_almacen || ''}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Estado"
            name="estado"
            value={selectedProducto?.estado || ''}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Categoría"
            name="categoria"
            value={selectedProducto?.categoria || ''}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary" variant="contained">
            Guardar
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary" variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      {success && <Typography color="success.main">{success}</Typography>}
      {error && <Typography color="error.main">{error}</Typography>}

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

export default EditarProducto;
