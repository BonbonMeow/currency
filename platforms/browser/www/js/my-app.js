// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})


function getlocation(){
    
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
    //if there are more than two callback in a functions will cause "callback hell" issue 
}

function  geoCallback(postion){
    
    console.log(postion);
    
    var lat = postion.coords.latitude;
    var lon = postion.coords.longitude;
    
    document.getElementById("position").innerHTML ="Latitude: " + lat + "<br> Longitude " + lon;
}

function initMap() {
    var cct = {lat: 53.346, lng: -6.2588};
    var map = new google.maps.Map(document.getElementById('map'),
                                  { zoom: 4,
                                   center: cct
                                  });  
    var marker = new google.maps.Marker(
        {position: cct,
         map: map}
    );
}




    function currencylayer(){

        var from = document.getElementById('from').value;
        var to = document.getElementById('to').value;
        var amount = parseInt(document.getElementById('amount').value);
        
        var request_url = 'http://apilayer.net/api/live?access_key=5f93196f90551a96e74997ef59c6a9d0'
      
        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward
      
        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);
      
        request.onload = function() {
        // see full list of possible response codes:
        // https://opencagedata.com/api#codes
      
          if (request.status == 200){ 
            // Success!
            var data = JSON.parse(request.responseText);
            console.log(data);
            
            var fromRate = data.quotes['USD' + from];
            var toRate = data.quotes['USD' + to];
            var convertRate = toRate / fromRate;
            var exchanged = amount * convertRate;
            document.getElementById('result').value = exchanged;
      
      
          } else if (request.status <= 500){ 
          // We reached our target server, but it returned an error
                                 
            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log(data.status.message);
          } else {
            console.log("server error");
          }
        };
      
        request.onerror = function() {
          // There was a connection error of some sort
          console.log("unable to connect to server");        
        };
      
        request.send();  // make the request
                                   
        }
    


