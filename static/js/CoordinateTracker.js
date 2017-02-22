// --------------------------------------------------------------------
// //  CoordinateTracker.js
// //  Track the x,y coordinate when mouse click event happen on canvas
// //
// //  Version 0.8 - Nathan, 2/20/17
// //  -Add event listener on Canvas for click
// //  -Detects the day, added CSS file and moved some things.
// //  -Detects and alerts day and time range that the user has selected
// //  -Fixed dragging issues for box
// // --------------------------------------------------------------------

// ~~~~~~~~~~~~~~~~
// Variables
var day = [ 100, 200,
            300, 400,
            500, 600, 
            700, 800 ];
            
var hour = [];

var canvas, startX, endX, startY, endY, maxX, maxY;
var mouseIsDown = false;

var can = document.getElementById('myCanvas'),
    canLeft = can.offsetLeft,
    canTop = can.offsetTop,
    context = can.getContext('2d'),
    element = [];

var dayNum;
var hourHeight;
// ~~~~~~~~~~~~~~~~
can.addEventListener('mousedown', mouseDown, false);
can.addEventListener('mousemove', mouseMove, false);
can.addEventListener('mouseup', mouseUp, false);

hourChange();
// hourChange generates the pixel area of each hour
function hourChange(){
  var tempHeight = 400/rows;
  for(var i=0; i<=rows; i++){
    hour.push( i*tempHeight );
  }
  //alert(hour);
}


// Updates coordinates to generate box
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
    drawBox(dayNum, hourHeight);
    
}

// Tracks user's initial click
function mouseDown(eve) {
    mouseIsDown = true;
    var pos = getMousePos(canvas, eve);
    startX = endX = pos.x;
    startY = endY = pos.y;
    maxX = startX;
    maxY = startY;
    drawSquare(); 
}

// Tracjs user's drag
function mouseMove(eve) {
    if (mouseIsDown !== false) {
        var pos = getMousePos(canvas, eve);
        endX = pos.x;
        endY = pos.y;
        if(endX>maxX || endY>maxY){
        	ctx.clearRect(0,0,c.width,c.height);
    		drawGrid(); 
        	maxX=endX;
        	maxY=endY;
        }
        if(endX<maxX || endY<maxY){
   	 	ctx.clearRect(0,0,c.width,c.height);
    	drawGrid();        	
        	maxX = endX;
        	maxY = endY;

        }
        drawSquare();
    }
}

// Draws live rendering box
function drawSquare() {
    // creating a square
    var w = maxX - startX;
    var h = maxY - startY;
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
  var dayTemp = [];
  var hourTemp = [];
  // figure out which days were selected
  for (var i = 0; i<day.length-1; i++){
    if( day[i] < startX && startX < day[i+1] ){
      dayTemp.push(i);
    }else if( startX < day[i] && day[i+1] < endX ){
      dayTemp.push(i);
    }else if( day[i] < endX && endX < day[i+1] ){
      dayTemp.push(i);
    }
  }
  // figure out which hours were selected
  for (var i = 0; i<hour.length-1; i++){
    if( hour[i] < startY && startY < hour[i+1] ){
      hourTemp.push(i);
    }else if( startY < hour[i] && hour[i+1] < endY ){
      hourTemp.push(i);
    }else if( hour[i] < endY && endY < hour[i+1] ){
      hourTemp.push(i);
    }
  }
  //alert(hourTemp);
  //alert(dayTemp);
  
  var timeStart = timeCalc(hourTemp[0])-100;
  var timeEnd = timeCalc(hourTemp[hourTemp.length-1])+100;

  var dayStart = dayTemp[0];
  var dayEnd = dayTemp[dayTemp.length-1];

  
  alert("Busy from " + timeStart + " to " + timeEnd + " " + dayStart + " through " + dayEnd);
  //post
    
  post_data("/QuickMeet/default/api/username.json", timeStart, timeEnd, dayStart, dayEnd);
  get_data("/QuickMeet/default/api/username.json");



  //return values to generate boxes
  dayNum = dayTemp;
  hourHeight = hourTemp;
  return dayNum, hourHeight;
  

    // add call to database here!
}

// maps the hour selected to the time displayed
function timeCalc(x){
  return (x*100 + 800);
}

// maps the days to strings
function dayMap(x){
  switch(x){
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Error: Invalid Day";
  }
    
}

function post_data(URL, tStart, tEnd, dStart, dEnd){
    var x = new XMLHttpRequest();
    x.open('POST', URL, false);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send("timeStart=" + tStart + "&timeEnd=" + tEnd + "&dayStart=" + dStart + "&dayEnd=" + dEnd);
    alert(x.responseText);
}

    function get_data(URL){
    var x = new XMLHttpRequest();
    x.open( "GET", URL, false ); // false for synchronous request
    x.send( null );
    alert(x.responseText);
}
