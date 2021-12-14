function getDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
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
  dateElement.innerHTML = getDate(response.data.dt * 1000);
  temp.innerHTML = Math.round(response.data.main.temp);
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

let apiKey = "16ee8d6616116203cc7a912f8467b2d5";
let city = "Athens";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(getTemperature);
