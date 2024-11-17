// routes/auth.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const router = express.Router();
const bcrypt = require('bcrypt');

const JWT_SECRET = 'valentina';

// Middleware para verificar el token y el rol de admin
const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token no válido.' });
    }
};

const verificarAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }
    next();
};

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

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = new Usuario({ nombre, email, password: hashedPassword, role: role || 'standard' });
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

        const token = jwt.sign({ userId: usuario._id, role: usuario.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint para obtener la lista de usuarios
router.get('/usuarios', verificarToken, verificarAdmin, async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, 'nombre email role'); // Campos que deseas enviar
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
