const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fileSystem = require('fs');

const talker = require('./talker.json');

const loginMiddleware = require('./middleware/loginMiddleware');
const handleErrorLogin = require('./middleware/handleErrorLogin');

const { handleErrorTalker, validateToken } = require('./middleware/handleErrorTalker');
const talkerMiddleware = require('./middleware/talkerMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue((_req, res) => {
  const speakers = fileSystem.readFileSync('./talker.json', 'utf-8');

  if (!speakers || speakers.length === 0) {
    return res.status(200).send([]);
  }

  res.status(200).send(JSON.parse(speakers));
}));

app.get('/talker/:id', rescue((req, res) => {
  const { id } = req.params;

  const speakerUser = talker.find((speaker) => speaker.id === Number(id));
  
  if (!speakerUser) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).send(speakerUser);
}));

app.post('/login', handleErrorLogin, rescue(loginMiddleware));

app.post('/talker', validateToken, handleErrorTalker, rescue(talkerMiddleware));

app.listen(PORT, () => {
  console.log('Online');
});
