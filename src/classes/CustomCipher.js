'use strict';

const fs = require('node:fs');

class CustomCipher {

  constructor(name) {
    this.name = name;
    this.cipher = {};
    this.omit = new Set();
  }

  addToCipher(str, replacer) {

    if (str === '') {
      console.log(
        'This string cant be empty. You risk to lose data that way.'
      );
      return;
    }

    if (str === 'omit') {
      console.log(
        'You cant cipher that string. Unspeakable things could happen'
      );
      return;
    }

    if (replacer === '') {
      console.log(
        'Replacer cant be empty. You risk to lose data that way.'
      );
      return;
    }

    this.cipher[str] = replacer;
    if (this.cipher[str]) console.log('Added successfully!');
    return this.cipher;
  }

  deleteReplacer(str) {
    str = str.trim();
    if (str === 'omit') {
      console.log('You cant delete that');
      return;
    }

    if (Object.keys(this.cipher).includes(str)) {
      delete this.cipher[str];
      if (!this.cipher[str]) console.log('Deleted successfuly!');
      return this.cipher;
    }
  }

  omitChar(char) {

    if (char === '') {
      console.log('You cant omit an empty line!');
      return;
    }

    this.omit.add(char);
    return this.cipher;
  }

  deomit(char) { // Change name
    char = char.trim();

    if (this.omit.has(char)) {
      this.omit.delete(char);

      if (!this.omit.has(char)) {
        console.log(char + ' will not be omited since now');
      }

      return this.omit;
    }

    console.log('This character is not in omit list');
    return;
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
    console.log('The cipher with this name doesnt exist');
  }

  showCipher(name) { // Remake to errors
    const ommitedChars = [];

    if (name !== this.name) {
      console.log('The cipher with this name doesnt exist.');
      return;
    }

    if (Object.keys(this.cipher).length === 0 && this.omit.size === 0) {
      console.log('This cipher is empty.');
      return;
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
      console.log('The cipher with this name doesnt exist.');
      return;
    }

    const GENERAL_FOLDER = '../Custom ciphers';
    if (!fs.existsSync(GENERAL_FOLDER)) fs.mkdirSync(GENERAL_FOLDER);
    const CIPHER_FOLDER = '../Custom cipher/' + this.name;
    if (!fs.existsSync(CIPHER_FOLDER)) fs.mkdirSync(CIPHER_FOLDER);

    const cipher = JSON.stringify(this.cipher, null, 2);
    const omitArray = [];

    for (const char of this.omit) {
      omitArray.push(char);
    }

    const omit = { omit: omitArray };

    const cipherFile = CIPHER_FOLDER + '/cipher.json';
    fs.writeFileSync(cipherFile, cipher);

    const omitFile = CIPHER_FOLDER + '/omit.json';
    fs.writeFileSync(omitFile, JSON.stringify(omit, null, 2));

    if (fs.existsSync(cipherFile) && fs.existsSync(omitFile)) {
      console.log('Saved successfuly!');
    }
  }
}

module.exports = { CustomCipher };
