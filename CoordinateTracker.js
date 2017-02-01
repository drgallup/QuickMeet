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

var evenclick = true;
var x1;
var y1;
var x2;
var y2;

var c = document.getElementById('myCanvas'),
    canLeft = c.offsetLeft,
    canTop = c.offsetTop,
    ctx = c.getContext('2d'),
    element = [];

can.onmousedown = function(event) {
  // saves first click, changes state
  if(evenclick){
    x1 = event.pageX - canLeft;
    y1 = event.pageY - canTop;
    evenclick = false;
  }
}

can.onmouseup = function(e){
  // saves second click, changes state
  if(!evenclick){
    x2 = e.pageX - canLeft;
    y2 = e.pageY - canTop;
    evenclick = true;
    alert("Width: " + (x2-x1) + " Length: " + (y2-y1) + " x1: " + x1 + " y1: " + y1 + " x2: " + x2 + " y2: " + y2);
  }
  
  
}

function findLocation (x1, y1, x2, y2){
  // figures out which hours on the calendar have been selected
  
  
}


