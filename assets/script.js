var APIweatherkey = "15834f77909bd0b657babf2a0c39780f"
var containerText = document.querySelector('#container-text')

var cityEl = document.getElementById("search-input")
var searchEl = document.getElementById("search")
var currentDateEl = document.getElementById("currentdate")
var currentTempEl = document.getElementById("currenttemp")
var currentWindEl = document.getElementById("currentwind")
var currentHumidityEl = document.getElementById("currenthumidity")

var lat,long;

//add eventlistener//
searchEl.addEventListener ("click",searchclick)

function searchclick(event) {
    if (!cityEl.value) {
        return
    }
    event.preventDefault();

    var city = cityEl.value.trim();
    console.log("city = ", city);

    getLatLong(city);
}

function getLatLong(city) {
    console.log("getLatLong");
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=15834f77909bd0b657babf2a0c39780f
    `).then(response => {
        return response.json();
    })
    .then(function(data){
        console.log("data= ", data)
        if (!data[0]){
            alert("location not found")
        }
        else {
            lat = data[0].lat;
            long = data[0].lon;
            console.log("lat = ", lat);
            console.log("long = ",long);
        fetchweather(city);
    
        }
    }
    )
}
//without quotations, we are calling a function in line 43//
function fetchweather (city){
    console.log("fetchweather");
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=15834f77909bd0b657babf2a0c39780f&units=imperial`)
    .then(resp=>{
        return resp.json();
})
    .then(function (data){
        displayWeather(city,data);
    })
    .catch(function (err){
        console.log(err);
    });
}

//find html code to get degree symbol//
function displayWeather(city,data){
    console.log(city,data);
    currentDateEl.textContent =city + "  " + data.list[0].dt_txt.split(" ")[0];
    currentTempEl.textContent = "Temp:  " + data.list[0].main.temp + " deg F";
    currentWindEl.textContent = ""
    //finish the calls here for wind and humidity
}

//for second day use day 8
//for third day use day 16
//

// button.addEventListener ("click", showCurrentweather)
// function showCurrentweather(event) {
// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=15834f77909bd0b657babf2a0c39780f')
//     .then(resp=>{
//         if(!resp.ok) throw
//     .catch (console.log);
// })}

