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

        const futureApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=8ec9bee709b02f3b8fc2ad8d9351b0e0&units=imperial`
                 return fetch(futureApiUrl);
                })
        .then(response => response.json())
        .then(data => {
        
            var theCurrentDate = data.coord.dt;
            var theCurrentDate = dayjs(JSON.stringify(currentDate)).format("MMMM D, YYYY")
        
        console.log(data)
        tempEl.textContent = data.main.temp
        windEl.textContent = data.wind.speed + " mp/h"
        cityEL.textContent = data.name
        dateEl.textContent = theCurrentDate
        weathericonEl.src = 'https://openweathermap.org/img/wn/'
        humidityEl.textContent = data.main.humidity + "%"

    })
    //console.log(data)

    
}

function futureWeather(weatherQuery) {
    var geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherQuery+ "&appid=9f1c292ce1ea1de6d33b5afbe52ac1d9"
    fetch(geoApiUrl)
    .then(response=> response.json())
    .then(data => {
    const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=912d45dc6bbe2ccd1b94d91571732ef8&units=imperial`
    return fetch(weatherApi);
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var futWeather = "";
        for(var i = 0; i <= data.list.length; i++) {
            var date = data.list[i].dt_txt.substr(11,8);
            var futDate = data.list[i].dt_txt.substr(0,11);
            var theFutureDate =dayjs(JSON.stringify(futDate)).format("MMMM D, YYYY");
            if(date === "12:00:00") {

            futWeather +=
           
           <div class= "card flex-column future">
                <div class="text-xl">${theFutureDate}</div>
                <img class="mt-5 text-5xl self-center inline-flex"
                src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">

                </img>
                
            </div>
futureEl.innerHTML = futWeather;


            }
        }
    })
}