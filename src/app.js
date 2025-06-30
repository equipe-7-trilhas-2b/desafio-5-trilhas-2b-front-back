// app.js
require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/usuarioRoutes'); // Importa suas rotas

const app = express();

// Middleware para o Express entender requisições com corpo em JSON
app.use(express.json());

// Diz ao app para usar suas rotas de autenticação sob o prefixo /auth
// As rotas finais serão /auth/register e /auth/login
app.use('/auth', authRoutes);

// ... (o código que inicia o servidor com app.listen(PORT, ...))
// Geralmente isso fica no server.js

// Exporta o app para ser usado pelo server.js
module.exports = app;