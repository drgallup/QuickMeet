// --------------------------------------------------------------------
//  CalendarGenerator.js
//  generates the calendar for quick calendar
//
//  Version 0.2 - Nathan, 5pm, 1/23/17
//  - Loads canvas from index.html
//  - Makes it 2d
//  - Draws grid
// --------------------------------------------------------------------

// get the canvas we are working on
// it's global so it can be called in functions
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Gets canvas width and height
var width = myCanvas.width,
    height = myCanvas.height;

//Predefined number of rows and columns
var columns = 7,
	rows = 24;

//Gets size of each cell
var tileWidth = width / columns,
	tileHeight = height / rows;

var context = myCanvas.getContext("2d");

//Draws grid
function drawGrid(){
	for (var x = 0; x-1<=width; x+=tileWidth){
		context.moveTo(x,0);
		context.lineTo(x,height);
	}

	for (var y = 0; y-1<=height; y+=tileHeight){
		context.moveTo(0,y);
		context.lineTo(width,y);
	}
	context.strokeStyle = "black";
	context.stroke();
}

drawGrid();
