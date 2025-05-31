const Main = document.getElementById('Main');
const Location = document.getElementById('location-name');
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

function weather(location_function){
    const url = `http://api.weatherapi.com/v1/current.json?key=0e9c679f63bb4f1fbed153122253105&q=${location_function}&aqi=no`
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        Location.textContent = data.location.name;
        icon.src = data.current.condition.icon;
        updateTime.textContent = data.current.last_updated;
        temperature.textContent = `${data.current.temp_c}°C`;
        humidity.textContent = `Вологість: ${data.current.humidity}%`;
        wind .textContent = `Вітер: ${data.current.wind_kph} км/год, напрямок: ${data.current.wind_dir}`;
        dewpoint.textContent = `Точка роси: ${data.current.dewpoint_c}°C`;
        condition.textContent = data.current.condition.text;
        feelslike.textContent = `Відчувається як: ${data.current.feelslike_c}°C`;
        pressure.textContent = `Тиск: ${data.current.pressure_mb} мб`;
        visibility.textContent = `Видимість: ${data.current.vis_km} км`;
        uv.textContent = `Індекс UV: ${data.current.uv}`;

        console.log(data);

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

weather("London");