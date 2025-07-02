// Dentro do novo arquivo de migration (ex: ..._remover_coluna_foto_de_denuncias.cjs)
'use strict';

exports.shorthands = undefined;

exports.up = pgm => {
  // Este comando remove a coluna 'foto' da tabela 'tb_denuncias'
  pgm.dropColumns('tb_denuncias', ['foto']);
};

exports.down = pgm => {
  // A função 'down' recria a coluna caso precisemos reverter a migration
  pgm.addColumns('tb_denuncias', {
    foto: { type: 'varchar(255)' }
  });
};