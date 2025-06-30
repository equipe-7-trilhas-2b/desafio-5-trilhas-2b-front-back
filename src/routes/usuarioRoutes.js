// src/routes/authRoutes.js

const { Router } = require('express');
const userController = require('../controllers/usuarioController'); // Ajuste o caminho conforme necessário

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;

