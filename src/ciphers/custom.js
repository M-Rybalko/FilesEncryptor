'use strict';

const fs = require('fs');
const readline = require('node:readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const createCipher = async () => {
  const cipher = {};
  let repeat = true;
  while (repeat) {
    const toReplace = await rl.question('Enter anything you need to replace: ');
    const replacer = await rl.question('Enter a substitution string: ');
    const stop = await rl.question('Stop creating cipher? (y/n) ');

    cipher[toReplace] = replacer;
    if (stop === 'y') repeat = false;
    if (stop === 'n') repeat = true;
  }
  rl.close();
  return cipher;
};

const encryptByCustom = (file, cipher) => {
  const data = fs.readFileSync(file, 'utf-8');
  let encrypted = data;
  if (data === '') {
    console.log('File is empty. Try choosing another file');
    rl.close();
    return;
  }
  for (const key of Object.keys(cipher)) {
    encrypted = encrypted.replaceAll(key, cipher[key]);
  }
  fs.writeFileSync('encrypted.txt', encrypted);
};

module.exports = { createCipher, encryptByCustom };
