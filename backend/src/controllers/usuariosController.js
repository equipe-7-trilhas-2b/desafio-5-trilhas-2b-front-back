const pool = require('../config/database');
const bcrypt = require('bcryptjs'); 

/**
 * @description Obtém os dados do perfil de um usuário pelo ID fornecido na URL.
 * @route GET /api/usuarios/:id
 */
exports.obterPerfilPorId = async (req, res) => {
  try {
    // Pega o ID diretamente dos parâmetros da URL
    const { id } = req.params; 
    
    const { rows } = await pool.query(
      "SELECT id_usuario, nome, email, funcao FROM tb_usuarios WHERE id_usuario = $1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar perfil por ID:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

/**
 * @description Atualiza os dados de um usuário pelo ID fornecido na URL.
 * @route PUT /api/usuarios/:id
 */
exports.atualizarPerfilPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ error: "Nome e e-mail são obrigatórios." });
    }

    const { rows } = await pool.query(
      "UPDATE tb_usuarios SET nome = $1, email = $2 WHERE id_usuario = $3 RETURNING id_usuario, nome, email, funcao",
      [nome, email, id]
    );

    if (rows.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado para atualizar." });
    }

    res.json(rows[0]);
  } catch (error) {
    if (error.code === '23505') {
        return res.status(409).json({ error: "Este e-mail já está em uso por outro usuário." });
    }
    console.error("Erro ao atualizar perfil por ID:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

/**
 * @description Altera a senha de um usuário pelo ID (sem precisar da senha antiga).
 * @route PATCH /api/usuarios/:id/senha
 */
exports.alterarSenhaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { novaSenha } = req.body;

        if (!novaSenha) {
            return res.status(400).json({ error: "A nova senha é obrigatória." });
        }

        // Simplesmente criamos o hash da nova senha e atualizamos no banco.
        const hashDaNovaSenha = await bcrypt.hash(novaSenha, 10);

        const { rowCount } = await pool.query(
            "UPDATE tb_usuarios SET senha = $1 WHERE id_usuario = $2",
            [hashDaNovaSenha, id]
        );

        if (rowCount === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        res.status(200).json({ message: `Senha do usuário ${id} foi alterada.` });

    } catch (error) {
        console.error("Erro ao alterar senha:", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
};