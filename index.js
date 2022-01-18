const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const handleErrorLogin = require('./middleware/handleErrorLogin');
const loginMiddleware = require('./middleware/loginMiddleware');
const showTalker = require('./middleware/showTalker');
const talkerMiddleware = require('./middleware/talkerMiddleware');
const getTalkerById = require('./middleware/getTalkerById');
const putTalkerIdMiddleware = require('./middleware/putTalkerIdMiddleware');
const deleteTalker = require('./middleware/deleteTalker');
const searchTalkers = require('./middleware/searchTalkers');

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

app.route('/talker/search')
  .get(validateToken, searchTalkers);

  app.route('/talker/:id')
  .get(rescue(getTalkerById))
  .put(
    validateToken,
    validateName,
    validateAge,
    validateTalkSecundary,
    validateTalk, 
    rescue(putTalkerIdMiddleware),
  )
  .delete(
    validateToken,
    deleteTalker,
  );

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

  app.post('/login', handleErrorLogin, rescue(loginMiddleware));

app.listen(PORT, () => {
  console.log('Online');
});
