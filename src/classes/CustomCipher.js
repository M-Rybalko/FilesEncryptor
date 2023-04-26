'use strict';

const fs = require('node:fs');

class CustomCipher {

  constructor(name) {
    this.name = name;
    this.cipher = { omit: new Set() };
    this.omit = this.cipher.omit;
    this.saved = false;
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
    if (name === this.name) this.cipher = {};
  }

  showCipher(name) { // Remake to errors

    if (name !== this.name) {
      console.log('The cipher with this name doesnt exist.');
      return;
    }

    if (Object.keys(this.cipher).length === 0) {
      console.log('The cipher with this name was deleted.');
      return;
    }

    if (Object.keys(this.cipher).length === 1 && this.omit.length === 0) {
      console.log('This cipher is empty.');
      return;
    }

    console.log('Heres the list of all strings and their replacers:');

    for (const key in this.cipher) {
      if (key !== 'omit') {
        console.log(`"${key}" ->  "${this.cipher[key]}";`);
      }
    }

    const ommitedChars = [];

    for (const char of this.omit) {
      ommitedChars.push(`"${char}"`);
    }

    console.log('List of ommited characters: ' + ommitedChars.join(', '));
  }

  saveToJSON(cipherName, fileName) {

    if (cipherName !== this.name) {
      console.log('The cipher with this name doesnt exist.');
      return;
    }

    if (Object.keys(this.cipher).length === 0) {
      console.log('The cipher with this name was deleted.');
      return;
    }

    const FOLDER = '../Custom ciphers';
    const data = JSON.stringify(this.cipher, null, 2);
    const file = FOLDER + '/' + fileName + '.json';

    if (!fs.existsSync(FOLDER)) fs.mkdirSync(FOLDER);
    fs.writeFileSync(file, data);
    if (fs.existsSync(file)) {
      this.saved = true;
      console.log('Saved successfuly!');
    }
  }

  encryptByCustom(file, cipher) {

    const data = fs.readFileSync(file, 'utf-8');
    let encrypted = data;

    if (data === '') {
      console.log('File is empty. Try choosing another file');
      return;
    }

    for (const key of Object.keys(cipher)) {
      encrypted = encrypted.replaceAll(key, cipher[key]);
    }

    fs.writeFileSync('encrypted.txt', encrypted);
  }
}

module.exports = { CustomCipher };
