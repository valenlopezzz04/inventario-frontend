import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import Navbar from '../Navbar';
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
        const response = await axios.get('http://localhost:3001/gestion/usuarios', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsuarios(response.data);
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
      await axios.delete(`http://localhost:3001/gestion/usuarios/${id}`, {
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
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Navbar */}
        <Navbar />

        {/* Encabezado */}
        <Typography variant="h4" gutterBottom>
          Gestión de Usuarios
        </Typography>

        {/* Mensaje de confirmación */}
        {mensaje && (
          <Typography variant="body1" sx={{ color: mensaje.includes('éxito') ? 'green' : 'red', mb: 2 }}>
            {mensaje}
          </Typography>
        )}

        {/* Tabla de Usuarios */}
        <TableContainer component={Paper}>
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
              {usuarios.map((usuario) => (
                <TableRow key={usuario._id}>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/usuarios/editar/${usuario._id}`)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(usuario._id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default ListaUsuarios;
