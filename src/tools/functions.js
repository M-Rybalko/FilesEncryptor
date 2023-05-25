'use strict';

const fs = require('node:fs');
const { MORSE_ALPHABET, COLORS } = require('./structures.js');

const encryptByCustom = (file, cipher, name) => {

  let data = fs.readFileSync(file, 'utf-8');
  const encrypted = [];

  if (data === '') {
    throw new Error('File is empty.');
  }

  if (Object.keys(cipher['cipher']).length === 0 && cipher['omit'].size === 0) {
    throw new Error('This cipher is empty.');
  }

  if (!Object.keys(cipher).includes('cipher') ||
  !Object.keys(cipher).includes('omit')) {
    throw new Error('This cipher is unsuitable for encrypting.');
  }

  const replacers = cipher['cipher'];
  const omit = cipher['omit'];

  const sorted = [...Object.keys(replacers)].sort(
    (a, b) => b.length - a.length);

  for (const char of omit) {
    data = data.replaceAll(char, '');
  }
  data = data.split('');

  for (let i = 0; i < data.length; i++) {
    let replaced = false;
    for (const key of sorted) {
      if (data.slice(i, i + key.length).join('') === key &&
      replaced === false) {
        encrypted.push(replacers[key]);
        i += key.length - 1;
        replaced = true;
      }
    }

    if (replaced === false) encrypted.push(data[i]);
  }

  fs.writeFileSync(`../Encrypted/${name}EncCu.txt`, encrypted.join(''));
};


const encryptByCaesar = (file, step = 1, name) => {
  const data = (fs.readFileSync(file, 'utf-8')).split('');
  const encrypted = [];
  step = +step;
  if (isNaN(step) || !isFinite(step)) step = 1;

  if (data === '') {
    throw new Error('File is empty.');
  }

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

  fs.writeFileSync(`../Encrypted/${name}Caesar.txt`, encrypted.join(''));
};


const encryptByMorse = (file, name) => {
  const data = (fs.readFileSync(file, 'utf-8')).toUpperCase().split('');
  const encrypted = [];

  if (data === '') {
    throw new Error('File is empty.');
  }

  for (let i = 0; i < data.length; i++) {
    let char = data[i];
    const nextChar = data[i + 1];
    const keys = Object.keys(MORSE_ALPHABET);

    if (keys.includes(char)) {
      char = MORSE_ALPHABET[char];
      if (keys.includes(nextChar)) char += '   ';
    }

    if (char === ' ' && keys.includes(nextChar)) char = '       ';

    encrypted.push(char);
    fs.writeFileSync(`../Encrypted/${name}Morse.txt`, encrypted.join(''));
  }
};

const importCipher = (name) => {
  const FOLDER = '../Custom ciphers/' + name;

  if (!fs.existsSync(FOLDER + '/cipher.json') ||
  !fs.existsSync(FOLDER + '/omit.json')) {
    throw new Error('The cipher is invalid or doesnt exist');
  }

  const parsed = [];
  const cipher = fs.readFileSync(FOLDER + '/cipher.json', 'utf-8');
  const omitArray = fs.readFileSync(FOLDER + '/omit.json', 'utf-8');
  const omit = new Set();

  for (const char of JSON.parse(omitArray)) {
    omit.add(char);
  }

  parsed.push(JSON.parse(cipher));
  parsed.push(omit);
  return parsed;
};

const log = (col, msg) => {
  console.log(COLORS[col] + msg + COLORS.default);
};

module.exports = {
  encryptByCustom,
  encryptByMorse,
  encryptByCaesar,
  importCipher,
  log,
};
