module.exports = (req, res, next) => {
  // A permissão já foi colocada no 'req' pelo middleware anterior (loginRequired)
  if (!req.userPermissao || req.userPermissao !== 'admin') {
    return res.status(403).json({ // 403 Forbidden
      errors: ['Acesso negado. Requer permissão de administrador.'],
    });
  }

  // Se chegou até aqui, é admin. Pode passar.
  return next();
};