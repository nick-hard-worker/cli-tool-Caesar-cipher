'use strict'

const commander = require('commander');
const { pipeline } = require('stream');
const fs = require('fs');

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
console.log(args);

const input_stream = (args.input) ?
  fs.createReadStream('input.txt') :
  process.stdin;

const output_stream = (args.output) ?
  fs.createWriteStream('output.txt') :
  process.stdout;

process.stdin.resume();
console.log('Enter the data to be displayed ');
process.stdin.on('data', function (data) { console.log("this were typed: \n" + shiftString(data.toString(), args.shift)) })

// pipeline(
//   input_stream,
//   zlib.createGzip(),
//   output_stream,
//   (err) => {
//     if (err) {
//       console.error('Pipeline failed.', err);
//     } else {
//       console.log('Pipeline succeeded.');
//     }
//   }
// );



function shiftString(str, shiftNum) {
  return str
    .split('')
    .map(char => {
      if (/^[a-z]$/i.test(char))
        // if letter is uppercase then add uppercase letters
        if (char === char.toUpperCase()) {
          return String.fromCharCode((char.charCodeAt() + shiftNum - 65) % 26 + 65);
        } else {
          //else lowercase letters:
          return String.fromCharCode((char.charCodeAt() + shiftNum - 97) % 26 + 97);
        }
      return char; // symbol is not [a-zA-Z]
    })
    .join('');
}