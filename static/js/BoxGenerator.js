//BoxGenerator.js
//draws a box given start and end times as well as the start and end days
//takes these times from the findLocation() function in coordinateTracker.js
//Isaac
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

function drawBox(tStart, tEnd, dStart, dEnd){

    //starting x coordinate is determined by the day first clicked on.
    X_coordinate = dStart*tileWidth+tileWidth;
    //starting y coordinate is determined by the time first clicked on.
    Y_coordinate = ((tStart-700)/100)*tileHeight;
    //width is change in days times the width of the tile
    Width = ((dEnd-dStart)*tileWidth)+tileWidth;
    //lenth is the difference in times
    Length = ((tEnd-tStart)/100)*tileHeight;
       
    //alert("x coordinate is " + X_coordinate + " y coordinate is " + Y_coordinate + " width is " + Width + " length is " + Length);
        
    ctx.fillStyle = "rgba(128,0,0,0.5)";
    ctx.fillRect(X_coordinate, Y_coordinate, Width, Length);
}
