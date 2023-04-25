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

let level = 'general';
rl.prompt();

const commands = {

  general: {

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

    create() {
      level = 'custom';
      console.log(`Welcome to cipher creating! 
Here you can create, customise and save your ciphers!
Type help to see all commands.`);
    }
  },

  custom: {

  }

};

rl.on('line', (line) => {
  line = line.toLowerCase().trim();

  const tier = commands[level];
  if (tier) {
    const command = tier[line];
    if (command) command();
    else console.log('Unknown command. Type "help" to see available commands');
  } else console.log('This tier does not exist');
  rl.prompt();
}).on('close', () => process.exit(0));
