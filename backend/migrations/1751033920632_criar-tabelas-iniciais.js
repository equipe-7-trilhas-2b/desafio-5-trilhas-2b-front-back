exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    -- 1. TIPOS PERSONALIZADOS
    CREATE TYPE user_role AS ENUM ('admin', 'cidadao');
    CREATE TYPE status_denuncia AS ENUM ('recebida', 'em_analise', 'confirmada', 'falsa');
    CREATE TYPE tipo_alerta AS ENUM ('risco_de_fogo', 'novo_foco_satelite');
    CREATE TYPE nivel_risco AS ENUM ('baixo', 'medio', 'alto', 'critico');

    -- 2. TABELAS BASE (sem dependências)
    CREATE TABLE tb_municipios (
      id_ibge INT PRIMARY KEY,
      nome VARCHAR(150) NOT NULL,
      uf CHAR(2) NOT NULL,
      latitude NUMERIC(10, 8) NOT NULL,
      longitude NUMERIC(11, 8) NOT NULL
    );

    CREATE TABLE tb_usuarios (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      nome VARCHAR(100) NOT NULL,
      sobrenome VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      senha_hash VARCHAR(255) NOT NULL,
      role user_role NOT NULL DEFAULT 'cidadao',
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );

    -- 3. TABELAS DEPENDENTES (com chaves estrangeiras)
    CREATE TABLE tb_endereco (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      usuario_id UUID NOT NULL REFERENCES tb_usuarios(id) ON DELETE CASCADE,
      logradouro VARCHAR(255) NOT NULL,
      bairro VARCHAR(100) NOT NULL,
      numero VARCHAR(20),
      complemento TEXT,
      referencia TEXT,
      municipio_id_ibge INT NOT NULL REFERENCES tb_municipios(id_ibge),
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE tb_focos (
      id BIGSERIAL PRIMARY KEY,
      data_hora TIMESTAMP WITH TIME ZONE NOT NULL,
      bioma VARCHAR(100) NOT NULL,
      dias_sem_chuva INT NOT NULL DEFAULT 0,
      frp REAL,
      risco_fogo nivel_risco,
      latitude NUMERIC(10, 8) NOT NULL,
      longitude NUMERIC(11, 8) NOT NULL,
      municipio_id_ibge INT NOT NULL REFERENCES tb_municipios(id_ibge)
    );
    
    CREATE TABLE tb_denuncias (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      usuario_id UUID NOT NULL REFERENCES tb_usuarios(id),
      descricao TEXT NOT NULL,
      latitude NUMERIC(10, 8) NOT NULL,
      longitude NUMERIC(11, 8) NOT NULL,
      foto VARCHAR(255) NOT NULL,
      status status_denuncia NOT NULL DEFAULT 'recebida',
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE tb_alertas (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      usuario_id UUID NOT NULL REFERENCES tb_usuarios(id) ON DELETE CASCADE,
      tipo tipo_alerta NOT NULL,
      ativo BOOLEAN NOT NULL DEFAULT TRUE,
      foco_id BIGINT REFERENCES tb_focos(id) ON DELETE SET NULL,
      denuncia_id UUID REFERENCES tb_denuncias(id) ON DELETE SET NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    -- A ordem de exclusão é a INVERSA da criação para não violar chaves estrangeiras.
    DROP TABLE tb_alertas;
    DROP TABLE tb_denuncias;
    DROP TABLE tb_focos;
    DROP TABLE tb_endereco;
    DROP TABLE tb_usuarios;
    DROP TABLE tb_municipios;

    -- E por fim, os tipos
    DROP TYPE nivel_risco;
    DROP TYPE tipo_alerta;
    DROP TYPE status_denuncia;
    DROP TYPE user_role;
  `);
};