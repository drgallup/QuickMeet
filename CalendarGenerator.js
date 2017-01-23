// --------------------------------------------------------------------
//  CalendarGenerator.js
//  generates the calendar for quick calendar
//
//  Version 0.1 - Dylan, 11am, 1/23/17
//  - Loads canvas from quickcalendar.html
//  - Makes it 2d
// --------------------------------------------------------------------

// get the canvas we are working on
// it's global so it can be called in functions
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");