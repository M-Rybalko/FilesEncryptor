'use strict';

const fs = require('node:fs');

class CustomCipher {

  constructor(name) {
    this.name = name;
    this.cipher = { omit: [] };
    this.omit = this.cipher.omit;
  }

  AddToCipher(string, replacer) {

    if (string === '') {
      console.log(
        'This string cant be empty. You risk to lose data that way.'
      );
      return;
    }

    if (replacer === '') {
      console.log(
        'Replacer cant be empty. You risk to lose data that way.'
      );
      return;
    }

    this.cipher[string] = replacer;
    if (this.cipher[string]) console.log('Added successfully!');
    return this.cipher;
  }

  omitChar(char) {

    if (char === '') {
      console.log('You cant omit an empty line!');
      return;
    }

    this.omit.push(char);
    return this.cipher;
  }

  deleteCipher(name) {
    if (name === this.name) this.cipher = {};
  }

  showCipher(name) {

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
