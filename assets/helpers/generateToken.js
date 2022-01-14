module.exports = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const token = [];  
  for (let index = 0; index < length; index += 1) {
      const j = (Math.random() * (characters.length - 1)).toFixed(0);
      token[index] = characters[j];
  }
  return token.join('');
};
