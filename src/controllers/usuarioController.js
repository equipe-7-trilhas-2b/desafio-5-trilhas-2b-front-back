// src/controllers/authController.js

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função para gerar o token JWT (sem alterações aqui)
function gerarToken(params = {}) {
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400, // Token expira em 24 horas
  });
}

module.exports = {
  async register(req, res) {
    // ... (seu código de registro continua igual, sem alterações)
    const { nome, email, senha } = req.body;

    try {
      if (await Usuario.buscarPorEmail(email)) {
        return res.status(400).json({ error: 'Usuário já cadastrado.' });
      }

      const usuario = await Usuario.criar(nome, email, senha);
      usuario.senha = undefined;

      // <-- MUDANÇA: Adicionar permissão ao token de registro também
      const token = gerarToken({ id: usuario.id, permissao: usuario.permissao });
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

      // 2. Comparar a senha
      if (!(await bcrypt.compare(senha, usuario.senha))) {
        return res.status(400).json({ error: 'Senha inválida.' });
      }

      usuario.senha = undefined;

      // 3. Gerar o token com a permissão
      // <-- MUDANÇA AQUI: Passamos o ID e a PERMISSÃO para o token.
      const token = gerarToken({ id: usuario.id, permissao: usuario.permissao });
      
      return res.status(200).json({ usuario, token });

    } catch (error) {
      return res.status(500).json({ error: 'Falha no login. Tente novamente.' });
    }
  },
  async index(req, res) {
    try {
      const usuarios = await require('../models/usuario').buscarTodos();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    try {
      await require('../models/usuario').deletarPorId(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
  }
};