const fileSystem = require('fs');

module.exports = (req, res) => {
  const { id } = req.params;

  const talkers = JSON.parse(fileSystem.readFileSync('./talker.json', 'utf-8'));
  const speakerUser = talkers.find((speaker) => speaker.id === Number(id));
  
  if (!speakerUser) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).send(speakerUser);
};
