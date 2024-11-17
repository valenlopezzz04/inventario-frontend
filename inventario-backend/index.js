const cors = require('cors'); // Asegúrate de importar cors
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const productosRouter = require('./routes/productos');
const { authMiddleware, verificarRol } = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permitir solicitudes desde el frontend (React)
    credentials: true, // Permitir cookies y headers personalizados
}));

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://valejalopez444:valentina@gestioninventario.o72zu.mongodb.net/?retryWrites=true&w=majority&appName=GestionInventario', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => console.error("Error conectando a MongoDB:", error));

app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRouter);

// Rutas protegidas de productos (requieren autenticación)
app.use('/gestion/productos', authMiddleware, productosRouter);

// Ruta de prueba pública
app.get('/', (req, res) => {
    res.send('Prueba');
});

// Rutas de prueba para verificar autenticación y roles
// Ruta accesible solo para usuarios autenticados
app.get('/test/ruta-protegida', authMiddleware, (req, res) => {
    res.json({ message: `Bienvenido, estás autenticado como ${req.user.role}` });
});

// Ruta accesible solo para administradores
app.post('/test/admin-ruta', authMiddleware, (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
    res.json({ message: 'Acceso concedido solo para administradores' });
});

// Ruta accesible solo para usuarios estándar
app.get('/test/user-ruta', authMiddleware, (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
    res.json({ message: 'Acceso concedido solo para usuarios estándar' });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
