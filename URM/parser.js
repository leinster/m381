exports.parse = function(programText) {
  var pattern = /([ZSCJ])\(([\d, ]+)\)/i;
  var program = [];
  programText.split("\n").forEach(function(line) {
    var operation, registers;
    var matches = line.match(pattern);
    if (matches) {
      operation = matches[1].toUpperCase();
      registers = matches[2].split(",").map(function(n) {
        return Math.floor(n);
      });
      program.push([operation].concat(registers));
    }
  });
  return program;
};
