//Setup the inital uuid
//Fetch from the URL first and then use local storage if necessary
var user = getParameterByName("username");
//If the user did not specific a user name in the URL, look in cache
if (user == "" || user == null || user == undefined) {
  user =localStorage.getItem("uuid");
}




var isNew = true;
var temp = localStorage.getItem("isNew");
if (temp != null) {
    isNew = false;
}

//Check if it is the correct user
if (user != null && temp != null) {
    var rightUser = confirm("Are you " + getFirst(user) + " or another existing new user");
    if (rightUser == true) {
     console.log("Right user");
     isNew = false;
    } else {
        user = prompt("Please enter your username");
        localStorage.setItem("uuid", user);
        var redirection ="/QuickMeet/?username=";
        window.location.href=redirection + user;
        isNew = false;
    }
} else {
//user is not defined
    setup();
}


function setup(){
    //Fetch an random uuid and assign it to the user and give a random name for now
    //Also update the local cache
    //Prompt for first name and send post request to the end point
    if (isNew == true) {
        user = get_data("/QuickMeet/uuid/api/1.json");
        console.log(user);
        localStorage.setItem("uuid", user);
        localStorage.setItem("isNew", 0); 
        var firstName = prompt("Please enter your name");
        //post request to update the uuid's name
        post_user("/QuickMeet/default/api/"+ user + "/2" +".json",firstName);
        var redirection ="/QuickMeet/?username=";
        window.location.href=redirection + user;
        isNew = false;
    //The coordinate tracker's inital setup should draw boxes for the user
    } else {
      isNew = false;
    }

}


if (isNew == false) {

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


function post_user (URL, user){
    var x = new XMLHttpRequest();
    x.open("POST", URL,false);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send("firstName=" + user);
}

function post_data(URL, tStart, tEnd, dStart, dEnd){
    var x = new XMLHttpRequest();
    x.open('POST', URL, false);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send("timeStart=" + tStart + "&timeEnd=" + tEnd + "&dayStart=" + dStart + "&dayEnd=" + dEnd);
    //alert(x.responseText);
}


//this is the new get_Data function
function get_Data(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


function get_data(URL){
    console.log(URL);
    var x = new XMLHttpRequest();
    x.open( "GET", URL, false ); // false for synchronous request
    x.send( null );
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


function getFirst (user){
    var name = get_data("/QuickMeet/user/api/"+user+ ".json");
    console.log("DOES IT PRINT" + name);
    return name;
}
