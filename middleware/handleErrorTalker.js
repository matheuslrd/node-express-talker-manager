const validateName = (name, response) => {
  if (!name || name.length === 0) {
    return response.status(400).json(
      { message: 'O campo "name" é obrigatório' },
    ); 
  }

  if (name.length < 3) {
    return response.status(400).json(
      { message: 'O "name" deve ter pelo menos 3 caracteres' },
    );
  }
};

const validateAge = (age, response) => {
  if (!age || age.length === 0) {
    return response.status(400).json(
      { message: 'O campo "age" é obrigatório' },
    ); 
  }

  if (age < 18) {
    return response.status(400).json(
      { message: 'A pessoa palestrante deve ser maior de idade' },
    ); 
  }
};

const validateTalk = ({ watchedAt, rate }, response) => {
  const dataMask = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  if (!dataMask.test(watchedAt)) {
    return response.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }

  if (!Number.isInteger(rate) || !(rate >= 1 && rate <= 5)) {
    return response.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validateLenght = (talk) => (talk.watchedAt.length === 0 || talk.rate.length === 0);

module.exports = (req, res, next) => {
  const { name, age, talk } = req.body;

  validateName(name, res);

  validateAge(age, res);
  
  if (!talk || !talk.rate || !talk.watchedAt || validateLenght(talk)) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  validateTalk(talk, res);

  next();
};