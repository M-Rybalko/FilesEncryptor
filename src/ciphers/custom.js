'use strict';

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
  console.log(cipher);
  rl.close();
};

module.exports = { createCipher };
