import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Guardar el token en localStorage
      navigate('/'); // Redirigir al Dashboard después de iniciar sesión
    } catch (err) {
      setError('Credenciales incorrectas. Inténtalo nuevamente.');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Fondo degradado */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          background: 'linear-gradient(to bottom, #1e3c72, #2a5298)', // Degradado interactivo
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Gestión de Inventario
          </Typography>
          <Typography variant="h6">
            Bienvenido, gestiona tus productos de manera eficiente.
          </Typography>
        </Box>
      </Grid>
      {/* Formulario del Login */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Inicia sesión para continuar
          </Typography>
          <form onSubmit={handleLogin} style={{ width: '100%', marginTop: '10px' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1, mb: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              Iniciar Sesión
            </Button>
          </form>
          {/* Botón de registro */}
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 1,
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                borderColor: '#115293',
                color: '#115293',
              },
            }}
            onClick={() => navigate('/register')} // Redirige al formulario de registro
          >
            Crear una cuenta
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;

