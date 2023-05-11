'use strict';

const fs = require('node:fs');

class CustomCipher {

  constructor(name) {
    this.name = name;
    this.cipher = {};
    this.omit = new Set();
  }

  addToCipher(str, replacer) {

    if (str === '' || replacer === '') {
      throw new Error(
        'Both fields should not be empty.'
      );
    }

    this.cipher[str] = replacer;
    if (this.cipher[str]) console.log('Added successfully!');
    return this.cipher;
  }

  deleteReplacer(str) {
    str = str.trim();
    if (str === 'omit') {
      throw new Error('You cant delete that');
    }

    if (Object.keys(this.cipher).includes(str)) {
      delete this.cipher[str];
      if (!this.cipher[str]) console.log('Deleted successfuly!');
      return this.cipher;
    }
  }

  addOmission(char) {

    if (char === '') {
      throw new Error('You cant omit an empty line!');
    }

    this.omit.add(char);

    if (this.omit.has(char)) {
      console.log(`"${char}" will be omitted since now`);
    }

    return this.cipher;
  }

  deleteOmission(char) {
    char = char.trim();

    if (this.omit.has(char)) {
      this.omit.delete(char);

      if (!this.omit.has(char)) {
        console.log(char + ' will not be omited since now');
      }

      return this.omit;
    }

    throw new Error('This character is not in omit list');
  }

  deleteCipher(name) {
    if (name === this.name) {
      delete this.cipher;
      delete this.omit;
      delete this.name;
      if (!this.cipher && !this.omit && !this.name) {
        console.log('Cipher was deleted successfuly!');
      }
      return;
    }
    throw new Error('The cipher with this name doesnt exist');
  }

  showCipher(name) {
    const ommitedChars = [];

    if (name !== this.name) {
      throw new Error('The cipher with this name doesnt exist.');
    }

    if (Object.keys(this.cipher).length === 0 && this.omit.size === 0) {
      throw new Error('This cipher is empty.');
    }

    console.log('Heres the list of all strings and their replacers:');

    for (const key in this.cipher) {
      if (key !== 'omit') {
        console.log(`"${key}" ->  "${this.cipher[key]}";`);
      }
    }

    for (const char of this.omit) {
      ommitedChars.push(`"${char}"`);
    }

    console.log('List of ommited characters: ' + ommitedChars.join(', '));
  }

  saveToJSON(cipherName) {

    if (cipherName !== this.name) {
      throw new Error('The cipher with this name doesnt exist.');
    }

    const GENERAL_FOLDER = '../Custom ciphers';
    if (!fs.existsSync(GENERAL_FOLDER)) fs.mkdirSync(GENERAL_FOLDER);
    const CIPHER_FOLDER = `../Custom ciphers/${this.name}`;
    if (!fs.existsSync(CIPHER_FOLDER)) fs.mkdirSync(CIPHER_FOLDER);

    const cipher = JSON.stringify(this.cipher, null, 2);
    const omitArray = [];

    for (const char of this.omit) {
      omitArray.push(char);
    }

    const cipherFile = CIPHER_FOLDER + '/cipher.json';
    fs.writeFileSync(cipherFile, cipher);

    const omitFile = CIPHER_FOLDER + '/omit.json';
    fs.writeFileSync(omitFile, JSON.stringify(omitArray, null, 2));

    if (fs.existsSync(cipherFile) && fs.existsSync(omitFile)) {
      console.log('Saved successfuly!');
    }
  }
}

module.exports = { CustomCipher };
