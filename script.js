const apiKey = '449df049785f424d936131500242508';
const weatherInfoDiv = document.getElementById('weather-info');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    if (location) {
        getWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

async function getWeatherData(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Fetch error: ', error);
        weatherInfoDiv.innerHTML = `<p>Failed to fetch weather data: ${error.message}</p>`;
    }
}

function displayWeatherData(data) {
    const iconUrl = `https:${data.current.condition.icon}`;
    const weatherHtml = `
        <h2>${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind: ${data.current.wind_kph} kph</p>
        <img src="${iconUrl}" alt="${data.current.condition.text}">
    `;
    weatherInfoDiv.innerHTML = weatherHtml;
}
