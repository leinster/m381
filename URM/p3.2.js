function f(n1, n2, n3) {
  return (2*n1) + (3*n2) + (4*n3);
}

function g1(n1, n2) {
  return n1*n2;
}

function g2(n1, n2) {
  return Math.abs(n1 - n2);
}

function g3(n1, n2) {
  return n1 + n2;
}

function h(n1, n2) {
  return f(g1(n1, n2), g2(n1, n2), g3(n1, n2));
}

console.log(h(2, 4));
console.log(h(5, 2));
