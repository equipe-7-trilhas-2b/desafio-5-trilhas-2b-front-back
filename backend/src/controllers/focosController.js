const pool = require('../config/database');

/**
 * @description Lista todos os focos de incêndio, com filtros opcionais.
 * @route GET /api/focos
 * @access Público
 */
exports.listarFocos = async (req, res) => {
  try {
    const { dias } = req.query;
    let filtroPeriodo = '';
    const queryParams = [];

    if (dias && !isNaN(parseInt(dias))) {
      filtroPeriodo = `WHERE data_hora >= NOW() - ($1 * INTERVAL '1 day')`;
      queryParams.push(parseInt(dias));
    }

    const queryText = `
      SELECT
        focos.id,
        focos.bioma,
        focos.data_hora,
        focos.satelite,
        focos.risco_fogo,
        focos.frp,
        ST_AsGeoJSON(focos.localizacao) as localizacao,
        m.nome as municipio
      FROM focos
      LEFT JOIN municipios m ON focos.municipio_id = m.id
      ${filtroPeriodo}
      ORDER BY data_hora DESC;
    `;

    const { rows } = await pool.query(queryText, queryParams);

    const focosFormatados = rows.map(foco => ({
      ...foco,
      localizacao: JSON.parse(foco.localizacao),
    }));

    res.status(200).json(focosFormatados);
  } catch (error) {
    console.error('Erro ao listar focos:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

/**
 * @description Obtém os detalhes de um foco de incêndio específico pelo seu ID.
 * @route GET /api/focos/:id
 * @access Público
 */
exports.obterFocoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const queryText = `
      SELECT 
        f.*, 
        m.nome as municipio,
        ST_AsGeoJSON(f.localizacao) as localizacao
      FROM focos f
      LEFT JOIN municipios m ON f.municipio_id = m.id
      WHERE f.id = $1;
    `;

    const { rows } = await pool.query(queryText, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Foco não encontrado.' });
    }

    const focoFormatado = {
      ...rows[0],
      localizacao: JSON.parse(rows[0].localizacao),
    };

    res.status(200).json(focoFormatado);
  } catch (error) {
    console.error('Erro ao obter foco por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};