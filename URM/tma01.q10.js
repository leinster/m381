function f(n1, n2, n) {
  return (n1 + n2 + 1)*Math.pow(2, n) - n2;
  return ((n1 + 1) * Math.pow(2, n)) + (n2*(Math.pow(2, n) - 1));
}

function printNValues(n1, n2, n) {
  var i = 0;
  var result = [];
  for (i; i < n; i++) {
    result.push(f(n1, n2, i));
  }
  console.log("(" + n1 + ", " + n2 + ", n): " +  result.join(", "));
}
printNValues(0, 0, 6);
printNValues(1, 0, 6);
printNValues(2, 0, 6);
printNValues(0, 1, 6);
printNValues(0, 2, 6);
printNValues(0, 3, 6);
printNValues(4, 7, 6)
