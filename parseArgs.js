'use strict'

const commander = require('commander');
const fs = require('fs');

commander
  .storeOptionsAsProperties(false)
  // .passCommandToAction(false)
  .version('1.0.0', '-v, --version', 'output the current version')
  .requiredOption('-a, --action <action>', 'an action "encode" or "decode"', handleActionOption)
  .requiredOption('-s, --shift <number>', 'a shift of the cipher', handleShiftOption)
  .option('-i, --input <input file>', 'specify an input file', handleInputOption)
  .option('-o, --output  <output file>', 'specify an output file', handleOutputOption)
  .parse(process.argv);

function handleActionOption(value, previous) {
  if (/^(encode|decode)$/i.test(value)) return value
  console.error('Please, enter action option "encode" or "decode"');
  process.exit(1);
}

function handleShiftOption(value, previous) {
  const shift = parseInt(value, 10) % 26;
  if (isNaN(shift)) {
    console.error('Please, enter shift option with number, for example "-s 5"');
    process.exit(1);
  }
  return shift;
}

function handleInputOption(value, previous) {
  try {
    fs.accessSync(value, fs.constants.R_OK);
    // console.log('can read input');
    return value
  } catch (err) {
    console.error(`No access to input file ${value}`);
    console.error('Please create input file manually');
    process.exit(1);
  }
}

function handleOutputOption(value, previous) {
  try {
    fs.accessSync(value, fs.constants.W_OK);
    // console.log('can write output');
    return value
  } catch (err) {
    console.error(`No access to output file ${value}`);
    console.error('Please create output file manually');
    process.exit(1);
  }
}

const args = commander.opts();
if (args.action === 'decode') args.shift = -args.shift

module.exports = args;
// console.log(args);
