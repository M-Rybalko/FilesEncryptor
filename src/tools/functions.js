'use strict';

const fs = require('node:fs');
const MORSE_ALPHABET = require('./structures.js');

const encryptByCustom = (file, custom) => {

  const data = fs.readFileSync(file, 'utf-8');

  if (data === '') {
    return new Error('File is empty.');
  }

  if (!Object.keys(custom).includes('cipher')) {
    return new Error('This cipher is unsuitable for encrypting.');
  }

  let encrypted = data;
  const cipher = custom['cipher'];
  const omit = cipher['omit'];

  for (const char of omit) {
    encrypted = encrypted.replaceAll(char, '');
  }

  for (const key of Object.keys(cipher)) {
    if (key !== 'omit') {
      encrypted = encrypted.replaceAll(key, cipher[key]);
    }
  }

  fs.writeFileSync('encrypted.txt', encrypted);
};


const encryptByCaesar = (file, step = 1) => {
  const data = (fs.readFileSync(file, 'utf-8')).split('');
  const encrypted = [];
  step = +step;
  if (isNaN(step) || !isFinite(step)) step = 1;

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


const encryptByMorse = (file) => {
  const data = (fs.readFileSync(file, 'utf-8')).toUpperCase().split('');
  const encrypted = [];

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
    fs.writeFileSync('encrypted.txt', encrypted.join(''));
  }
};

const importCipher = (name) => {
  const FOLDER = '../Custom ciphers/' + name;

  if (!fs.existsSync(FOLDER + '/cipher.json') ||
  !fs.existsSync(FOLDER + '/omit.json')) {
    return new Error('The cipher is invalid or doesnt exist');
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

importCipher('test');

module.exports = {
  encryptByCustom,
  encryptByMorse,
  encryptByCaesar,
  importCipher
};
