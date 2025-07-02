const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// --- Rotas de gestão de usuários ---
router.get('/usuarios', adminController.listarUsuarios);
router.delete('/usuarios/:id', adminController.deletarUsuario);
router.patch('/usuarios/:id/senha', adminController.adminResetarSenha);

// --- Rotas de moderação de denúncias ---
router.get('/denuncias', adminController.listarTodasDenuncias);
router.patch('/denuncias/:id/status', adminController.moderarDenuncia);

module.exports = router;