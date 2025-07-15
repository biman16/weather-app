let btn = document.querySelector(".search-box button");
let weatherData = document.querySelector(".weather-data");

btn.addEventListener("click", async function(e) {
    e.preventDefault();
    let city = document.getElementById("city").value;
    const apikey = "0852ed4e859e86f2737c470d0088d2d1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return showData(data);

});

function showData(data) {
    if (data.cod === "404") {
        weatherData.innerHTML = `<h2>City not found</h2>`;
    }else{
        let temp = data.main.temp;
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    let description = data.weather[0].description;
    weatherData.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

            <h2>${temp} &deg;C</h2>
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
    
}