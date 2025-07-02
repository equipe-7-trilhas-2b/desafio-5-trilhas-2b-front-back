const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const db = require('./src/config/database');

const focosRoutes = require('./routes/focosRoutes');
const estatisticasRoutes = require('./routes/estatisticasRoutes');
const authRoutes = require('./routes/authRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const denunciasRoutes = require('./routes/denunciasRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Maranhão em Alerta está no ar!');
});

app.use('/api/focos', focosRoutes);
app.use('/api/estatisticas', estatisticasRoutes);
app.use('/api/usuarios', usuariosRoutes); // Rotas para o perfil do usuário logado
app.use('/api/denuncias', denunciasRoutes); // Rotas para o sistema de denúncias
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});