const Main = document.getElementById('Main');
const Location = document.getElementById('location-name');
const country = document.getElementById('country');
const updateTime = document.getElementById('update-time');
const icon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition-text');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const dewpoint = document.getElementById('dewpoint');
const feelslike = document.getElementById('feelslike');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const uv = document.getElementById('uv');
const searchButton = document.getElementById('search-button');
const locationInput = document.getElementById('location-input');

document.getElementById('theme-switch').addEventListener('change', function() {
    const isChecked = this.checked;
    document.body.classList.toggle('white', isChecked);
    document.querySelector('header').classList.toggle('white', isChecked);
    document.getElementById('current-weather').classList.toggle('white', isChecked);
    document.getElementById('additional-info').classList.toggle('white', isChecked);
    document.querySelectorAll('.forecast-day').forEach(day => {
        day.classList.toggle('white', isChecked);
    });
    document.querySelectorAll('#additional-info li').forEach(item => {
        item.classList.toggle('white', isChecked);
    });
    document.querySelectorAll('.weather-info h2').forEach(item => {
        item.classList.toggle('white', isChecked);
    });
    document.querySelectorAll('.weather-info p').forEach(item => {
        item.classList.toggle('white', isChecked);
    });
    document.querySelectorAll('#additional-info h3').forEach(item => {
        item.classList.toggle('white', isChecked);
    });
});

searchButton.addEventListener('click', () => {
    const locationValue = locationInput.value;
    if (locationValue) {
        fetchWeatherData(locationValue);
    }
});

function fetchWeatherData(location) {
    const apiKey = '0e9c679f63bb4f1fbed153122253105';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateCurrentWeather(data);
            displayWeather(data);
            setBodyBackground(data.current.condition.text);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function updateCurrentWeather(data) {
    Location.textContent = data.location.name;
    country.textContent = data.location.country;
    icon.src = data.current.condition.icon;
    updateTime.textContent = data.current.last_updated;
    temperature.textContent = `${data.current.temp_c}°C`;
    humidity.textContent = `Вологість: ${data.current.humidity}%`;
    wind.textContent = `Вітер: ${data.current.wind_kph} км/год, напрямок: ${data.current.wind_dir}`;
    dewpoint.textContent = `Точка роси: ${data.current.dewpoint_c}°C`;
    condition.textContent = data.current.condition.text;
    feelslike.textContent = `Відчувається як: ${data.current.feelslike_c}°C`;
    pressure.textContent = `Тиск: ${data.current.pressure_mb} мб`;
    visibility.textContent = `Видимість: ${data.current.vis_km} км`;
    uv.textContent = `Індекс UV: ${data.current.uv}`;
}

function displayWeather(data) {
    const forecastContainer = document.getElementById('weather-forecast');
    forecastContainer.innerHTML = '';

    data.forecast.forecastday.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'forecast-day';

        const date = new Date(day.date);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dayDiv.innerHTML = `
            <h3>${date.toLocaleDateString('uk-UA', options)}</h3>
            <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p>${day.day.condition.text}</p>
            <p>Температура: ${day.day.avgtemp_c} °C</p>
            <p>Вологість: ${day.day.avghumidity} %</p>
        `;

        forecastContainer.appendChild(dayDiv);
    });
}

function setBodyBackground(condition) {
    document.body.classList.remove('sunny', 'cloudy', 'rain', 'snow', 'fog', 'thunderstorm', 'windy', 'rainandsnow', 'freezing', 'sunset');
    switch (condition) {
        case 'Sunny':
            document.body.classList.add('sunny');
            break;
        case 'Partly Cloudy':
        case 'Partly cloudy':
        case 'Cloudy':
            document.body.classList.add('cloudy');
            break;
        case 'Rain':
        case 'Light rain':
            document.body.classList.add('rain');
            break;
        case 'Snow':
            document.body.classList.add('snow');
            break;
        case 'Fog':
            document.body.classList.add('fog');
            break;
        case 'Thunderstorm':
            document.body.classList.add('thunderstorm');
            break;
        case 'Windy':
            document.body.classList.add('windy');
            break;
        case 'Rain and Snow':
            document.body.classList.add('rainandsnow');
            break;
        case 'Freezing':
            document.body.classList.add('freezing');
            break;
        case 'Sunset':
            document.body.classList.add('sunset');
            break;
        default:
            break;
    }
}

fetchWeatherData("London");
