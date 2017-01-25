// --------------------------------------------------------------------
// //  CoordinateTracker.js
// //  Track the x,y coordinate when mouse click event happen on canvas
// //
// //  Version 0.1 - Kevin, 6, 1/24/17
// //  -Add event listener on Canvas for click
// // --------------------------------------------------------------------


var can = document.getElementById('myCanvas'),
    canLeft = can.offsetLeft,
    canTop = can.offsetTop,
    context = can.getContext('2d'),
    element = [];

can.addEventListener('click', function(event) {
    var x = event.pageX - canLeft,
        y = event.pageY - canTop;
    //alert("x is " + x + " and y is " + y);
    //Trigger selecting the box /add detail
}, false);
