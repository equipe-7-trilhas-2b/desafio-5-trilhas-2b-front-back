// src/controllers/authController.js

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função para gerar o token JWT
function gerarToken(params = {}) {
  // O 'seu_segredo_super_secreto' deve estar no .env!
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400, // Token expira em 24 horas
  });
}

module.exports = {
  async register(req, res) {
    const { nome, email, senha } = req.body;

    try {
      // 1. Verificar se o usuário já existe
      if (await Usuario.buscarPorEmail(email)) {
        return res.status(400).json({ error: 'Usuário já cadastrado.' });
      }

      // 2. Criar o novo usuário (a senha é hasheada no Model)
      const usuario = await Usuario.criar(nome, email, senha);

      // Não retornar a senha na resposta
      usuario.senha = undefined;

      // 3. Gerar o token e enviar a resposta
      const token = gerarToken({ id: usuario.id });
      return res.status(201).json({ usuario, token });

    } catch (error) {
      return res.status(500).json({ error: 'Falha no registro. Tente novamente.' });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;

    try {
      // 1. Buscar o usuário pelo email
      const usuario = await Usuario.buscarPorEmail(email);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // 2. Comparar a senha enviada com a senha hasheada no banco
      if (!(await bcrypt.compare(senha, usuario.senha))) {
        return res.status(400).json({ error: 'Senha inválida.' });
      }

      // Não retornar a senha na resposta
      usuario.senha = undefined;

      // 3. Gerar o token e enviar a resposta
      const token = gerarToken({ id: usuario.id });
      return res.status(200).json({ usuario, token });

    } catch (error) {
      return res.status(500).json({ error: 'Falha no login. Tente novamente.' });
    }
  },
};