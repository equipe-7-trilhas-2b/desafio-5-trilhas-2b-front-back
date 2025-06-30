// src/models/Usuario.js

const db = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = {
  // Função para criar um novo usuário
  async criar(nome, email, senha) {
    // Hashear a senha antes de salvar
    const hashDaSenha = await bcrypt.hash(senha, 10);

    const query = `
      INSERT INTO usuarios (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING id, nome, email, data_criacao;
    `; // RETURNING devolve os dados inseridos, exceto a senha

    const values = [nome, email, hashDaSenha];

    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  // Função para encontrar um usuário pelo email
  async buscarPorEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1;';

    try {
      const { rows } = await db.query(query, [email]);
      // Retorna o primeiro usuário encontrado ou undefined se não houver nenhum
      return rows[0];
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      throw error;
    }
  },
};

module.exports = Usuario;