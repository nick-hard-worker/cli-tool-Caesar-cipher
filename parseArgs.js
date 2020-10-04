'use strict'

const commander = require('commander');

commander
  .storeOptionsAsProperties(false)
  // .passCommandToAction(false)
  .version('1.0.0', '-v, --version', 'output the current version')
  .requiredOption('-a, --action <action>', 'an action "encode" or "decode"', handleActionOption)
  .requiredOption('-s, --shift <number>', 'a shift of the cipher', handleShiftOption)
  .option('-i, --input <input file>', 'specify an input file')
  .option('-o, --output  <output file>', 'specify an output file')
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

const args = commander.opts();
if (args.action === 'decode') args.shift = -args.shift

module.exports = args;
// console.log(args);
