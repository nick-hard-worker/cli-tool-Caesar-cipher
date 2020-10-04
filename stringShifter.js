const shiftString = function (str, shiftNum) {
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

module.exports = shiftString;