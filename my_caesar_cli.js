'use strict'

const args = require('commander');

args
  .storeOptionsAsProperties(false)
  .requiredOption('-a, --action <action>', 'an action "encode" or "decode"', /^(encode|decode)$/i)
  .requiredOption('-s, --shift <number>', 'a shift of the cipher')
  .option('-i, --input <input file>', 'point an input file', 'stdin')
  .option('-o, --output  <output file>', 'point an output file', 'stdout')
  .parse(process.argv);

// console.log(args.opts())