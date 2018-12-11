// Vargha S. F. -- 2018

///////////////////////
// CREATE THE CANVAS //
///////////////////////
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width=window.innerWidth - 15;
canvas.height=window.innerHeight - 115;
document.body.appendChild(canvas);
cWidth=canvas.width;
cHeight=canvas.height;
var distance = 0;
var angle = 0;
///////////////////////

// gravity and stuff
var gravity = 0.4;
var groundPoint = cHeight - (cHeight/4);

var drawDots = false;
// drawnBack and firedArrow booleans to assert state of currArrow
var drawnBack = false;
var firedArrow = false;

// calculate distance between two points
var distBetween = function(p1, p2) {
  return Math.sqrt( Math.pow((p2.x-p1.x), 2)
                  + Math.pow((p2.y-p1.y), 2) );
}


var drawScene = function() {
  // increased groundPoint so arrows stick where they should in the ground
  var ground = groundPoint + 15;
  // sky
  ctx.fillStyle="rgba(0,0,200,0.2)";
  ctx.fillRect(0,0,cWidth,ground);
  // ground
  ctx.beginPath();
  ctx.moveTo(0, ground);
  ctx.lineTo(cWidth, ground);
  ctx.strokeStyle="rgba(0,100,50,0.6)";
  ctx.stroke();
  ctx.fillStyle="rgba(0,200,100,0.6)";
  ctx.fillRect(0,ground,cWidth,cHeight);
}

// calculate angle between two points
var angleBetween = function(p1, p2) {
  return Math.atan2(p2.y-p1.y, p2.x-p1.x);
}


var drawAimer = function() {
  if (drawnBack) {
    ctx.beginPath();
    ctx.moveTo(shootingCirc.x, shootingCirc.y);
    ctx.lineTo(shootingCirc.x, shootingCirc.y);
    ctx.strokeStyle="rgba(0,0,0,0.2)";
    ctx.stroke();
  }
}
var shootingCirc = {
  x: 100,
  y: groundPoint,
  r: 75
}
var drawBackCirc = {
  x: shootingCirc.x,
  y: shootingCirc.y,
  r: 10
}
var drawCircles = function() {
  ctx.beginPath();
  ctx.arc(shootingCirc.x, shootingCirc.y, shootingCirc.r, 0, 2*Math.PI);
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(drawBackCirc.x, drawBackCirc.y, drawBackCirc.r, 0, 2*Math.PI);
  ctx.stroke();
  drawAimer();
}


var writeInfo = function() {
  ctx.font = "11px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // ctx.fillText("Angle: " + angle, 20, 40);
  ctx.fillText("Gravity: " + gravity, 20, 20);
}

var clearCanvas = function(){
  ctx.clearRect(0,0,cWidth,cHeight);
  drawCircles();
  drawScene();
  arrows = [];
  firedArrows = [];
}

// UPDATE //
var update = function() {
  if (firedArrow) {
    currArrow.fireArrow();
    firedArrow = false;
  }
  // clear the canvas
  ctx.clearRect(0,0,cWidth,cHeight);
}

// RENDER //
var render = function() {
   writeInfo();
  drawCircles();
  for(i=0; i < arrows.length; i++) {
    arrows[i].drawArrow();
    if(!drawDots) continue;
    arrows[i].drawDots();
  }
  drawScene();
}

// *** |\/| /_\ | |\| *** //
var main = function() {
  update();
  render();
  requestAnimationFrame(main);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// add initial arrow
addArrow();
var currArrow = arrows[0];
main();
