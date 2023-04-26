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
let customCipher;

const commands = {

  general: {

    help() {
      const commandList = fs.readFileSync('./docs/commandList.txt', 'utf-8');
      console.log(commandList);
      rl.prompt();
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
      rl.prompt();
    },

    create() {
      level = 'custom';
      console.log(`Welcome to cipher creating! 
Here you can create, customise and save your ciphers!
Type help to see all commands.`);
      rl.prompt();
    }
  },

  custom: {
    async new() {
      const name = await rl.question('Enter the name of the cipher: ');
      customCipher = new CustomCipher(name);
      rl.prompt();
      return customCipher;
    },

    async add() {
      const str = await rl.question('Enter the string you want to replace: ');
      const replacer = await rl.question('Enter the replacer: ');
      customCipher.addToCipher(str, replacer);
      rl.prompt();
      return customCipher;
    },

    async omit() {
      const char = await rl.question('Enter string you need to omit: ');
      customCipher.omitChar(char);
      rl.prompt();
      return customCipher;
    },

    async save() {
      const name = await rl.question('Enter the name of the cipher: ');
      const file = await rl.question('Enter the file name: ');
      customCipher.saveToJSON(name, file);
      rl.prompt();
    },

    async show() {
      const name = await rl.question('Enter the name of the cipher: ');
      customCipher.showCipher(name);
      rl.prompt();
    },

    async exit() {
      if (customCipher.saved === true) {
        rl.close();
      } else {
        const msg = 'Cipher you made is not saved. Use "save" to save it';
        console.log(msg);
        const exit = await rl.question('Are you sure you want to exit?(y/n): ');
        if (exit === 'y') rl.close();
      }
      return;
    }
  }

};

rl.on('line', (line) => {
  line = line.toLowerCase().trim();
  const tier = commands[level];
  const command = tier[line];
  if (command) command();
  else console.log('Unknown command. Type "help" to see available commands');
}).on('close', () => process.exit(0));
