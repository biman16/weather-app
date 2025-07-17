let btn = document.querySelector(".search-box button");
let weatherData = document.querySelector(".weather-data");
const blockedCities = ["Karachi", "Lahore"];


btn.addEventListener("click", async function(e) {
    e.preventDefault();
    let city = document.getElementById("city").value;
    const cityLower = city.toLowerCase();

    if (blockedCities.map(c => c.toLowerCase()).includes(cityLower)) { // 👈 compare lowercase input to lowercase blocked cities
        weatherData.innerHTML = `<h2>Weather data for ${city} is not available.</h2>`;
        return;
    }
    // const apikey = "0852ed4e859e86f2737c470d0088d2d1";
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    const url = `http://localhost:3000/weather?city=${city}`;

    try {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  console.log(data)
  return showData(data);

} catch (error) {
  console.error("Fetch failed:", error);
  weatherData.innerHTML = `<h2>⚠️ Could not fetch weather data. Please try again later.</h2>`;
}
    
});

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}


let UnitToggleBtn = document.getElementById("unit-toggle");
let currentTempc = null;
let isCelsius = true;


function showData(data) {
    if (data.cod === "404") {
        weatherData.innerHTML = `<h2>City not found</h2>`;
    }else{
    currentTempc = data.main.temp;
    let temp = currentTempc;
    isCelsius = true;
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    let country = data.sys.country;
    let cityName = data.name;
    let description = capitalizeWords(data.weather[0].description);

    weatherData.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <h2>${cityName}, ${country}</h2>
            <h2 id="temp-display">${temp} &deg;C</h2>
            <p>${description}</p>
            <div class="other-data">
                <div class="humidity">
                    <p>Humidity</p>
                    <h3>${humidity} %</h3>
                    
                </div>
                <div class="wind">
                    <p>Wind</p>
                    <h3>${windSpeed} m/s</h3>
                    
                </div>
            </div>`
    }

        weatherData.classList.remove("fade-in");
        void weatherData.offsetWidth;
        weatherData.classList.add("fade-in");
    
}


let toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        toggleBtn.textContent = "🌙 Dark Mode";
    }else {
        toggleBtn.textContent = "☀️ Light Mode";
    }
});



UnitToggleBtn.addEventListener("click", () => {
    if (isCelsius){
        let tempF = (currentTempc * 9/5) + 32;
        weatherData.querySelector("#temp-display").innerHTML = `${tempF.toFixed(2)} &deg;F`;
        UnitToggleBtn.textContent = "Switch to °C";
        isCelsius = false;
    }else {
        weatherData.querySelector("#temp-display").innerHTML = `${currentTempc} &deg;C`;
        UnitToggleBtn.textContent = "Switch to °F";
        isCelsius = true;
    }
});