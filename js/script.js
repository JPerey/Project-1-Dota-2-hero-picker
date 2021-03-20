// initial variables
let heroArray = [];

// event listeners

// functions

function init() { // this function pulls in the data from the API and copies to the hero Array for use
    $.ajax("https://api.opendota.com/api/heroes").then(function (data) {
        // console.log("Heres the data: " +data);
        heroArray = data;
    }, function (error) {
        console.log(error);
    });
}

// initializing script

init();