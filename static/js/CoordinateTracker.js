// --------------------------------------------------------------------
// //  CoordinateTracker.js
// //  Track the x,y coordinate when mouse click event happen on canvas
// //
// //  Version 0.5 - Nathan, 10am, 2/3/17
// //  -Add event listener on Canvas for on mouse click, on mouse movement, 
// //   and on mouse release
// //  -Creates live rendering box when you click and drag
// // --------------------------------------------------------------------
var day = [ [100, 200], [200, 300],
            [300, 400], [400, 500],
            [500, 600], [600, 700], [700, 800] ];

var canvas, startX, endX, startY, endY;
var mouseIsDown = false;

var can = document.getElementById('myCanvas'),
    canLeft = can.offsetLeft,
    canTop = can.offsetTop,
    context = can.getContext('2d'),
    element = [];

can.addEventListener('mousedown', mouseDown, false);
can.addEventListener('mousemove', mouseMove, false);
can.addEventListener('mouseup', mouseUp, false);

function mouseUp(eve) {
    if (mouseIsDown != false) {
        mouseIsDown = false;
        var pos = getMousePos(canvas, eve);
        endX = pos.x;
        endY = pos.y;
        drawSquare(); 
    }
    ctx.clearRect(0,0,c.width,c.height);
    drawGrid();
    findLocation();
}

function mouseDown(eve) {
    mouseIsDown = true;
    var pos = getMousePos(canvas, eve);
    startX = endX = pos.x;
    startY = endY = pos.y;
    drawSquare(); 
}

function mouseMove(eve) {
    if (mouseIsDown !== false) {
        var pos = getMousePos(canvas, eve);
        endX = pos.x;
        endY = pos.y;
        drawSquare();
    }
}

function drawSquare() {
    // creating a square
    var w = endX - startX;
    var h = endY - startY;
    var offsetX = (w < 0) ? w : 0;
    var offsetY = (h < 0) ? h : 0;
    var width = Math.abs(w);
    var height = Math.abs(h);
               
    ctx.beginPath();
    ctx.fillStyle = "rgba(128,0,0,1)";
    ctx.fillRect(startX + offsetX, startY + offsetY, width, height);
    ctx.lineWidth = 1;
}

function getMousePos(canvas, evt) {
    var rect = can.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function findLocation (){
  // figures out which hours on the calendar have been selected
  for (var i = 0; i<day.length; i++){
    if( day[i][0] < startX && startX < day[i][1] ){
      alert("Day " + i + " selected!");
    }
  }
}
