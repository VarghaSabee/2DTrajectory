// array of all arrows
var arrows = [];
var firedArrows = [];

// adjusts arrow speed
var speedMod = 4;

var addArrow = function() {
  arrows.unshift(new Arrow()); // unshift adds to FRONT of arrows array
  currArrow = arrows[0];
}

// Arrow prototype
function Arrow() {
  this.originX = shootingCirc.x;
  this.originY = shootingCirc.y;
  this.OriginAngle = 0;
  this.H = 0;
  this.dotsArr = [];

  this.x = shootingCirc.x;
  this.y = shootingCirc.y;
  this.arrowTipCoords = {
    x: this.x+20,
    y: this.y
  };
  // left and right parts of the arrow head
  this.leftTipCoords = {
    x: this.x+17,
    y: this.y-3
  }
  this.rightTipCoords = {
    x: this.x+17,
    y: this.y+3
  }
  this.velX = 0;
  this.velY = 0;
  this.speed = 18.75;
  this.firing = false;
}
Arrow.prototype.fireArrow = function() {
  if (!this.firing) {
    this.velX = Math.cos(angle)*this.speed;
    this.velY = Math.sin(angle)*this.speed;
    this.firing = true;
	
	///Adding
    firedArrows.unshift(currArrow);
    addArrow();
  }
}
Arrow.prototype.calcTrajectory = function() {
  if (this.y <= groundPoint && this.firing) {
    this.velY += gravity;
    this.x += this.velX;
    this.y += this.velY;
    this.dotsArr.push({x:this.x,y:this.y});

  } else {
    this.velX = 0;
    this.velY = 0;
	this.H = this.x - this.originX;
    this.firing = false;
  }
};
Arrow.prototype.calcArrowHead = function() {
  if (this.firing) {
    var angle = Math.atan2(this.velX, this.velY);
  } else if (this == currArrow) {
     var angle = Math.PI/2 - angleBetween(shootingCirc, shootingCirc);
  } else return;

  this.arrowTipCoords.x = this.x + 20*Math.sin(angle);
  this.arrowTipCoords.y = this.y + 20*Math.cos(angle);
  var arrowTip = {x:this.arrowTipCoords.x, y:this.arrowTipCoords.y}
  this.leftTipCoords.x = arrowTip.x - 3*Math.sin(angle-Math.PI/4);
  this.leftTipCoords.y = arrowTip.y - 3*Math.cos(angle-Math.PI/4);
  this.rightTipCoords.x = arrowTip.x - 3*Math.sin(angle+Math.PI/4);
  this.rightTipCoords.y = arrowTip.y - 3*Math.cos(angle+Math.PI/4);
};

Arrow.prototype.drawDots = function() {
  ctx.strokeStyle = "rgba(200,0,0,0.5)";
  for(var i = 0; i < this.dotsArr.length; i ++){
    ctx.fillRect(this.dotsArr[i].x,this.dotsArr[i].y,3,3,); 
  }
  
};
Arrow.prototype.drawArrow = function() {
  this.calcTrajectory();
  this.calcArrowHead();
  var arrowTip = this.arrowTipCoords;
  var leftTip = this.leftTipCoords;
  var rightTip = this.rightTipCoords;

  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(arrowTip.x, arrowTip.y);

  ctx.moveTo(arrowTip.x, arrowTip.y);
  ctx.lineTo(leftTip.x, leftTip.y);

  ctx.moveTo(arrowTip.x, arrowTip.y);
  ctx.lineTo(rightTip.x, rightTip.y);

  ctx.strokeStyle = "black";
  ctx.stroke();
};
