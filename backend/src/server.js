const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const db = require('./src/config/database');

const focosRoutes = require('./routes/focosRoutes');
const estatisticasRoutes = require('./routes/estatisticasRoutes');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Maranhão em Alerta está no ar!');
});

app.use('/api/focos', focosRoutes);
app.use('/api/estatisticas', estatisticasRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});