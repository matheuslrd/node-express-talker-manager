const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const showTalker = require('./middleware/showTalker');

const loginMiddleware = require('./middleware/loginMiddleware');
const handleErrorLogin = require('./middleware/handleErrorLogin');

const talkerMiddleware = require('./middleware/talkerMiddleware');

const putTalkerIdMiddleware = require('./middleware/putTalkerIdMiddleware');

const getTalkerById = require('./middleware/getTalkerById');

const {
  validateName,
  validateTalk,
  validateAge,
  validateToken,
  validateTalkSecundary,
} = require('./middleware/handleValidates');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.route('/talker')
  .get(rescue(showTalker))
  .post(
    validateToken,
    validateName,
    validateAge,
    validateTalkSecundary,
    validateTalk,
    rescue(talkerMiddleware),
  );

app.route('/talker/:id')
  .get(rescue(getTalkerById))
  .put(
    validateToken,
    validateName,
    validateAge,
    validateTalkSecundary,
    validateTalk, 
    rescue(putTalkerIdMiddleware),
  );

app.post('/login', handleErrorLogin, rescue(loginMiddleware));

app.listen(PORT, () => {
  console.log('Online');
});
