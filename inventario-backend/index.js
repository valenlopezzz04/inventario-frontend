require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 // Mantén este timeout
})
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch((error) => console.error("Error conectando a MongoDB:", error));

app.use(express.json());

const productosRouter = require('./routes/productos');
app.use('/api/productos', productosRouter);

app.get('/', (req, res) => {
    res.send('API de Gestión de Inventario');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
