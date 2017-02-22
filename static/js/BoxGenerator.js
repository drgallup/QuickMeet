//BoxGenerator.js
//draws a box given the arrays of days and hours that are highlited by the mouse
//takes dayNum and hourHeight from the findLocation() function in coordinateTracker.js
//Isaac

function drawBox(dayNum, hourHeight){
    //dayNum is the array of days highlited by mouseclick
    //hourHeight is the array of hours highlited by mouseclick
    
    var height = tileHeight;
    var width  = dayNum.length*tileWidth;       
    height = height*hourHeight.length;
       
    //alert("x coordinate is " + dayNum[0]*tileWidth+tileWidth + "y coordinate is " + hourHeight[0]*tileHeight + "width is " + width + "height is " + height);
        
    ctx.fillStyle = "rgba(128,0,0,0.5)";
    ctx.fillRect(dayNum[0]*tileWidth+tileWidth,hourHeight[0]*tileHeight, width, height);
}
