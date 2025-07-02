const pool = require('../config/database');

/**
 * @description Cria uma nova denúncia (requer login e upload de foto)
 */
exports.criarDenuncia = async (req, res) => {
  // Os dados de texto vêm do corpo do formulário
  const { latitude, longitude, descricao } = req.body;
  // O ID do usuário logado vem do middleware de autenticação
  const idUsuario = req.usuario.id;
  
  if (!req.file) {
    return res.status(400).json({ error: 'É obrigatório o envio de uma foto.' });
  }
  // A URL da imagem no Cloudinary é fornecida pelo middleware de upload
  const fotoUrl = req.file.path;

  try {
    const { rows } = await pool.query(
      `INSERT INTO tb_denuncias (latitude, longitude, descricao, foto, status, id_usuario)
       VALUES ($1, $2, $3, $4, 'recebida', $5) RETURNING *`,
      [latitude, longitude, descricao, fotoUrl, idUsuario]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Erro ao criar denúncia:", error);
    res.status(500).json({ error: "Erro interno do servidor ao criar denúncia." });
  }
};

/**
 * @description Lista as denúncias feitas pelo usuário que está logado
 */
exports.listarMinhasDenuncias = async (req, res) => {
  const idUsuario = req.usuario.id;
  try {
    const { rows } = await pool.query("SELECT * FROM tb_denuncias WHERE id_usuario = $1 ORDER BY data_hora DESC", [idUsuario]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar minhas denúncias:", error);
    res.status(500).json({ error: "Erro ao listar denúncias." });
  }
};

/**
 * @description Lista denúncias públicas (apenas as validadas) para o mapa
 */
exports.listarDenunciasPublicas = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT id_denuncia, latitude, longitude, descricao, status, data_hora FROM tb_denuncias WHERE status = 'validada' ORDER BY data_hora DESC");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao listar denúncias públicas:", error);
        res.status(500).json({ error: "Erro ao listar denúncias." });
    }
};