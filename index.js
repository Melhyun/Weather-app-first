function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let speed = document.querySelector("#speed");
  let icon = document.querySelector(".current-temperature-icon");

  icon.innerHTML = `
    <img
      src="${response.data.condition.icon_url}"
      alt="weather-icon"
    />
  `;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  speed.innerHTML = `${response.data.wind.speed} km/h `;

  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "59c94t1918f34a2b8290c703o6bece67";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  return days[date.getDay()];
}

function getForecast(city) {
  apiKey = "59c94t1918f34a2b8290c703o6bece67";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml += ` <div class="forecast-item">
      <div class="forecast-day">${formatDay(day.time)}</div>
          <div ><img class="forecast-emoji" src="${
            day.condition.icon_url
          }"/></div>
          <div class="forecast-temps">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
            <span class="forecast-min">${Math.round(
              day.temperature.minimum
            )}°</span>
          </div>
          </div>
    `;
    }
  });

  let forecastElement = document.querySelector(".forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
