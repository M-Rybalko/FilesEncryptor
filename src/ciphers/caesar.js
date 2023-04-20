'use strict';

const fs = require('node:fs');

const encryptByCaesar = (file, step = 1) => {
  const data = (fs.readFileSync(file, 'utf-8')).split('');
  const encrypted = [];

  for (const char of data) {
    let encryptedChar = char.toLowerCase();
    let code = encryptedChar.codePointAt();

    if (encryptedChar.match(/[a-z]/)) {
      code = (((code - 'a'.codePointAt() + step) % 26) + 'a'.codePointAt());
      encryptedChar = String.fromCodePoint(code);
    }

    if (char.match(/[A-Z]/)) {
      encryptedChar = encryptedChar.toUpperCase();
    }

    encrypted.push(encryptedChar);
  }

  fs.writeFileSync('encrypted.txt', encrypted.join(''));
};

module.exports = { encryptByCaesar };
