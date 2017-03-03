//BoxGenerator.js
//draws a box given start and end times as well as the start and end days
//takes these times from the findLocation() function in coordinateTracker.js
//Isaac

function drawBox(tStart, tEnd, dStart, dEnd){

    for (a = 0; a<tStart.length; a++) {
      
        //starting x coordinate is determined by the day first clicked on.
        X_coordinate = dStart[a]*tileWidth+tileWidth;
        //starting y coordinate is determined by the time first clicked on.
        Y_coordinate = ((tStart[a]-700)/100)*tileHeight;
        //width is change in days times the width of the tile
        Width = ((dEnd[a]-dStart[a])*tileWidth)+tileWidth;
        //lenth is the difference in times
        Length = ((tEnd[a]-tStart[a])/100)*tileHeight;
       
        //alert("x coordinate is " + X_coordinate + " y coordinate is " + Y_coordinate + " width is " + Width + " length is " + Length);
        
        ctx.fillStyle = "rgba(128,0,0,0.5)";
        ctx.fillRect(X_coordinate, Y_coordinate, Width, Length);
    }
}