const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const usuarios = []; // Simula banco de dados em memória

app.post('/register', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' });
  }

  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    return res.status(409).json({ mensagem: 'Usuário já cadastrado.' });
  }

  usuarios.push({ email, senha });
  return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' });
  }

  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
  }

  if (usuario.senha !== senha) {
    return res.status(401).json({ mensagem: 'Senha incorreta.' });
  }

  return res.status(200).json({ mensagem: 'Login bem-sucedido!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
