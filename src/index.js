document.addEventListener('DOMContentLoaded', (event) => {
    "use strict";

    const API = "ac37cfa327ad2f28db0c4a221645d9ea";

    const dayElement = document.querySelector(".default_day");
    const dateElement = document.querySelector(".default_date");
    const btnElement = document.querySelector(".btn_search");
    const inputElement = document.querySelector(".input_field");
    const iconsContainer = document.querySelector(".icons");
    const dayInfoElement = document.querySelector(".day_info");
    const listContentElement = document.querySelector(".list_content ul");

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday", 
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // Display the day
    const day = new Date();
    const dayName = days[day.getDay()];
    dayElement.textContent = dayName;

    // Display date
    let month = day.toLocaleString("default", { month: "long" });
    let date = day.getDate();
    let year = day.getFullYear();

    dateElement.textContent = `${date} ${month} ${year}`;

    // Add event
    btnElement.addEventListener("click", (e) => {
        e.preventDefault();

        // Check empty value
        if (inputElement && inputElement.value !== ""){
            const search = inputElement.value;
            inputElement.value = "";

            findLocation(search);

        } else {
            console.log("Please Enter City Or Country Name");
        }
    });

    async function findLocation(name) {
        iconsContainer.innerHTML = "";    
        dayInfoElement.innerHTML = "";
        listContentElement.innerHTML= "";
        try{
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}`;
            const data = await fetch(API_URL);
            const result = await data.json();
            console.log(result);

            if(result.cod !=="404") {
                //display image content
                const imageContent = displayImageContent(result);

                //display right side content
                const rightSide = rightSideContent(result);

                //forecast function
                displayForeCast(result.coord.lat, result.coord.lon);

                iconsContainer.insertAdjacentHTML("afterbegin", imageContent);
                dayInfoElement.insertAdjacentHTML("afterbegin", rightSide);
            } else {
                const message = `<h2 class="weather_temp text-8xl font-extrabold leading-none">${result.cod}</h2>
                <h3 class="cloudtxt text-2xl capitalize leading-relaxed">${result.message}</h3> `; 
                iconsContainer.insertAdjacentHTML("afterbegin", message);
            }
        
        } catch (error) {}
    } 

    //display image and temp
    function displayImageContent(data) {
        const tempInCelsius = Math.round(data.main.temp - 273.15);
        return `<img class="w-4/5 object-cover mx-auto" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon"/>
        <h2 class="weather_temp text-8xl font-extrabold leading-none">${Math.round(data.main.temp - 273.15)}°C</h2>
        <h3 class="cloudtxt text-2xl capitalize leading-relaxed">${data.weather[0].description}</h3> `;
    }

    function rightSideContent(result){
        const tempInCelsius = Math.round(result.main.temp - 273.15);
        return `<div class="content flex justify-between p-1">
                    <p class="title font-semibold">NAME</p>
                    <span class="value">${result.name}</span>
                </div>
                <div class="content flex justify-between p-1">
                    <p class="title font-semibold">TEMP</p>
                    <span class="value">${Math.round(result.main.temp - 273.15)}°C</span>
                </div>
                <div class="content flex justify-between p-1">
                    <p class="title font-semibold">HUMIDITY</p>
                    <span class="value">${result.main.humidity}%</span>
                </div>
                <div class="content flex justify-between p-1">
                    <p class="title font-semibold">WIND SPEED</p>
                    <span class="value">${result.wind.speed} km/h</span>
                </div>`;
    }

    async function displayForeCast(lat, lon) {
        const ForeCast_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}`;
        const data = await fetch(ForeCast_API);
        const result = await data.json();
        
        //filter the forecast
        const uniqueForeCastDays = [];
        const dayForecast = result.list.filter((forecast) => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForeCastDays.includes(forecastDate)){
                return uniqueForeCastDays.push(forecastDate);
            }
        });
        console.log(dayForecast);
        
        dayForecast.forEach((content, indx) => {
            if (indx <= 4) {                                   // display weather for 5 days 
                listContentElement.insertAdjacentHTML("afterbegin",forecast(content));
            }
            
        });
    }

    //forecast html element data
    function forecast(frContent) {
        const tempInCelsius = Math.round(frContent.main.temp - 273.15);

        const day = new Date(frContent.dt_txt);
        const dayName = days[day.getDay()];
        const splitDay = dayName.split("",3);   //split the first 3 letter of days
        const joinDay = splitDay.join("");      //used to join the 3 letters
        

        return `<li class="p-2 flex flex-col items-center rounded-lg transition-transform duration-300 ease-in hover:scale-110 bg-blue-400 text-gray-800 shadow-md cursor-pointer">
        <img src="https://openweathermap.org/img/wn/${frContent.weather[0].icon}@2x.png">
        <span>${joinDay}</span>                                                             
        <div class="day_temp">${tempInCelsius}°C</div>
        <span class="humidity">${frContent.main.humidity}%</span>
        <span class="wind">${frContent.wind.speed} Km/h</span>
    </li>`
    }

    // Function to use the current location to fetch weather data
function useCurrentLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Clear previous data
            iconsContainer.innerHTML = "";    
            dayInfoElement.innerHTML = "";
            listContentElement.innerHTML = "";

            // Fetch weather data using the current location
            try {
                const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
                const response = await fetch(API_URL);
                const result = await response.json();

                if (result.cod === 200) {
                    // Update the UI with the fetched weather data
                    const imageContent = displayImageContent(result);
                    const rightSide = rightSideContent(result);

                    iconsContainer.innerHTML = imageContent;
                    dayInfoElement.innerHTML = rightSide;

                    // Call the forecast function to display the forecast using the coordinates
                    displayForeCast(lat, lon);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error('Fetch error: ', error);
            }
        }, function(error) {
            console.error("Geolocation Error: " + error.message);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}



// Add the useCurrentLocation function to the window object to make it accessible from the HTML button's onclick attribute
window.useCurrentLocation = useCurrentLocation;

// Rest of your existing JavaScript code...

}); 


