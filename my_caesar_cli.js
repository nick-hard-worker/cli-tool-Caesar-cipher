'use strict'

const fs = require('fs');
const { pipeline } = require('stream');
const { Transform } = require('stream');
const args = require('./parseArgs.js'); // get cli options
const shiftString = require('./stringShifter.js') //function-shifter for string

let input_stream;
if (args.input) input_stream = fs.createReadStream(args.input)
else {
  input_stream = process.stdin;
  console.log(`Please, type your massage for ${args.action}`);
}

const output_stream = (args.output) ?
  fs.createWriteStream(args.output, { flags: 'a' }) :
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