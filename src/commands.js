'use strict';

const readline = require('node:readline/promises');
const fs = require('node:fs');
const tools = require('./tools/functions.js');
const { CustomCipher } = require('./classes/CustomCipher.js');
const { COLORS } = require('./tools/structures.js');

console.clear();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

if (!fs.existsSync('../Encrypted')) fs.mkdirSync('../Encrypted');
if (!fs.existsSync('../Texts')) fs.mkdirSync('../Texts');

rl.prompt();
let level = 'general';
let customCipher;

const commands = {

  general: {

    help() {
      const msg = fs.readFileSync('./docs/generalCommands.txt', 'utf-8');
      console.log(msg);
      rl.prompt();
    },

    exit() {
      rl.close();
    },

    async import() {
      const name = await rl.question('Enter cipher name you want to export: ');
      const data = tools.importCipher(name);

      customCipher = new CustomCipher(name);
      customCipher.cipher = data[0];
      customCipher.omit = data[1];

      level = 'custom';
      console.log(name + ' has been imported successfully.');
      console.log('Entering cipher creation workplace.');
      rl.prompt();
      return customCipher;
    },

    async encrypt() {
      const answer = await rl.question('Which file do you want to encrypt? ');
      const file = '../Texts/' + answer;
      const cipher = await rl.question('Which cipher do you want to use? ');

      const variants = {
        'morse': () => {
          tools.encryptByMorse(file, answer);
          rl.prompt();
        },
        'caesar': async () => {
          const step = await rl.question('How many hops do you need? ');
          tools.encryptByCaesar(file, step, answer);
          rl.prompt();
        },
        'custom': () => {
          if (customCipher) {
            tools.encryptByCustom(file, customCipher, answer);
          } else {
            throw new Error('Cipher isnt created yet');
          }
        }
      };

      if (variants[cipher]) variants[cipher]();
      rl.prompt();
    },

    async create() {
      level = 'custom';
      console.log('Welcome to cipher creating!. Use "help" for guidance!\n');
      const name = await rl.question('Enter the name of new cipher: ');
      customCipher = new CustomCipher(name);
      rl.prompt();
      return customCipher;
    }
  },

  custom: {

    help() {
      const msg = fs.readFileSync('./docs/creatorCommands.txt', 'utf-8');
      console.log(msg);
      rl.prompt();
    },

    async add() {
      const str = await rl.question('Enter the string you want to replace: ');
      const replacer = await rl.question('Enter the replacer: ');
      customCipher.addReplacer(str, replacer);
      if (customCipher.cipher[str]) tools.log('green', 'Added successfully!');
      rl.prompt();
      return customCipher;
    },

    async omit() {
      const char = await rl.question('Enter string you need to omit: ');
      customCipher.addOmission(char);
      if (customCipher.omit.has(char)) {
        tools.log('green', `"${char}" will be omitted.`);
      }
      rl.prompt();
      return customCipher;
    },

    async save() {
      const name = await rl.question('Enter the name of the cipher: ');
      customCipher.saveToJSON(name);
      rl.prompt();
    },

    async show() {
      const name = await rl.question('Enter the name of the cipher: ');
      customCipher.showCipher(name);
      rl.prompt();
    },

    async delete(key) {

      const switches = {
        '-e': async () => {
          const str = await rl.question('Enter element you want to delete: ');
          customCipher.deleteReplacer(str);
          if (!customCipher.cipher[str]) {
            tools.log('green', 'Deleted successfuly!');
          }
        },
        '-o': async () => {
          const char = await rl.question('Enter char you dont want to omit: ');
          customCipher.deleteOmission(char);
          if (!customCipher.omit.has(char)) {
            tools.log('green', `"${char}" will not be omitted now.`);
          }
        },
        '-c': async () => {
          const name = await rl.question('Enter the name of the cipher: ');
          customCipher.deleteCipher(name);

          if (!customCipher.cipher &&
          !customCipher.omit && !customCipher.name) {
            tools.log('green', 'Cipher was deleted successfuly!');
          }
        },
      };

      if (Object.keys(switches).includes(key)) {
        try {
          await switches[key]();
          rl.prompt();
          return;
        } catch (err) {
          console.error(COLORS.red + err.message + COLORS.default);
          rl.prompt();
        }
      } else {
        throw new Error('This switch doesnt exist. Use "help" for guidance');
      }
    },

    async exit() {
      const msg = 'Before leaving creator remember to save your cipher!';
      console.log(COLORS.yellow + msg + COLORS.default);
      const exit = await rl.question(
        COLORS.yellow + 'Confirm your exit (y/n): ' + COLORS.default);
      if (exit === 'y') {
        level = 'general';
        console.log(
          COLORS.green + 'You are now on general level.' + COLORS.default);
        rl.prompt();
      }
      return;
    }
  }

};

rl.on('line', async (line) => {
  try {
    const [ name, sw ] = line.toLowerCase().trim().split(' ');
    const tier = commands[level];
    const command = tier[name];
    if (command) {
      if (sw) await command(sw);
      else await command();
    } else {
      throw new Error('Unknown command. Type "help" to see available commands');
    }
  } catch (err) {
    console.error(COLORS.red + err.message + COLORS.default);
    rl.prompt();
  }
}).on('close', () => process.exit(0));
