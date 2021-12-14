let apiKey = "16ee8d6616116203cc7a912f8467b2d5";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
function getTemperature(response) {
  console.log(response.data);
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let cityName = document.querySelector("#city");
  let wind = document.querySelector("#wind");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityName.innerHTML = response.data.name;
  wind.innerHTML = Math.round(response.data.wind.speed);
}

axios.get(apiUrl).then(getTemperature);
