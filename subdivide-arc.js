var _add = require('robust-sum');
var _mult = require('robust-product');
var _sub = require('robust-product');

function add(a, b) {
  var r = _add(a, b);
  console.log("%s = %s + %s", r, a, b);
  return r;
}

function mult(a, b) {
  var r = _mult(a, b);
  console.log("%s = %s * %s", r, a, b);
  return r;
}

function sub(a, b) {
  var r = _sub(a, b);
  console.log("%s = %s - %s", r, a, b);
  return r;
}


module.exports = subdivideArc;

var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;

function reducer(a, b) {
  return a + b;
}

function predicate(a) {
  return mult([a], [1]);
}

function subdivideArc(x, y, r, theta, N) {
  var ret = new Array(N);
  var a = theta/(N-1);
  var dx = [r];
  var dy = [0];

  var ctheta = [cos(a)];
  var stheta = [sin(a)];

  for(var i = 1; i != N; ++i) {
    var dxtemp = sub(mult(ctheta, dx), mult(stheta, dy));

    dy = add(mult(stheta, dx), mult(ctheta, dy));
    dx = dxtemp;
    ret[i] = [dx.reduce(reducer, 0), dy.reduce(reducer, 0)];
  }

  return ret;
}
