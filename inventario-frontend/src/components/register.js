import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/register', { nombre: name, email, password });
      navigate('/login'); // Redirigir al Login después de registrarse
    } catch (err) {
      setError('Error al crear la cuenta. Inténtalo nuevamente.');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Fondo con degradado */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          background: 'linear-gradient(to right, #1e3c72, #2a5298)', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '2rem',
        }}
      >
        Gestión de Inventario
      </Grid>

      {/* Formulario del Registro */}
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
          {/* Título */}
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Crear una cuenta
          </Typography>
          <Typography component="h2" variant="h6" sx={{ color: 'gray', mb: 3 }}>
            Regístrate para acceder al sistema
          </Typography>
          <form onSubmit={handleRegister} style={{ width: '100%', marginTop: '10px' }}>
            {/* Nombre */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Email */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Contraseña */}
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
            {/* Error */}
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1, mb: 2 }}>
                {error}
              </Typography>
            )}
            {/* Botón de registro */}
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
              Registrarse
            </Button>
          </form>
          {/* Ir al Login */}
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
            onClick={() => navigate('/login')} // Redirige al Login
          >
            Ya tengo una cuenta
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
