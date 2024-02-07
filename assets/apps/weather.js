let weathergoboing = false;
let weatherInterval; // To hold the interval reference

function getWeather2(city2, system, bypass) {
    try {
        let city;
        if (document.getElementById(city2)) {
            city = document.getElementById(city2).value;
        } else {
            city = city2;
        }
        const apiKey = 'b1b534c96a287b05ee3d72fa79800ce1';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    mkw(`<p>City not found!</p><button class="b1" onclick="opapp('weather');this.parentNode.parentNode.remove();">Open Weather</button>`, 'Weather', '200px;');
                    fesw('weathers2', 'weathers1');
                    console.log('<!> City not found!');
                }
                return response.json();
            })
            .then(data => {
                const temperature = data.main.temp;
                const conditions = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const weatherInfo = `${temperature}*${system === 'metric' ? 'C' : 'F'}, ${conditions}, humidity: ${humidity}%, wind speed: ${windSpeed} m/s`;
                const weatherInfo2 = `${temperature}*${system === 'metric' ? 'C' : 'F'}, ${conditions}`;
                masschange('weather', weatherInfo2);
                masschange('weathera', weatherInfo);
                console.log('[OK] getWeather has pinged with no errors.');
            })
            .catch(error => {
                masschange('weather', 'An error occurred, check the console.');
                console.log(error);
            });
        writevar('city', city);
        writevar('unit', system);
        writevar('wd', 'noice');
        fesw('weathers1', 'weathers2');
    } catch (error) {
        mkw(`<p>An error occured with the weather.</p><button class="b1" onclick="walert('${error}', 'Error Details', '300px');">View Error Details</button>`, 'Weather', '300px');
    }
}

function checkw(city, sys) {
    getWeather2(city, sys);
}

function getWeather(city3, sys, bypass) {
    if (weathergoboing === false) {
        getWeather2(city3, sys, bypass);
        if (weatherInterval) clearInterval(weatherInterval); // Clear previous interval
        weatherInterval = setInterval(() => checkw(city3, sys), 180000);
    } else {
        console.log('HEYYYYYY!!! WEATHER ALREADY WENT BOING!!!!');
    }
}
