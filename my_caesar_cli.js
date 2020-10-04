'use strict'

const commander = require('commander');
const fs = require('fs');
const { pipeline } = require('stream');
const { Transform } = require('stream');

commander
  .storeOptionsAsProperties(false)
  .version('1.0.0', '-v, --version', 'output the current version')
  .requiredOption('-a, --action <action>', 'an action "encode" or "decode"'
    , /^(encode|decode)$/i)
  .requiredOption('-s, --shift <number>', 'a shift of the cipher', handleShiftOption)
  .option('-i, --input <input file>', 'specify an input file')
  .option('-o, --output  <output file>', 'specify an output file')
  .parse(process.argv);

function handleShiftOption(value, previous) {
  const shift = parseInt(value, 10) % 26;
  if (isNaN(shift)) {
    console.error('Please enter shift option with number, for example "-s 5"');
    process.exit(1);
  }
  return shift;
}

const args = commander.opts();
if (args.action === 'decode') args.shift = -args.shift
console.log(args);

let input_stream;
if (args.input) input_stream = fs.createReadStream(args.input)
else {
  input_stream = process.stdin;
  console.log(`Please, type your massage for ${args.action}`);
}

const output_stream = (args.output) ?
  fs.createWriteStream(args.output) :
  process.stdout;

const shiftStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(shiftString(chunk.toString(), args.shift));
    callback();
  }
});

pipeline(
  input_stream,
  shiftStream,
  output_stream,
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);

function shiftString(str, shiftNum) {
  const AbcLength = 26;
  if (shiftNum < 0) shiftNum = shiftNum + AbcLength;

  return str
    .split('')
    .map(char => {
      if (!/^[a-z]$/i.test(char)) return char; // check symbol for [a-zA-Z]

      // if letter is uppercase (65 -code UTF8 for 'A'):
      if (char === char.toUpperCase())
        return String.fromCharCode((char.charCodeAt() + shiftNum - 65) % AbcLength + 65);

      //else lowercase letters (97 -code UTF8 for 'a'):
      return String.fromCharCode((char.charCodeAt() + shiftNum - 97) % AbcLength + 97);
    })
    .join('');
}