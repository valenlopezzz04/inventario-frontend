const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'standard'], default: 'standard' } // Campo de rol con valor por defecto
});
// Encriptar la contraseña antes de guardarla en la base de datos
UsuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Método para comparar contraseñas ingresadas con las almacenadas
UsuarioSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
