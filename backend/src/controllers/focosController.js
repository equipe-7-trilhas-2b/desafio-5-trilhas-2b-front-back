const pool = require('../config/database');

exports.listarFocos = async (req, res) => {
  try {
    const { municipio_id, dias } = req.query;
    let queryParams = [];
    let whereClauses = [];
    let paramIndex = 1;

    if (municipio_id && !isNaN(parseInt(municipio_id))) {
      whereClauses.push(`f.municipio_id_ibge = $${paramIndex}`);
      queryParams.push(parseInt(municipio_id));
      paramIndex++;
    }

    if (dias && !isNaN(parseInt(dias))) {
      whereClauses.push(`f.data_hora >= NOW() - ($${paramIndex} * INTERVAL '1 day')`);
      queryParams.push(parseInt(dias));
      paramIndex++;
    }

    const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const queryText = `
      SELECT
        f.id AS id_foco,
        f.data_hora,
        f.bioma,
        f.risco_fogo,
        f.latitude,
        f.longitude,
        m.nome AS municipio
      FROM 
        tb_focos AS f
      -- CORREÇÃO DEFINITIVA NA CLÁUSULA JOIN
      JOIN 
        tb_municipios AS m ON f.municipio_id_ibge = m.id_ibge
      ${whereString}
      ORDER BY 
        f.data_hora DESC
      LIMIT 1000;
    `;

    const { rows } = await pool.query(queryText, queryParams);
    res.status(200).json(rows);

  } catch (error) {
    console.error('Erro ao listar focos com filtros:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

exports.obterFocoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const queryText = `
            SELECT 
                f.*, 
                m.nome AS municipio
            FROM 
                tb_focos AS f
            -- CORREÇÃO DEFINITIVA NA CLÁUSULA JOIN
            JOIN 
                tb_municipios AS m ON f.municipio_id_ibge = m.id_ibge
            WHERE 
                f.id = $1;
        `;
        const { rows } = await pool.query(queryText, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Foco não encontrado.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao obter foco por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};