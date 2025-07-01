const express = require('express');
const router = express.Router();
const focosController = require('../controllers/focosController');

// Rota para listar todos os focos (com filtros opcionais)
// Ex: GET /api/focos?dias=7
router.get('/', focosController.listarFocos);

// Rota para obter detalhes de um foco específico
// Ex: GET /api/focos/123
router.get('/:id', focosController.obterFocoPorId);

module.exports = router;