const fileSystem = require('fs');

module.exports = (_req, res) => {
  const speakers = fileSystem.readFileSync('./talker.json', 'utf-8');

  if (!speakers || speakers.length === 0) {
    return res.status(200).send([]);
  }

  res.status(200).send(JSON.parse(speakers));
};
