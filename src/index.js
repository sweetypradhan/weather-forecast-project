document.addEventListener('DOMContentLoaded', (event) => {
    "use strict";

    const API = "ac37cfa327ad2f28db0c4a221645d9ea";

    const dayElement = document.querySelector(".default_day");
    const dateElement = document.querySelector(".default_date");
    const btnElement = document.querySelector(".btn_search");
    const inputElement = document.querySelector(".input_field");
    const iconsContainer = document.querySelector(".icons");
    const dayInfoElement = document.querySelector(".day_info");

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
        return `<img class="w-4/5 object-cover mx-auto" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon"/>
        <h2 class="weather_temp text-8xl font-extrabold leading-none">${Math.round(data.main.temp - 275.15)}°C</h2>
        <h3 class="cloudtxt text-2xl capitalize leading-relaxed">${data.weather[0].description}</h3> `;
    }

    function rightSideContent(result){
        return `<div class="content flex justify-between p-1">
                    <p class="title font-semibold">NAME</p>
                    <span class="value">${result.name}</span>
                </div>
                <div class="content flex justify-between p-1">
                    <p class="title font-semibold">TEMP</p>
                    <span class="value">${Math.round(result.main.temp - 275.15)}°C</span>
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

    async function displayForeCast(lat, long) {
        const ForeCast_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
        const data = await fetch(ForeCast_API);
        console.log(data);
    }
    
    
}); 


