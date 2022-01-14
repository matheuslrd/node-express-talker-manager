const generateToken = require('../assets/helpers/generateToken');

module.exports = (req, res) => {
  const token = generateToken(16);

  res.status(200).json({ token });
};