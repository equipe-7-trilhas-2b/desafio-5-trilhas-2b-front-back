// src/controllers/authController.js

const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Módulo nativo do Node para gerar o token

/**
 * @description Registra um novo usuário.
 */
// src/controllers/authController.js

exports.registrar = async (req, res) => {
  // 1. Recebemos 'sobrenome' do corpo da requisição
  const { nome, sobrenome, email, senha, role = 'cidadao' } = req.body;

  if (!nome || !sobrenome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, sobrenome, e-mail e senha são obrigatórios.' });
  }

  try {
    const hashDaSenha = await bcrypt.hash(senha, 10);

    const queryText = `
      INSERT INTO tb_usuarios (nome, sobrenome, email, senha_hash, role) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING id, nome, sobrenome, email, role
    `;

    const values = [nome, sobrenome, email, hashDaSenha, role];
    
    const { rows } = await pool.query(queryText, values);

    res.status(201).json(rows[0]);
  } catch (error) {
    if (error.code === '23505') {
        return res.status(409).json({ error: "Este e-mail já está cadastrado." });
    }
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro interno ao registrar usuário." });
  }
};

/**
 * @description Autentica um usuário e retorna um token JWT.
 */
exports.login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }
  try {
    const { rows } = await pool.query("SELECT * FROM tb_usuarios WHERE email = $1", [email]);
    if (rows.length === 0) return res.status(401).json({ error: "Credenciais inválidas." });

    const usuario = rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) return res.status(401).json({ error: "Credenciais inválidas." });

    const token = jwt.sign({ sub: usuario.id_usuario, role: usuario.funcao }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

/**
 * @description Gera um token para reset de senha e o retorna no JSON (SEM E-MAIL).
 */
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const { rows } = await pool.query("SELECT * FROM tb_usuarios WHERE email = $1", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário com este e-mail não encontrado." });
    }
    const usuario = rows[0];
    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 3600000); // Token expira em 1 hora

    await pool.query(
      "UPDATE tb_usuarios SET reset_password_token = $1, reset_password_expires = $2 WHERE id_usuario = $3",
      [token, expires, usuario.id_usuario]
    );

    res.status(200).json({
      message: "Token gerado para desenvolvimento. Use-o na próxima etapa.",
      resetToken: token
    });

  } catch (error) {
    console.error("Erro no processo de 'esqueci minha senha':", error);
    res.status(500).json({ error: "Erro ao tentar gerar token de recuperação." });
  }
};

/**
 * @description Valida o token e redefine a senha do usuário.
 */
exports.resetPassword = async (req, res) => {
  const { token, senha } = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM tb_usuarios WHERE reset_password_token = $1 AND reset_password_expires > NOW()",
      [token]
    );
    if (rows.length === 0) {
      return res.status(400).json({ error: "Token inválido, expirado ou já utilizado." });
    }

    const usuario = rows[0];
    const hashDaNovaSenha = await bcrypt.hash(senha, 10);

    await pool.query(
      "UPDATE tb_usuarios SET senha = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id_usuario = $2",
      [hashDaNovaSenha, usuario.id_usuario]
    );
    
    res.status(200).json({ message: "Senha alterada com sucesso!" });
  } catch (error) {
    console.error("Erro no processo de resetar a senha:", error);
    res.status(500).json({ error: "Erro ao tentar redefinir a senha." });
  }
};