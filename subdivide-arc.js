// Adapted from http://slabode.exofire.net/circle_draw.shtml

var split = require('robust-split');
var scale = require('robust-scale')
var add = require('robust-sum');
var mul = require('robust-product');
var num = require('robust-estimate-float');

module.exports = subdivideArc;

function sub(a, b) {
  return add(a, scale(b, -1));
}

var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;

function subdivideArc(cx, cy, r, start, end, n, invertDirection) {

  var diff = (invertDirection) ? start-end : end-start;
  var theta = diff / (n - 1);

  cx = split(cx);
  cy = split(cy);

  r = split(r);

  var tangent = split(tan(theta));
  var radial = split(cos(theta));

  var x = mul(r, split(cos(start)));
  var y = mul(r, split(sin(start)));

  var ret = Array(n);

  for (var i=0; i<n; i++) {
    ret[i] = [
      num(add(x, cx)),
      num(add(y, cy))
    ];

    var tx = scale(y, -1);
    var ty = x;

    x = mul(add(x, mul(tx, tangent)), radial);
    y = mul(add(y, mul(ty, tangent)), radial);
  }

  return ret;
}
