// const apiKey = "053582238c1bd4f0fe68bdd5061c52c1";
var apiKey = "053582238c1bd4f0fe68bdd5061c52c1";

// getting the DOM elements in javascript
const searchForm = document.querySelector('form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const searchHistory = document.getElementById('search-history');

// event listener for search form submission
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city.length > 0) {
      // add city to search history
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = city;
      searchHistory.prepend(li);
      // get current weather and 5-day forecast for the city
      getWeather(city);
      // clear input field
      cityInput.value = '';
    }
  });

  function getWeather(city) {
    // construct API URLs for current weather and 5-day forecast
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    // get current weather data
    fetch(currentWeatherUrl)
      .then((response) => response.json())
      .then((data) => {
        // display current weather
        const currentWeather = `
          <h2 class="card-title text-center">${data.name}</h2>
          <p class="text-center">${data.weather[0].description}</p>
          <p class="text-center">${Math.round(data.main.temp)}&deg;C</p>
          <p class="text-center">Feels like ${Math.round(data.main.feels_like)}&deg;C</p>
          <p class="text-center">Humidity: ${data.main.humidity}%</p>
        `;
        weatherInfo.innerHTML = currentWeather;
        // get 5-day forecast data
        return fetch(forecastUrl);
      })
      .then((response) => response.json())
    .then((data) => {
      // display 5-day forecast
      const forecast = data.list.filter((item) => item.dt_txt.includes('12:00:00'));
      let forecastHtml = '<h3 class="text-center">5-Day Forecast</h3>';
      forecastHtml += '<div class="row">';
      forecast.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
        forecastHtml += `
          <div class="col">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title">${dayOfWeek}</h5>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
                <p>${Math.round(item.main.temp_max)}&deg;C / ${Math.round(item.main.temp_min)}&deg;C</p>
              </div>
            </div>
          </div>
        `;
      });
      forecastHtml += '</div>';
      weatherInfo.innerHTML += forecastHtml;
    })
    .catch((error) => console.log(error));
}