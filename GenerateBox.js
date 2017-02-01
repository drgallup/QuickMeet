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

function changeColor(evt){
  var clickedOn = evt.target;
  // for HTML
  clickedOn.style.backgroundColor = '#f00';

  // for SVG
  clickedOn.setAttribute('fill','red');
}
mySquare.addEventListener('click',changeColor,false);


var lastClicked;
var grid = clickableGrid(700,100,function(el,row,col,i){

function clickableGrid( rows, cols, callback ){
  var i=0;
  var grid = document.createElement('table');
  grid.className = 'grid';
  for (var r=0;r<rows;++r){
    var tr = grid.appendChild(document.createElement('tr'));
    for (var c=0;c<cols;++c){
      var cell = tr.appendChild(document.createElement('td'));
      cell.innerHTML = ++i;
      cell.addEventListener('click',(function(el,r,c,i){
        return function(){ callback(el,r,c,i); }
       })(cell,r,c,i),false);
    }
  }
  return grid;
}
