// routes/auth.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const router = express.Router();
const bcrypt = require('bcrypt');

const JWT_SECRET = 'valentina';


// Registro de usuario
router.post('/register', [
    body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio.'),
    body('email').isEmail().withMessage('Debe ser un email válido.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('role').optional().isIn(['admin', 'standard']).withMessage('Rol inválido.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, password, role } = req.body;
    try {
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }
        
        // Crea el usuario con el rol especificado o con rol 'standard' por defecto
        const usuario = new Usuario({ nombre, email, password, role: role || 'standard' });
        await usuario.save();
        
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Inicio de sesión
router.post('/login', [
    body('email').isEmail().withMessage('Debe ser un email válido.'),
    body('password').exists().withMessage('La contraseña es obligatoria.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            return res.status(400).json({ message: 'Credenciales incorrectas.' });
        }

        // Genera el token con el rol del usuario incluido
        const token = jwt.sign({ userId: usuario._id, role: usuario.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


