const pool = require('../config/database');


exports.criarDenuncia = async (req, res) => {
  // Agora todos os dados vêm do req.body em formato JSON
  const { latitude, longitude, descricao, id_usuario } = req.body;

  if (!id_usuario || !latitude || !longitude || !descricao) {
    return res.status(400).json({ error: 'Os campos id_usuario, latitude, longitude e descricao são obrigatórios.' });
  }

  try {
    const query = `
      INSERT INTO tb_denuncias (latitude, longitude, descricao, status, id_usuario)
      VALUES ($1, $2, $3, 'recebida', $4) 
      RETURNING *
    `;
    const values = [latitude, longitude, descricao, id_usuario];
    
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);

  } catch (error) {
    console.error("Erro ao criar denúncia:", error);
    res.status(500).json({ error: "Erro interno do servidor ao criar denúncia." });
  }
};

/**
 * @description Lista as denúncias de um usuário específico pelo ID.
 */
exports.listarDenunciasPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const { rows } = await pool.query("SELECT id, latitude, longitude, descricao, status, id_usuario FROM tb_denuncias WHERE id_usuario = $1 ORDER BY created_at DESC", [idUsuario]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar denúncias por usuário:", error);
    res.status(500).json({ error: "Erro ao listar denúncias." });
  }
};

/**
 * @description Lista denúncias públicas (apenas as com status 'validada').
 */
exports.listarDenunciasPublicas = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT id, latitude, longitude, descricao, status FROM tb_denuncias WHERE status = 'confirmada' ORDER BY created_at DESC");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao listar denúncias públicas:", error);
        res.status(500).json({ error: "Erro ao listar denúncias." });
    }
};