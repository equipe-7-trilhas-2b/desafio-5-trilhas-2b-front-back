// scripts/popularMunicipios.js

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({ 
        host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, 
 });

async function popularMunicipios() {
    try {
        await client.connect();
        console.log('Conectado ao PostgreSQL!');

        const filePath = path.join(__dirname, '../dados/municipios_ma.csv');
        // Adicionando um log para ter certeza que o caminho está correto
        console.log('Tentando ler o arquivo de:', filePath);

        const promises = []; 

        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    // ================================================================
                    // LINHA DE DEBUG - A MAIS IMPORTANTE!
                    // Vamos imprimir a primeira linha do CSV para ver sua estrutura.
                    if (promises.length === 0) { // Imprime apenas para a primeira linha
                        console.log('Estrutura da primeira linha do CSV (row):', row);
                    }
                    // ================================================================

                    if (row.codigo_uf === '21') {
                        // Se o código chegar aqui, nós veremos a mensagem abaixo.
                        console.log(`-> Município ${row.nome} (UF ${row.codigo_uf}) passou no filtro. Preparando para inserir.`);
                        
                        const query = {
                            text: `INSERT INTO tb_municipios(id_ibge, nome, uf, latitude, longitude)
                                   VALUES($1, $2, $3, $4, $5)
                                   ON CONFLICT (id_ibge) DO NOTHING;`,
                            values: [
                                row.codigo_ibge,
                                row.nome,
                                'MA', 
                                row.latitude,
                                row.longitude
                            ],
                        };
                        promises.push(client.query(query));
                    }
                })
                .on('end', () => {
                    // Adicionamos um log aqui para sabermos quantas inserções foram preparadas
                    console.log(`${promises.length} municípios foram preparados para inserção.`);
                    resolve();
                }) 
                .on('error', reject); 
        });

        await Promise.all(promises);
        console.log('Processamento do CSV e inserções concluídos com sucesso!');

    } catch (err) {
        console.error('Erro ao popular municípios:', err.stack);
    } finally {
        await client.end();
        console.log('Conexão com o banco fechada.');
    }
}

popularMunicipios();