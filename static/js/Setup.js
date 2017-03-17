//Setup the inital uuid
//Fetch from the URL first and then use local storage if necessary


var user = getParameterByName("username")
if (user == "" || user == null || user == undefined) {
  user =localStorage.getItem("uuid");
}
//Flag is set true for new user
var flag = true;
console.log(user); 

function setup(){
    //Fetch an random uuid and assign it to the user and give a random name for now
    //Also update the local cache
    //Inisert code to prompt the user for name
    if (user === undefined || user === null || user === "") {
        user = get_data("/QuickMeet/uuid/api/1.json");
        console.log(user); 
        localStorage.setItem("uuid", user); 
        var redirection ="/QuickMeet/?username=";
        window.location.href=redirection + user;
        flag = true;
    //The coordinate tracker's inital setup should draw boxes for the user
    } else {
      flag = false;
    }


}
setup();

if (flag == false) {
    console.log(user);
//create array to store the events, days is a [][] array
    var btimeStart = []
    var btimeEnd = []
    var bdayStart = []
    var bdayEnd = []

//parse data
    get_Data("/QuickMeet/default/api/" + "0/"+ user +".json",function(data){
        var jsonData = JSON.parse(data);
        for (var i = 0; i < jsonData.length; i++) {
            btimeStart.push(jsonData[i].startTime)
            btimeEnd.push(jsonData[i].endTime)
            bdayStart.push(jsonData[i].days[0])
            bdayEnd.push(jsonData[i].days[jsonData[i].days.length -1])
    }

    drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd, null);
})}


function get_Data(theUrl, callback){     
    var xmlHttp = new XMLHttpRequest();      
    xmlHttp.onreadystatechange = function() {       
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)      
        callback(xmlHttp.responseText);       
    }     
    xmlHttp.open("GET", theUrl, true); // true for asynchronous        
    xmlHttp.send(null);       
}


function post_data(URL, tStart, tEnd, dStart, dEnd){
    var x = new XMLHttpRequest();
    x.open('POST', URL, false);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send("timeStart=" + tStart + "&timeEnd=" + tEnd + "&dayStart=" + dStart + "&dayEnd=" + dEnd);
    //alert(x.responseText);
}

function get_data(URL){
    console.log(URL);
    var x = new XMLHttpRequest();
    x.open( "GET", URL, false ); // false for synchronous request
    x.send( null );
    //alert(x.responseText);
    return x.response;
}


//function to get the calendar owner's name
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
