import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import axiosInstance from '../Config/axiosConfig'; // Asegúrate de que el path sea correcto

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Credenciales incorrectas.');
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
          Gestion de Inventarios
        </Typography>
        <form onSubmit={handleLogin}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
          >
            Iniciar Sesión
          </Button>
        </form>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2, py: 1.5 }}
          onClick={() => navigate('/register')}
        >
          Registrarse
        </Button>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Paper>
    </Box>
  );
}

export default Login;
