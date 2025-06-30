// src/controllers/estatisticasController.js

const pool = require('../config/database');

/**
 * @description Gera um ranking dos 10 municípios com mais focos em um período.
 * @route GET /api/estatisticas/ranking-municipios
 */
exports.obterRankingMunicipios = async (req, res) => {
  try {
    const { dias = 365 } = req.query;

    const queryText = `
      SELECT
          m.nome as municipio,
          COUNT(f.id)::integer as total_focos 
      FROM 
          tb_focos AS f
      JOIN 
          tb_municipios AS m ON f.municipio_id_ibge = m.id_ibge
      WHERE 
          f.data_hora >= NOW() - ($1 * INTERVAL '1 day')
      GROUP BY 
          m.nome
      ORDER BY 
          total_focos DESC
      LIMIT 10;
    `;

    const { rows } = await pool.query(queryText, [parseInt(dias)]);
    res.status(200).json(rows);

  } catch (error) {
    console.error('Erro ao obter ranking de municípios:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};


/**
 * @description Gera um resumo com indicadores rápidos (KPIs).
 * @route GET /api/estatisticas/resumo
 */
exports.obterResumo = async (req, res) => {
  try {
    // Consultas para cada indicador, executadas em paralelo
    const focos24hQuery = pool.query("SELECT COUNT(id)::integer FROM tb_focos WHERE data_hora >= NOW() - INTERVAL '24 hours'");
    
    const biomaQuery = pool.query(`
      SELECT bioma, COUNT(id)::integer as total FROM tb_focos 
      WHERE data_hora >= NOW() - INTERVAL '7 days' AND bioma IS NOT NULL 
      GROUP BY bioma ORDER BY total DESC LIMIT 1
    `);
    
    const municipioQuery = pool.query(`
      SELECT m.nome, COUNT(f.id)::integer as total FROM tb_focos f 
      JOIN tb_municipios m ON f.municipio_id_ibge = m.id_ibge
      WHERE f.data_hora >= NOW() - INTERVAL '7 days'
      GROUP BY m.nome ORDER BY total DESC LIMIT 1
    `);

    // Espera todas as consultas terminarem
    const [focos24hResult, biomaResult, municipioResult] = await Promise.all([focos24hQuery, biomaQuery, municipioQuery]);

    // Monta o objeto de resposta final
    const resumo = {
      focos_ultimas_24h: focos24hResult.rows[0].count,
      municipio_mais_afetado_semana: municipioResult.rows[0] || { nome: 'N/A', total: 0 },
      bioma_mais_afetado_semana: biomaResult.rows[0] || { bioma: 'N/A', total: 0 },
    };

    res.status(200).json(resumo);
  } catch (error) {
    console.error('Erro ao obter resumo de estatísticas:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};


/**
 * @description Gera um histórico de focos por dia para os últimos 30 dias.
 * @route GET /api/estatisticas/historico-diario
 */
exports.obterHistoricoDiario = async (req, res) => {
  try {
    const queryText = `
      SELECT 
        DATE_TRUNC('day', data_hora)::date as dia,
        COUNT(id)::integer as total_focos
      FROM tb_focos
      WHERE data_hora >= NOW() - INTERVAL '30 days'
      GROUP BY dia
      ORDER BY dia ASC;
    `;
    const { rows } = await pool.query(queryText);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao obter histórico diário:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};