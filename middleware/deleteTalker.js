const fileSystem = require('fs');

module.exports = (req, res) => {
  const { id } = req.params;

  const talkers = JSON.parse(fileSystem.readFileSync('./talker.json', 'utf-8'));
  const listWithoutTalkerId = talkers.filter((talker) => talker.id !== Number(id));

  fileSystem.writeFileSync('./talker.json', JSON.stringify(listWithoutTalkerId));

  return res.status(204).json();
};
