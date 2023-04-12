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