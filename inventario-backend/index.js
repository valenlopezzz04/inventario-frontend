const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://valejalopez444:valentina@gestioninventario.o72zu.mongodb.net/?retryWrites=true&w=majority&appName=GestionInventario', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => console.error("Error conectando a MongoDB:", error));

app.use(express.json());

const productosRouter = require('./routes/productos');
app.use('/gestion/productos', productosRouter);

app.get('/', (req, res) => {
    res.send('Prueba');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
