const express = require('express');
const router = express.Router();
const denunciasController = require('../controllers/denunciasController');
const upload = require('../config/upload');

// ROTA PÚBLICA: Para exibir denúncias já validadas no mapa
// Ex: GET /api/denuncias
router.get('/', denunciasController.listarDenunciasPublicas);

// ROTA PROTEGIDA: Para um usuário ver seu próprio histórico de denúncias
// Ex: GET /api/denuncias/minhas
router.get('/minhas', denunciasController.listarMinhasDenuncias);

// ROTA PROTEGIDA COM UPLOAD: Para criar uma nova denúncia
// Ex: POST /api/denuncias
router.post(
  '/', 
  upload.single('foto'), // 2º Middleware: Processa o upload da imagem enviada no campo 'foto'
  denunciasController.criarDenuncia // 3º Controller: Executa a lógica para salvar no banco
);

module.exports = router;