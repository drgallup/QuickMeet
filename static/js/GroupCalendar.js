//get the username
var user = getParameterByName("username")
var data = get_data("/QuickMeet/default/api/"+ user +".json")
alert(data)
//create array to store the events, days is a [][] array
var btimeStart = []
var btimeEnd = []
var bdayStart = []
var bdayEnd = []

//parse data
var jsonData = JSON.parse(data);
for (var i = 0; i < jsonData.length; i++) {

    btimeStart.push(jsonData[i].startTime)
    btimeEnd.push(jsonData[i].endTime)
    bdayStart.push(jsonData[i].days[0])
    bdayEnd.push(jsonData[i].days[jsonData[i].days.length -1])
    //alert(startTime)
    //alert(endTime)
    //alert(startDay)
    //alert(endDay)
}

//draw the box of the user
for(var i = 0; i < btimeStart.length; i++){
    drawBox(btimeStart[i], btimeEnd[i], bdayStart[i], bdayEnd[i])
}












function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function post_data(URL, tStart, tEnd, dStart, dEnd){
    var x = new XMLHttpRequest();
    x.open('POST', URL, false);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send("timeStart=" + tStart + "&timeEnd=" + tEnd + "&dayStart=" + dStart + "&dayEnd=" + dEnd);
    //alert(x.responseText);
}

    function get_data(URL){
    var x = new XMLHttpRequest();
    x.open( "GET", URL, false ); // false for synchronous request
    x.send( null );
    //alert(x.responseText);
    return x.responseText;
}
