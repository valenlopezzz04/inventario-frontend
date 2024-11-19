import React, { useEffect, useState } from 'react';
import axios from '../../Config/axiosConfig'; // Asegúrate de usar tu configuración de Axios
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  // Cargar la lista de usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('/auth/usuarios', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsuarios(response.data);
        setMensaje('');
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        setMensaje('No se pudo cargar la lista de usuarios.');
      }
    };

    fetchUsuarios();
  }, []);

  // Eliminar un usuario
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/auth/usuarios/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMensaje('Usuario eliminado con éxito.');
      setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setMensaje('Hubo un error al eliminar el usuario.');
    }
  };

  return (
    <Box sx={{ padding: '20px', marginLeft: '240px' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Encabezado */}
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>

      {/* Mensaje de confirmación */}
      {mensaje && (
        <Typography
          variant="body1"
          sx={{ color: mensaje.includes('éxito') ? 'green' : 'red', mb: 2 }}
        >
          {mensaje}
        </Typography>
      )}

      {/* Tabla de Usuarios */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <TableRow key={usuario._id}>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(usuario._id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay usuarios registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListaUsuarios;
