// migrations/1751418572790_adicionar-reset-token-usuarios.cjs

'use strict';

// 1. Defina 'shorthands' desta forma, usando 'exports'
exports.shorthands = undefined;

// 2. Exporte a função 'up' desta forma, usando 'exports.up'
exports.up = pgm => {
  // Este objeto define as colunas a serem adicionadas
  const columns = {
    reset_password_token: { type: 'varchar(255)', default: null },
    reset_password_expires: { type: 'timestamp with time zone', default: null },
  };
  // Adiciona as colunas na tabela 'tb_usuarios'
  pgm.addColumns('tb_usuarios', columns);
};

// 3. Exporte a função 'down' desta forma, usando 'exports.down'
exports.down = pgm => {
  // Define as colunas a serem removidas ao reverter a migration
  const columns = ['reset_password_token', 'reset_password_expires'];
  pgm.dropColumns('tb_usuarios', columns);
};