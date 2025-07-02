const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

// Rota para obter os dados de um usuário específico pelo ID
router.get('/:id', usuariosController.obterPerfilPorId);

// Rota para atualizar os dados de um usuário específico pelo ID

router.put('/:id', usuariosController.atualizarPerfilPorId);

// Rota para um admin (ou para fins de teste) alterar a senha de um usuário pelo ID
router.patch('/:id/senha', usuariosController.alterarSenhaPorId);

module.exports = router;