// --------------------------------------------------------------------
// //  GenerateBox.js
// //  
// //  create grid of boxes inside of the canvas
// //  get x,y coordinates from on-click function 
// //  check if the mouse coordinates are within the coordinates of any of the boxes
// //  if within coordinate of a box, fill box with a color/turn view of box on/ whatever
// //  
// //  after you have this working, add a function that checks the delta x and delta y from the drag clicks
// //  highlight multiple boxes in the grid corresponding to the relative delta x and delta y values returned from click and drag
// //
// //  Version 0.1 - Isaac, 1/30/17
// //  -Add event listener on Canvas for click
// // --------------------------------------------------------------------

var lastClicked;
var grid = clickableGrid(12,7,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

    el.className='clicked';
    if (lastClicked) lastClicked.className='';
    lastClicked = el;
});

document.body.appendChild(grid);
     
function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            //cell.innerHTML = ++i;
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}
