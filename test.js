var test = require('tape');
var sa = require('./subdivide-arc');

var sum = require('two-sum');
var mul = require('two-product');
var num = require('robust-estimate-float');

function dist(p) {
  var x = p[0];
  var y = p[1];

  return Math.sqrt(x*x + y*y);
}

function dnear(a, distance) {
  return Math.abs(dist(a) - distance) < 1e-10;
}

function near(a, b) {
  return Math.abs(a-b) < 1e-10;
}

function debug(points) {
  console.log(points.map(function(a) { return [num(a[0]), num(a[1])] }));
}

test('point count 45 degs', function(t) {
  sa(0, 0, 5, 0, Math.PI/4, 2).forEach(function(p) {
    t.ok(dnear(p, 5));
  });
  t.end();
});

test('point count 45 degs', function(t) {
  sa(0, 0, 5, 0, Math.PI/4, 10).forEach(function(p) {
    t.ok(dnear(p, 5));
  });
  t.end();
});

test('point count 180', function(t) {
  var points = sa(0, 0, 5, 0, Math.PI, 2);

  t.ok(near(points[0][0], 5));
  t.ok(near(points[0][1], 0));

  t.ok(near(points[1][0], -5));
  t.ok(near(points[1][1], 0));

  t.end();
});

test('start angle', function(t) {

  var points = sa(0, 0, 10, Math.PI/2, Math.PI, 2);

  t.ok(near(points[0][0], 0));
  t.ok(near(points[0][1], 10));

  t.ok(near(points[1][0], -10));
  t.ok(near(points[1][1], 0));

  t.end();
});

test('start point', function(t) {
  var points = sa(10, 10, 10, Math.PI/2, Math.PI, 2);
  t.ok(near(points[0][0], 10));
  t.ok(near(points[0][1], 20));

  t.ok(near(points[1][0], 0));
  t.ok(near(points[1][1], 10));

  t.end();
});

test('invert direction', function(t) {
  // CCW
  var points = sa(0, 0, 10, 0, Math.PI, 3);
  t.ok(near(points[0][0], 10));
  t.ok(near(points[0][1], 0));

  t.ok(near(points[1][0], 0));
  t.ok(near(points[1][1], 10));

  t.ok(near(points[2][0], -10));
  t.ok(near(points[2][1], 0));

  // CW
  var points = sa(0, 0, 10, 0, Math.PI, 3, true);
  t.ok(near(points[0][0], 10));
  t.ok(near(points[0][1], 0));

  t.ok(near(points[1][0], 0));
  t.ok(near(points[1][1], -10));

  t.ok(near(points[2][0], -10));
  t.ok(near(points[2][1], 0));

  t.end();
})
