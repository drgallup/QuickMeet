// --------------------------------------------------------------------
// //  CoordinateTracker.js
// //  Track the x,y coordinate when mouse click event happen on canvas
// //
// //  Version 0.1 - Kevin, 6, 1/24/17
// //  -Add event listener on Canvas for click
// // --------------------------------------------------------------------

var evenclick = true;
var x1;
var y1;
var x2;
var y2;

var can = document.getElementById('myCanvas'),
    canLeft = can.offsetLeft,
    canTop = can.offsetTop,
    context = can.getContext('2d'),
    element = [];

can.onclick = function(event) {
  // saves first click, changes state
  if(evenclick){
    x1 = event.pageX - canLeft;
    y1 = event.pageY - canTop;
    evenclick = false;
  }
  // saves second click, changes state
  else if(!evenclick){
    x2 = event.pageX - canLeft;
    y2 = event.pageY - canTop;
    evenclick = true;
    //alert("Width: " + (x2-x1) + " Length: " + (y2-y1));
  }
}
