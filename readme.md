About project:
This HTML file along with embedded JavaScript provides a weather forecast web application. It utilizes the OpenWeatherMap API to fetch current weather data and forecast for a specified location.

Setup Instructions:
Clone or download the repository.
Open the HTML file (index.html) in a web browser.

Usage:
Upon opening the application, you will see a weather forecast display for a default location.
You can search for weather information for any location by entering the city or country name in the search field and clicking the "Search" button.
Alternatively, you can use the "Current Location" button to fetch weather information for your current location.
Recent searches are saved and displayed in the dropdown menu for quick access.
The application displays current weather information including temperature, weather condition, humidity, and wind speed. It also provides a 5-day forecast.


Code Structure:
HTML Structure: Defines the layout structure of the web application.
CSS Styling: Utilizes Tailwind CSS for styling along with some custom CSS for responsiveness.
JavaScript: Handles API calls, user interactions, and dynamic content generation.
Event Listeners: Listens for DOMContentLoaded, search button click, current location button click, and recent cities dropdown change events.
Functions:
findLocation(name): Fetches weather data for the specified location and updates the UI.
displayImageContent(data): Generates HTML for displaying weather icon, temperature, and description.
rightSideContent(result): Generates HTML for displaying additional weather information (name, temperature, humidity, wind speed).
displayForeCast(lat, lon): Fetches and displays the 5-day weather forecast.
forecast(frContent): Generates HTML for displaying each day's forecast.
useCurrentLocation(): Fetches weather data for the user's current location and updates the UI.
saveCityToRecent(city): Saves recently searched cities to local storage.
loadRecentCities(): Loads and displays recently searched cities from local storage.