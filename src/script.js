// current day & hour
let h2New = document.querySelector("#date-today");
let now = new Date();
console.log(now);
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
console.log(days);

// h2New.innerHTML = `${day} ${hours}:${String(minutes).padStart(2, 0)}`;
h2New.innerHTML = `${day} ${hours}:${minutes}`;

// forecast:
function getForecastDay(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let forecastDayIndex = forecastDate.getDay();
  // forecastDayIndex is a number representing the name of the day (0-6)
  let forecastDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return forecastDay[forecastDayIndex];
}

function showForecastData(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  // let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let daily = response.data.daily;
  daily.forEach(function (dailyItem) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div id="forecastDay">${getForecastDay(dailyItem.time)}</div>
        <div>
          <img id="forecastIcon" src=${dailyItem.condition.icon_url} />
        </div>
        <div class="forecastTemp">
          <span class="forecastTempMax">${
            dailyItem.temperature.maximum
          }&deg; </span>
          <span class="forecastTempMin">19&deg;</span>
        </div>
      </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// showForecast();

let celsiusTemperature = null;

// api call:
let apiKey = "fbao77f9255b7930d3811t64639ef145";
let apiEndPoint = `https://api.shecodes.io/weather/v1/current?key=${apiKey}`;
let apiEndPointForecast = `https://api.shecodes.io/weather/v1/forecast?key=${apiKey}`;

// show the data after clicking search/myloacation:
function showMyLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl1 = `${apiEndPoint}&lat=${lat}&lon=${lon}&units=metric`;
  axios.get(apiUrl1).then(showCurrentData);
  let apiUrlForecast1 = `${apiEndPointForecast}&lat=${lat}&lon=${lon}&units=metric`;
  axios.get(apiUrlForecast1).then(showForecastData);
}
// function showForecastData(response) {
// console.log();
// forecastTemp = response.data.daily[0].temperature.day;
// }

function showCurrentData(response) {
  // console.log(response);
  celsiusTemperature = response.data.temperature.current;

  let tempElement = document.querySelector("#tempNumber");
  tempElement.innerHTML = Math.round(celsiusTemperature);

  let location = response.data.city;
  let locationElement = document.querySelector("#city-name");
  locationElement.innerHTML = location;

  let weatherDescription = response.data.condition.description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = weatherDescription;

  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidityNumber");
  humidityElement.innerHTML = humidity;

  let windSpeed = response.data.wind.speed;
  let windElement = document.querySelector("#windNumber");
  windElement.innerHTML = Math.round(windSpeed);

  let iconElement = document.querySelector("#nowIcon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
}

function goMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyLocation);
}

let btnMyLoaction = document.querySelector("#btn-my-location");
btnMyLoaction.addEventListener("click", goMyLocation);
window.addEventListener("load", goMyLocation);

//

function showWeatherByCity(event) {
  event.preventDefault();
  let inputCityVal = document.querySelector("#val-city").value;
  let apiUrl2 = `${apiEndPoint}&query=${inputCityVal}&units=metric`;
  axios.get(apiUrl2).then(showCurrentData);
}

let btnSearchCity = document.querySelector("#btn-search-city");
btnSearchCity.addEventListener("click", showWeatherByCity);

function changeToFahr(event) {
  event.preventDefault();
  let click2 = document.querySelector("#tempNumber");
  click2.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#fahr-click");
fahrenheit.addEventListener("click", changeToFahr);

function changeToCel(event) {
  event.preventDefault();
  let click = document.querySelector("#tempNumber");
  click.innerHTML = Math.round(celsiusTemperature);
}
let celsius = document.querySelector("#cel-click");
celsius.addEventListener("click", changeToCel);
