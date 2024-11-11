require('dotenv').config();
console.log("MongoDB URI:", process.env.MONGODB_URI);
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => console.error("Error conectando a MongoDB:", error));

// Middleware para analizar JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Gestión de Inventario');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
