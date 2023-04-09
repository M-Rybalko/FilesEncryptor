'use strict';

const readline = require('readline');
const fs = require('fs');

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
  }
};

rl.on('line', (line) => {
  line = line.trim();
  const command = commands[line];
  if (command) command();
  else console.log('Unknown command. Type "help" to see available commands');
  rl.prompt();
}).on('close', () => process.exit(0));
