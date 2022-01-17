const fileSystem = require('fs');

const createNewListTalkers = (id, body) => {
  const talkers = JSON.parse(fileSystem.readFileSync('./talker.json', 'utf-8'));

  const talkerPeople = talkers.find((talker) => talker.id === Number(id));
  const talkersWithoutPeople = talkers.filter((talker) => talker.id !== Number(id));

  const talkersUpdated = [...talkersWithoutPeople, { id: Number(id), ...talkerPeople, ...body }];

  return talkersUpdated;
};

module.exports = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const newTalkersUpdated = createNewListTalkers(id, body);
  try {
    fileSystem.writeFileSync('./talker.json', JSON.stringify(newTalkersUpdated));
    console.log('Arquivo escrito com sucesso!');
  } catch (error) {
    console.log(`Erro ao escrever o arquivo: ${error.message}`);
  }

  res.status(200).send(newTalkersUpdated);
};
