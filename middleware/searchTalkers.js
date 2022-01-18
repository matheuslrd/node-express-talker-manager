const fileSystem = require('fs');

module.exports = (req, res) => {
  const { q } = req.query;

  const talkers = JSON.parse(fileSystem.readFileSync('./talker.json', 'utf-8'));

  if (!q) {
    return res.status(200).json(talkers);
  }

  const talkersSearch = talkers.filter(({ name }) => name.includes(q));

  if (!talkersSearch) {
    return res.status(200).json([]);
  }

  res.status(200).json(talkersSearch);
};