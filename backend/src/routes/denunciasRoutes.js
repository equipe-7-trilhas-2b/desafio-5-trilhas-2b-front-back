const express = require('express');
const router = express.Router();
const denunciasController = require('../controllers/denunciasController');

router.get('/', denunciasController.listarDenunciasPublicas);

router.get('/por-usuario/:idUsuario', denunciasController.listarDenunciasPorUsuario);

router.post('/', denunciasController.criarDenuncia);

module.exports = router;