let apiKey = "cd90c6f3fd9d22eae41f4d585111003f";
let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;

// show the data after clicking search/myloacation:
function showData(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let tempElement = document.querySelector("#tempNumber");
  tempElement.innerHTML = temperature;

  let location = response.data.name;
  let locationElement = document.querySelector("#city-name");
  locationElement.innerHTML = location;
}

function showMyLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl1 = `${apiEndPoint}&lat=${lat}&lon=${lon}&units=metric`;
  axios.get(apiUrl1).then(showData);
}

function goMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyLocation);
}

let btnMyLoaction = document.querySelector("#btn-my-location");
btnMyLoaction.addEventListener("click", goMyLocation);

//

function showWeatherByCity(event) {
  event.preventDefault();
  let inputCityVal = document.querySelector("#val-city").value;
  let apiUrl2 = `${apiEndPoint}&q=${inputCityVal}&units=metric`;
  axios.get(apiUrl2).then(showData);
}

let btnSearchCity = document.querySelector("#btn-search-city");
btnSearchCity.addEventListener("click", showWeatherByCity);
