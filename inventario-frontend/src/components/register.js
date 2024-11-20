import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
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
            console.log('Datos enviados al backend:', JSON.stringify({ nombre, email, password, role }));
            const response = await axiosInstance.post('/auth/register', { 
                nombre,
                email,
                password,
                role
            });
            console.log('Respuesta del backend:', response.data);
            navigate('/login');
        } catch (err) {
            console.error('Error al registrar usuario:', err.response?.data || err.message);
            setError(err.response?.data?.errors?.[0]?.msg || 'Error al registrar usuario. Inténtalo nuevamente.');
        }
    };

    return (
        <Box sx={{ maxWidth: '400px', margin: 'auto', mt: 5 }}>
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
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Registrarse
                </Button>
            </form>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Box>
    );
}

export default Register;
