'use strict';

const readline = require('node:readline/promises');
const fs = require('node:fs');
const morse = require('./ciphers/morse.js');
const caesar = require('./ciphers/caesar.js');
const { CustomCipher } = require('./classes/CustomCipher.js');

console.clear();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

rl.prompt();
let level = 'general';
let customCipher = new CustomCipher();

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
    async new() {
      const name = await rl.question('Enter the name of the cipher: ');
      customCipher = new CustomCipher(name);
      return customCipher;
    }
  }

};

rl.on('line', (line) => {
  line = line.toLowerCase().trim();
  const tier = commands[level];
  const command = tier[line];
  if (command) command();
  else console.log('Unknown command. Type "help" to see available commands');
  rl.prompt();
}).on('close', () => process.exit(0));
