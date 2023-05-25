'use strict';

const assert = require('node:assert').strict;
const { CustomCipher } = require('../src/classes/CustomCipher.js');
const { COLORS } = require('../src/tools/structures.js');

const testCipher = new CustomCipher('testCipher');

const testAddReplacer = () => {
  const start = Object.keys(testCipher.cipher).length;
  testCipher.addReplacer('a', 'b');
  testCipher.addReplacer('hello', 'world');
  testCipher.addReplacer('let', 'const');
  testCipher.addReplacer('this', 'that');
  const end = Object.keys(testCipher.cipher).length;

  return end - start;
};

const testDeleteReplacer = () => {
  const start = Object.keys(testCipher.cipher).length;
  testCipher.deleteReplacer('a');
  testCipher.deleteReplacer('this');
  const end = Object.keys(testCipher.cipher).length;

  return start - end;
};

const testAddOmission = () => {
  const start = testCipher.omit.size;
  testCipher.addOmission('{');
  testCipher.addOmission('}');
  const end = testCipher.omit.size;

  return end - start;
};

const testDeleteOmission = () => {
  const start = testCipher.omit.size;
  testCipher.deleteOmission('{');
  const end = testCipher.omit.size;

  return start - end;
};

const testDeleteCipher = () => {
  testCipher.deleteCipher('testCipher');

  return (!testCipher.name + !testCipher.cipher + !testCipher.omit);
};

const TESTS = [
  [testAddReplacer(), 4, 'addReplacer has errors'],
  [testDeleteReplacer(), 2, 'deleteReplacer has errors'],
  [testAddOmission(), 2, 'addOmission has errors'],
  [testDeleteOmission(), 1, 'deleteOmission has errors'],
  [testDeleteCipher(), 3, 'deleteCipher has errors'],
];

for (const test of TESTS) {
  try {
    const [output, expected, msg] = test;
    assert.strictEqual(output, expected, msg);
    console.log(COLORS.green + 'Test passed!' + COLORS.default);
  } catch (err) {
    console.error(COLORS.red + err.message + COLORS.default);
  }
}
