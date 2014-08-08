var fc = require('fc');
var sa = require('./subdivide-arc');

function renderArc(ctx, points, color) {
  ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (var i = 1; i<points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.strokeStyle = color;
    ctx.stroke();

    for (var i = 0; i<points.length; i++) {
      ctx.beginPath()
        ctx.arc(points[i][0], points[i][1], 2, 0, Math.PI*2, false);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

var ctx = fc(function() {
  ctx.save();
    ctx.fillStyle = "#112";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
    ctx.scale(1, -1)

    for (var i = 40; i<200; i+=10) {
      renderArc(ctx, sa(0, -300 + i*3, 100, 0, Math.PI, Math.floor(i/10)), 'yellow');
    }

  ctx.restore();
}, false);
