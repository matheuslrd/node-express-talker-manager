const verifyLengthOrNull = (value, res, field) => {
  if (!value || value.length === 0) {
    return res.status(400).json({ message: `O campo "${field}" é obrigatório` });
  }
};

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  const emailMask = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  verifyLengthOrNull(email, res, 'email');

  if (!emailMask.test(email)) {
    return res.status(400).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    );
  }

  verifyLengthOrNull(password, res, 'password');
  
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};