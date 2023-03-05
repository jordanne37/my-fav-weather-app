// DOM Elements
var inputEl = document.querySelector(".input");
var searchBtnEl = document.querySelector(".search-btn");
var cityEL = document.querySelector(".city")
var tempEl = document.querySelector(".temperature");
var windEl = document.querySelector(".wind");
var humidityEl = document.querySelector(".humidity");
var weathericonEl = document.querySelector(".weather-icon");
var futureEl = document.querySelector(".future");
var formEl = document.querySelector(".city-form");
var dateEl = document.querySelector(".date")

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
        tempEl.textContent = data.main.temp + " degrees"
        windEl.textContent = data.wind.speed + " mp/h"
        cityEL.textContent = data.name
        humidityEl.textContent = data.main.humidity + "%"
        weathericonEl.src = 'https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'
        // dateEl.textContent = theCurrentDate
        // weathericonEl.src = 'https://openweathermap.org/img/w/'
        // humidityEl.textContent = data.main.humidity + "%"


        const futureApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=8ec9bee709b02f3b8fc2ad8d9351b0e0&units=imperial`
                 return fetch(futureApiUrl);
        
                 
       
    })
    .then(response => response.json())
    .then(data => {
    console.log(data)
   
    })
    
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
        console.log(data);
        var futWeather ="";
        console.log(futWeather)
        for(var i =0; i <= data.list.length; i++) {
            var theDate = data.list[i].dt_txt.substr(11,8);
            console.log("New Date" + theDate);
            var futureDate = data.list[i].dt_txt.substr(0,11);
            console.log("futureDate" + futureDate)
            var updatedDate = dayjs(JSON.stringify(futureDate)).format("MMMM D, YYYY");
            if(theDate === "12:00:00") {

                futWeather += `
            <div class="flex flex-col bg-white rounded p-4 w-full max-w-xs dashboard-future">
                                    <div class="font-bold text-xl">${updatedDate}</div>
                                    <img class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg h-24 w-24"
                                       src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="Weather Icon"
                                    >
                                    <div class="flex flex-row items-center justify-center mt-6">
                                        <div class="font-large text-5xl">${data.list[i].main.temp}°F</div>
                                        <div class="flex flex-col items-center ml-6">
                                            <div>${data.list[i].weather[0].description}</div>
                                        </div>
                                    </div>
                                    <div class="flex-row justify-between mt-6">
                                        <div class="flex flex-col items-center">
                                            <div class="font-medium text-sm">Wind</div>
                                            <div class="text-sm text-black">${data.list[i].wind.speed}mp/h</div>
                                        </div>
                                        <div class="flex-col items-center">
                                            <div class="font-medium text-sm">Humidity</div>
                                            <div class="text-sm text-black">${data.list[i].main.humidity}%</div>
                                        </div>
                                    </div>
                                </div>
            `
            futureEl.innerHTML = futWeather;
           }

       }
    })
}
