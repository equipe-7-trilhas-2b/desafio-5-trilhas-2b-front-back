const pool = require('../config/database');

/**
 * @description Gera um ranking dos 10 municípios com mais focos em um período.
 * @route GET /api/estatisticas/ranking-municipios
 * @access Público
 */
exports.obterRankingMunicipios = async (req, res) => {
  try {
    // Define o período padrão como 7 dias se nenhum for especificado
    const { dias = 7 } = req.query;

    const queryText = `
      SELECT
          m.nome as municipio,
          COUNT(f.id)::integer as total_focos 
      FROM focos f
      JOIN municipios m ON f.municipio_id = m.id
      WHERE f.data_hora >= NOW() - ($1 * INTERVAL '1 day')
      GROUP BY m.nome
      ORDER BY total_focos DESC
      LIMIT 10;
    `;

    const { rows } = await pool.query(queryText, [parseInt(dias)]);
    res.status(200).json(rows);

  } catch (error) {
    console.error('Erro ao obter ranking de municípios:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};