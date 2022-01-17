const fileSystem = require('fs');

module.exports = (req, res) => {
  const { body: { name, age, talk } } = req;
  
  const talkers = JSON.parse(fileSystem.readFileSync('./talker.json', 'utf-8'));
  const id = talkers.length + 1;

  const newArchive = { id, name, age, talk };

  fileSystem.writeFileSync('./talker.json', JSON.stringify([newArchive]));

  return res.status(201).send(newArchive);
};