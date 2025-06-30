// app.js

require('dotenv').config();
const express = require('express');

// Importação das rotas
const authRoutes = require('./routes/usuarioRoutes'); // Suas rotas existentes de login/registro
const adminRoutes = require('./routes/adminRoutes');  // As novas rotas de gestão de usuários

const app = express();

// Middleware para o Express entender requisições com corpo em JSON
app.use(express.json());

// Diz ao app para usar suas rotas de autenticação sob o prefixo /auth
app.use('/auth', authRoutes);

// Diz ao app para usar as rotas de gestão sob o prefixo /admin
app.use('/admin', adminRoutes);

// Exporta o app para ser usado pelo server.js
module.exports = app;