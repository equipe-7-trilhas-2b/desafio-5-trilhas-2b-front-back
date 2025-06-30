// scripts/popular_focos.js

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

function mapearRisco(valorNumerico) {
    const risco = parseFloat(valorNumerico);

    if (isNaN(risco)) {
        return null;
    }

    if (risco > 0.9) {
        return 'critico';
    } else if (risco > 0.7) {
        return 'alto'; 
    } else if (risco > 0.3) {
        return 'medio'; 
    } else {
        return 'baixo'; 
    }
}


async function popularFocos() {
    try {
        await client.connect();
        console.log('Conectado ao PostgreSQL!');

        // ETAPA 1: Carregar os municípios da nossa tabela para a memória
        console.log('Carregando mapa de municípios da base de dados...');
        const municipiosResult = await client.query('SELECT id_ibge, nome FROM tb_municipios WHERE uf = \'MA\'');
        const municipioMap = new Map();
        for (const municipio of municipiosResult.rows) {
            municipioMap.set(municipio.nome.toUpperCase(), municipio.id_ibge);
        }
        console.log(`Mapa com ${municipioMap.size} municípios carregado.`);

        // ETAPA 2: Processar o arquivo CSV de focos
        const filePath = path.join(__dirname, '../dados/focos_mensal_ma_2025.csv'); // Verifique o nome do seu arquivo
        const promises = [];

        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    const nomeMunicipioCSV = row.municipio ? row.municipio.toUpperCase() : '';
                    const idIbge = municipioMap.get(nomeMunicipioCSV);

                    if (!idIbge) {
                        console.warn(`⚠️ Município "${row.municipio}" do CSV não encontrado. Pulando foco.`);
                        return;
                    }

                    const query = {
                        text: `INSERT INTO tb_focos(data_hora, bioma, dias_sem_chuva, frp, risco_fogo, latitude, longitude, municipio_id_ibge)
                               VALUES($1, $2, $3, $4, $5, $6, $7, $8);`,
                        values: [
                            row.data_hora_gmt,
                            row.bioma,
                            row.dias_sem_chuva || 0,
                            row.frp || null,
                            mapearRisco(row.risco_fogo),
                            row.lat,
                            row.lon,
                            idIbge // Inserindo o ID correto que encontramos no mapa!
                        ],
                    };
                    promises.push(client.query(query));
                })
                .on('end', resolve)
                .on('error', reject);
        });

        await Promise.all(promises);
        console.log('Processamento do CSV de focos e inserções concluídos!');

    } catch (err) {
        console.error('Erro ao popular focos:', err.stack);
    } finally {
        await client.end();
        console.log('Conexão com o banco fechada.');
    }
}

popularFocos();