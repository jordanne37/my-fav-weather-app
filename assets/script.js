var inputEl = document.querySelector(".input");
var searchBtnEl = document.querySelector(".search-btn");
var cityEL = document.querySelector(".city")
var tempEl = document.querySelector(".temperature");
var windEl = document.querySelector(".wind");
var humidityEl = document.querySelector(".humidity");
var weathericonEl = document.querySelector(".weather-icon");
var futureEl = document.querySelector(".future");
var formEl = document.querySelector(".city-form");
var dateEl = document.querySelector(".date");


var cityWeather = function(event) {
    event.preventDefault();
    var theInfo = inputEl.value.trim();
    // console.log (theInfo)

    if(theInfo) {
        currentWeather(theInfo);
        futureWeather(theInfo);
    } else {
        alert("N/A")
    }
}
formEl.addEventListener("submit", cityWeather)
function currentWeather(weatherQuery) {
    var geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherQuery+ "&appid=9f1c292ce1ea1de6d33b5afbe52ac1d9"
    fetch(geoApiUrl)
    .then(response=> response.json())
    .then(data => {
    
        console.log(data)
        tempEl.textContent = data.main.temp
        windEl.textContent = data.wind.speed + " mp/h"
        cityEL.textContent = data.name
        dateEl.textContent = theCurrentDate
        weathericonEl.src = 'https://openweathermap.org/img/w/'
        humidityEl.textContent = data.main.humidity + "%"


        const futureApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=8ec9bee709b02f3b8fc2ad8d9351b0e0&units=imperial`
                 return fetch(futureApiUrl);
    })
    .then(response => response.json())
    .then(data => {
    //console.log(data)

    // var currentDate = data.coord.dt;
    // var theCurrentDate = dayjs(JSON.stringify(currentDate)).format("MMMM D, YYYY")
    })
}


