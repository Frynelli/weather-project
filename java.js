function haveDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  console.log(date);
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function getTemperature(response) {
  console.log(response.data);
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let cityName = document.querySelector("#city");
  let wind = document.querySelector("#wind");
  let temp = document.querySelector("#temperature");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  celciusTemperature = response.data.main.temp;
  dateElement.innerHTML = haveDate(response.data.dt * 1000);
  console.log(response.data.dt * 1000);
  temp.innerHTML = Math.round(celciusTemperature);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityName.innerHTML = response.data.name;
  wind.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/w/${icon}.png`
  );
  iconElement.setAttribute(`alt`, response.data.weather[0].description);
}
function searchCity(city) {
  let apiKey = "16ee8d6616116203cc7a912f8467b2d5";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}
function searchEngine(event) {
  event.preventDefault();

  let typeCity = document.querySelector("#text");
  searchCity(typeCity.value);
}

function selectFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");

  let temperatureFahr = document.querySelector("#temperature");
  temperatureFahr.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}
function selectCelcius(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let temperatureCelc = document.querySelector("#temperature");
  temperatureCelc.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;
let form = document.querySelector("#input-form");
form.addEventListener("submit", searchEngine);

let fahrenheitLink = document.querySelector("#farhenheit-link");
fahrenheitLink.addEventListener("click", selectFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", selectCelcius);
searchCity("Athens");
