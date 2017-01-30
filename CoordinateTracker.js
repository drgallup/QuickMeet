// --------------------------------------------------------------------
// //  CoordinateTracker.js
// //  Track the x,y coordinate when mouse click event happen on canvas
// //
// //  Version 0.2 - Nathan, 10pm, 1/29/17
// //  -Add event listener on Canvas for on mouse click, on mouse movement, 
// //   and on mouse release
// //  -Creates live rendering box when you click and drag
// //  -*BUG* Time becomes more darker with each successive box
// // --------------------------------------------------------------------


var c = document.getElementById('myCanvas'),
    canLeft = c.offsetLeft,
    canTop = c.offsetTop,
    ctx = c.getContext('2d'),
    element = [];

var canvas, startX, endX, startY, endY;
var mouseIsDown = 0;

function init(){
	c.addEventListener('mousedown', mouseDown, false);
	c.addEventListener('mousemove', mouseMove, false);
	c.addEventListener('mouseup', mouseUp, false);
}

function getMousePos(canvas, evt){
	return{
		x: evt.pageX - canLeft,
		y: evt.pageY = canTop
	};
}

function mouseUp(eve) {
    if (mouseIsDown !== 0) {
        mouseIsDown = 0;
        var pos = getMousePos(canvas, eve);
        endX = pos.x;
        endY = pos.y;
        drawSquare(); 
    }
    drawGrid();
}

function mouseDown(eve) {
    mouseIsDown = 1;
    var pos = getMousePos(canvas, eve);
    startX = endX = pos.x;
    startY = endY = pos.y;
    drawSquare(); 
}

function mouseMove(eve) {

    if (mouseIsDown !== 0) {
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
    ctx.rect(startX + offsetX, startY + offsetY, width, height);
    ctx.fillStyle = "rgba(128,0,0,0.5";
    ctx.fill();
    ctx.lineWidth = 1;
}

function getMousePos(canvas, evt) {
    var rect = c.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

init();
