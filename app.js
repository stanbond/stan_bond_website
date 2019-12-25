
const canv = document.getElementById('canvas');
const canvas = canv.getContext('2d');

canv.width = window.innerWidth;
canv.height = window.innerHeight;

var maxBallRadius = 40;
var minBallRadius = 3;
var maxSpeed = 2;
var balls = 1000;

if (canv.width > 1300) {
  var balls = 1800;
  var maxBallRadius = 50;
}

var mouse = {
  x: undefined,
  y: undefined
};

var colorArray = [
  '#6DBCDB',
  // '#D7DADB',
  '#FC4349',
  '#2C3E50',
  '#FFFFFF'
];

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log("hover")
});

window.addEventListener('resize', function() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;

  init();
});

function Ball(x, y, dx, dy, radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minBallRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    canvas.beginPath();
    canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // canvas.strokeStyle = 'lightgrey';
    canvas.fillStyle = this.color;
    // canvas.stroke();
    canvas.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx
    this.y += this.dy

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if ( this.radius < maxBallRadius) {
      this.radius += 1; }
    } else if (this.radius > this.minBallRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

// var ball = new Ball(200, 200, 3, 3, 30)
var ballArray = [];

function init() {
  ballArray = [];

  for (var i = 0; i < balls; i++) {
    var radius = Math.random() * 3 + minBallRadius;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * maxSpeed;
    var dy = (Math.random() - 0.5) * maxSpeed;
    ballArray.push(new Ball(x, y, dx, dy, radius));
    // console.log("balls");
  }
}

function animate() {
  requestAnimationFrame(animate);
  canvas.clearRect(0,0, innerWidth, innerHeight);
  
  // ball.update();

  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}
// animate();
init();
animate();