import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Config/axiosConfig';

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('standard');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/register', {
        nombre,
        email,
        password,
        role,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || 'Error al registrar usuario. Inténtalo nuevamente.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1E3A8A, #9333EA)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: '30px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          borderRadius: '15px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Registro de Usuario
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Nombre"
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Correo Electrónico"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            select
            fullWidth
            label="Rol"
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value="standard">Estándar</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
          >
            Registrarse
          </Button>
        </form>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Paper>
    </Box>
  );
}

export default Register;