const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login necessário'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = dados;

    const usuario = await Usuario.buscarPorId(id);

    if (!usuario) {
      return res.status(401).json({
        errors: ['Usuário inválido ou token expirado'],
      });
    }

   
    req.userId = id;
    req.userEmail = usuario.email;
    req.userPermissao = usuario.permissao; // Adiciona a permissão do usuário

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};