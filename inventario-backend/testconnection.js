require('dotenv').config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conectado a MongoDB Atlas");
        mongoose.connection.close();  // Cierra la conexión inmediatamente
    })
    .catch((error) => {
        console.error("Error conectando a MongoDB:", error);
    });
