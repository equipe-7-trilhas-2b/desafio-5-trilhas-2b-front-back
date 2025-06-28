const pool = require('../config/database');

const usuarioService = {
  async getAllUsuarios() {
    console.log('--- [SERVICE] A função getAllUsuarios foi chamada! ---');

    try {
      const { rows } = await pool.query('SELECT id, nome, email, role FROM tb_usuarios');

      console.log('--- [SERVICE] Query executada. Linhas encontradas:', rows.length);
      console.log('--- [SERVICE] Dados retornados:', rows);

      return rows;
    } catch (error) {
      console.error('--- [SERVICE] Erro ao executar a query:', error);
      throw error;
    }
  },

  async getUsuarioById(id) {
    try {
      const { rows } = await pool.query('SELECT id, nome, email, role FROM tb_usuarios WHERE id = $1', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar usuário com id ${id}:`, error);
      throw error;
    }
  }
};

    module.exports = usuarioService;