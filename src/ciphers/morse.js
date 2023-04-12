'use strict';

const fs = require('fs');
const morseAlphabet = require('./morseAlphabet');

const encryptByMorse = (file) => {
  const data = (fs.readFileSync(file, 'utf-8')).toUpperCase().split('');
  const encrypted = [];
  const dividers = ['.', ',', ' ', ';', ':', '"', '?', '!',
    '[', ']', '{', '}', '(', ')', '&', '—'];

  for (let i = 0; i < data.length; i++) {
    let char = data[i];
    const nextChar = (data[i + 1]);

    if (Object.keys(morseAlphabet).includes(char)) {
      char = morseAlphabet[char];
      if (Object.keys(morseAlphabet).includes(nextChar)) char += '   ';
      if (dividers.includes(nextChar)) char += '       ';
    }

    encrypted.push(char);
    fs.writeFileSync('encrypted.txt', encrypted.join(''));
  }
};

module.exports = { encryptByMorse };
