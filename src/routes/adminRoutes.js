const { Router } = require('express');
const usuarioController = require('../controllers/usuarioController');
const loginRequired = require('../middlewares/loginRequired');
const adminRequired = require('../middlewares/adminRequired'); 

const router = Router();

// Adicione o 'adminRequired' depois do 'loginRequired'
// A requisição passará por um, e depois pelo outro.
router.get('/users', loginRequired, adminRequired, usuarioController.index); 
router.delete('/users/:id', loginRequired, adminRequired, usuarioController.delete); 

module.exports = router;