const fileSystem = require('fs');

const createNewListTalkers = (id, body) => {
  const talkers = JSON.parse(fileSystem.readFileSync('./talker.json', 'utf-8'));

  const talkersWithoutPeople = talkers.filter((talker) => talker.id !== Number(id));

  const talkersUpdated = [...talkersWithoutPeople, { id: Number(id), ...body }];

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

  const editedTalker = { id: Number(id), ...body };

  res.status(200).json(editedTalker);
};
