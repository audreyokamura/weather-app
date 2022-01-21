function displayWeatherInfo(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#now-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#general-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function searchCity(response) {
  let apiKey = `47b6364afb2ed8bf7f7344ac4ea61231`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${response}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
}

function showCurrentCity(position) {
  let currentCity = position.data.name;
  let cityDisplay = document.querySelector("h1");
  cityDisplay.innerHTML = `${currentCity}`;
  searchCity(currentCity);
}

function getPosition(position) {
  let apiKey = "47b6364afb2ed8bf7f7344ac4ea61231";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}  ${hours}:${minutes}`;
}

let positionButton = document.querySelector("#position-button");
positionButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentTimeDisplay = document.querySelector(".current-time");
let currentTime = new Date();
currentTimeDisplay.innerHTML = formatDate(currentTime);

searchCity("São Paulo");
