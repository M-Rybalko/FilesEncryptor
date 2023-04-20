'use strict';

const readline = require('node:readline/promises');
const fs = require('node:fs');
const morse = require('./ciphers/morse.js');
const caesar = require('./ciphers/caesar.js');

console.clear();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

rl.prompt();

const commands = {
  help() {
    const commandList = fs.readFileSync('./docs/commandList.txt', 'utf-8');
    console.log(commandList);
  },

  exit() {
    rl.close();
  },

  async encrypt() {
    const answer = await rl.question('Which file do you want to encrypt? ');
    const file = './' + answer;
    const cipher = await rl.question('Which cipher do you want to use? ');
    if (cipher === 'morse') morse.encryptByMorse(file);
    if (cipher === 'caesar') {
      const step = await rl.question('How many hops do you need? ');
      caesar.encryptByCaesar(file, step);
    }
  },

  async create() {
    console.log(`Welcome to cipher creating! 
      Here you can create, customise and save any ciphers!
      Type cipherHelp to see all commands:`);
  },

};

rl.on('line', (line) => {
  line = line.trim();
  const command = commands[line];
  if (command) command();
  else console.log('Unknown command. Type "help" to see available commands');
  rl.prompt();
}).on('close', () => process.exit(0));
