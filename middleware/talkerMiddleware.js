const validateToken = (token, res) => {
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = (req, res, _next) => {
  const { authorization } = req.headers;
  
  validateToken(authorization, res);

  res.status(200).send('Talker Middleware');
};