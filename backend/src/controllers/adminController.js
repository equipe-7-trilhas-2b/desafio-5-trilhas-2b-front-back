const pool = require('../config/database');
const bcrypt = require('bcryptjs');

/**
 * @description Lista todos os usuários cadastrados no sistema.
 * @route GET /api/admin/usuarios
 * @access Admin
 */
exports.listarUsuarios = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT id_usuario, nome, email, funcao FROM tb_usuarios ORDER BY id_usuario ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar usuários (admin):", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

/**
 * @description Deleta um usuário específico pelo ID.
 * @route DELETE /api/admin/usuarios/:id
 * @access Admin
 */
exports.deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM tb_usuarios WHERE id_usuario = $1", [id]);

    if (rowCount === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(204).send(); // 204 No Content - significa sucesso sem corpo de resposta
  } catch (error) {
    console.error("Erro ao deletar usuário (admin):", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

/**
 * @description Redefine a senha de um usuário específico.
 * @route PATCH /api/admin/usuarios/:id/senha
 * @access Admin
 */
exports.adminResetarSenha = async (req, res) => {
    const { id } = req.params;
    const { novaSenha } = req.body;

    if (!novaSenha) {
        return res.status(400).json({ error: "A nova senha é obrigatória." });
    }

    try {
        const hashDaNovaSenha = await bcrypt.hash(novaSenha, 10);

        const { rowCount } = await pool.query(
            "UPDATE tb_usuarios SET senha = $1 WHERE id_usuario = $2",
            [hashDaNovaSenha, id]
        );

        if (rowCount === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        res.status(200).json({ message: `Senha do usuário ${id} alterada com sucesso.` });

    } catch (error) {
        console.error("Erro ao resetar senha pelo admin:", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
};

/**
 * @description Lista todas as denúncias enviadas por todos os usuários para moderação.
 * @route GET /api/admin/denuncias
 * @access Admin
 */
exports.listarTodasDenuncias = async (req, res) => {
    try {
        // Fazemos um JOIN para buscar também o nome do autor da denúncia, útil para o painel de admin.
        const query = `
            SELECT d.*, u.nome as nome_autor
            FROM tb_denuncias d
            JOIN tb_usuarios u ON d.id_usuario = u.id_usuario
            ORDER BY d.data_hora DESC
        `;
        const { rows } = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao listar todas as denúncias (admin):", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
};

/**
 * @description Altera o status de uma denúncia (ex: para 'validada' ou 'rejeitada').
 * @route PATCH /api/admin/denuncias/:id/status
 * @access Admin
 */
exports.moderarDenuncia = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validação para garantir que o status seja um dos valores permitidos
    if (!status || !['confirmada', 'em_analise', 'recebida', 'falsa'].includes(status)) {
        return res.status(400).json({ error: "Status inválido. Use 'confirmada' ou 'falsa'." });
    }

    try {
        const { rows } = await pool.query(
            "UPDATE tb_denuncias SET status = $1 WHERE id_denuncia = $2 RETURNING *",
            [status, id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Denúncia não encontrada." });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Erro ao moderar denúncia (admin):", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
};