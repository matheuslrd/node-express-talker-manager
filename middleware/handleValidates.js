const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(400).json(
      { message: 'O campo "name" é obrigatório' },
    ); 
  }

  if (name.length < 3) {
    return res.status(400).json(
      { message: 'O "name" deve ter pelo menos 3 caracteres' },
    );
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age.length === 0) {
    return res.status(400).json(
      { message: 'O campo "age" é obrigatório' },
    ); 
  }

  if (age < 18) {
    return res.status(400).json(
      { message: 'A pessoa palestrante deve ser maior de idade' },
    ); 
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;

  const dataMask = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  if (!dataMask.test(watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }

  if (!Number.isInteger(rate) || !(rate >= 1 && rate <= 5)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateTalkSecundary = (req, res, next) => {
  const { talk } = req.body;

  const validateLenght = (talks) => (talks.watchedAt.length === 0 || talks.rate.length === 0);
  
  if (!talk || talk.rate === undefined || !talk.watchedAt || validateLenght(talk)) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
};

module.exports = {
  validateAge,
  validateName,
  validateTalk,
  validateToken,
  validateTalkSecundary,
};
