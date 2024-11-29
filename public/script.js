document.addEventListener('DOMContentLoaded', () => {
    
    const searchInput = document.getElementById('search');
    const statusElement = document.querySelector('[data-status]');
    const locationElement = document.querySelector('[data-location]');
    const temperatureElement = document.querySelector('[data-temperature]');
    const windElement = document.querySelector('[data-wind]');
    const precipitationElement = document.querySelector('[data-precipitation]');

    // Function to fetch weather data
    async function fetchWeather(city) {
        try {
            // Make a GET request to the backend route
            const response = await fetch(`/weather?city=${city}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('City not found or an error occurred');
            }

            // Parse the JSON response
            const data = await response.json();

            // Update the HTML with the fetched weather data
            statusElement.textContent = data.weather[0].description || 'N/A';
            locationElement.textContent = data.name || 'N/A';
            temperatureElement.textContent = `${data.main.temp}°C` || 'N/A';
            windElement.textContent = `${data.wind.speed} m/s` || 'N/A';
            precipitationElement.textContent = `${data.clouds.all}%` || 'N/A';
        } catch (err) {
            // Handle errors
            console.error(err.message);
            statusElement.textContent = 'Error fetching data';
        }
    }

    // Add an event listener for the search input
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const city = searchInput.value.trim();
            console.log(city);
            if (city) {
                fetchWeather(city); // Fetch the weather for the entered city
            }
        }
    });
});
