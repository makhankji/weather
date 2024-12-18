document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '3576072ad3c9641c760bbe16e7e2639c';  // Replace with your OpenWeatherMap API key
    const weatherBtn = document.getElementById('get-weather-btn');
    const cityInput = document.getElementById('city-input');
    const weatherResult = document.getElementById('weather-result');

    weatherBtn.addEventListener('click', () => {
        const city = cityInput.value;
        if (city) {
            getWeather(city);
        } else {
            weatherResult.innerHTML = '<p>Please enter a city name.</p>';
        }
    });

    // Add input event listener to change button color
    document.getElementById('city-input').addEventListener('input', function() {
        var button = document.getElementById('get-weather-btn');
        button.style.backgroundColor = '#0056b3';
    });

    async function getWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod === 200) {
                displayWeather(data);
            } else {
                weatherResult.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            weatherResult.innerHTML = '<p>Unable to fetch weather data. Please try again later.</p>';
        }
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        const weatherDetails = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Pressure: ${main.pressure} hPa</p>
        `;
        weatherResult.innerHTML = weatherDetails;
    }
   
    // Trigger getWeather on pressing "Enter" key in the city input field
    cityInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) { 
            event.preventDefault(); 
            const city = cityInput.value;
            if (city) {
                getWeather(city);
            } else {
                weatherResult.innerHTML = '<p>Please enter a city name.</p>';
            }
        }
    });

    
});
