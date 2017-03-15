//Setup the inital uuid
//Fetch from the URL first and then use local storage if necessary
var user = getParameterByName("username")
//If the user did not specific a user name in the URL, look in cache
if (user == "" || user == null || user == undefined) {
  user =localStorage.getItem("uuid");
}

//Flag is set true for new user
var flag = true;

//Check if it is the correct user
if (user != null) {
    var rightUser = confirm("Are you " + user + " or another existing new user");
    if (rightUser == true) {
     console.log("Right user");
     flag = false;
    } else {
        user = prompt("Please enter your username");
        localStorage.setItem("uuid", user);
        var redirection ="/QuickMeet/?username=";
        window.location.href=redirection + user;
        flag = false;
    }
} else {
//user is not defined
}

function setup(){
    //Fetch an random uuid and assign it to the user and give a random name for now
    //Also update the local cache
    //Prompt for first name and send post request to the end point
    if (flag == true) {
        user = get_data("/QuickMeet/uuid/api/1.json");
        console.log(user);
        localStorage.setItem("uuid", user); 
        var firstName = prompt("Please enter your name");
        //post request to update the uuid's name
        post_user("/QuickMeet/default/api/"+ user + "/2" +".json",firstName);
        var redirection ="/QuickMeet/?username=";
       //window.location.href=redirection + user;
        flag = false;
    //The coordinate tracker's inital setup should draw boxes for the user
    } else {
      flag = false;
    }


}
setup();

if (flag == false) {
    console.log(user);
    var data = get_data("/QuickMeet/default/api/"+ user +".json");
//alert(data)
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
    drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
}


function post_user (URL, user){
    var x = new XMLHttpRequest();
    x.open("POST", URL,false);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send("firstName=" + user);
    console.log("request sent");
    console.log("Response" + x.response);
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
