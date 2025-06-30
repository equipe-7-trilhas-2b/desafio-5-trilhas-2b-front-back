const express = require('express');
const router = express.Router();
const estatisticasController = require('../controllers/estatisticasController');

// Rota para obter o ranking de municípios mais afetados
// Ex: GET /api/estatisticas/ranking-municipios?dias=30
router.get('/ranking-municipios', estatisticasController.obterRankingMunicipios);

router.get('/resumo', estatisticasController.obterResumo);

router.get('/historico-diario', estatisticasController.obterHistoricoDiario);

module.exports = router;