var test = require('tape');
var sa = require('./subdivide-arc');

test('point count 45 degs', function(t) {
  sa(0, 0, 5, Math.PI/4, 2).forEach(function(p) {
    var d = Math.sqrt(p[0]*p[0] + p[1]*p[1])
    t.equal(d, 5);
  });
  t.end();
});

// test('point count 45 degs', function(t) {
//   sa(0, 0, 5, Math.PI/4, 5).forEach(function(p) {
//     var d = Math.sqrt(p[0]*p[0] + p[1]*p[1])
//     t.equal(d, 5);
//   });
//   t.end();
// });

// test('point count 360', function(t) {
//   sa(0, 0, 5, Math.PI*2, 4).forEach(function(p) {
//     var d = Math.sqrt(p[0]*p[0] + p[1]*p[1])
//     t.equal(d, 5);
//   });
//   t.end();
// });
