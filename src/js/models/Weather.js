const axios = require('axios');
let data =  require("../data/data");
var DateFormat = require('./DateFormats');

data = data.default;


  
module.exports = class Weather {
    constructor() {

        //define for all the darksky options for icons a html/icon html
        this.icons = {
            "clear-day": `<i class="small material-icons">wb_sunny</i>`, 
            "clear-night": `<i class="small material-icons">wb_sunny</i>`, 
            "rain": ` <img src="./img/icons/rain.png" alt="rain" height="32" width="32">  `,
            "snow": `<img src="./img/icons/snowy.png" alt="rain" height="32" width="32">`, 
            "sleet": ` <img src="./img/icons/rain.png" alt="rain" height="32" width="32">  `,
            "wind": ` <img src="./img/icons/rain.png" alt="rain" height="32" width="32">  `,
            "fog": ` <img src="./img/icons/fog.png" alt="rain" height="32" width="32">  `, 
            "cloudy": `<i class="small material-icons">cloud_queue</i>`, 
            "partly-cloudy-day": `<img src="./img/icons/partly-cloudy.png" alt="rain" height="32" width="32">`, 
            "partly-cloudy-night": `<img src="./img/icons/partly-cloudy.png" alt="rain" height="32" width="32">`
        }
    }
    
    async user() {
        // const res = await axios(`http://ip-api.com/json`);
        // //on the local const res = await axios(`http://ip-api.com/json`);
        // this.country = res.data.country;
        // //console.log(this.country);
        // this.lat = res.data.lat;
        // this.lon = res.data.lon;
        // this.city = res.data.city;
        this.country = 'Israel';
        this.city = 'Tel Aviv';
        this.lat =32.0678;
        this.lon = 34.7647;
        //Insert data to the cookies
        document.cookie = `country=${this.country}`
        document.cookie = `city=${this.city}`
        document.cookie = `lat=${this.lat}`
        document.cookie = `lon=${this.lon}`
   



        // Insert data to the localstorage
        // data.user.location = 'yes';
        // data.user.country = 'this.country';
        // data.user.city = this.city;
        // data.user.lat = this.lat;
        // data.user.lon = this.lon;
        // //save localstorage
        // localStorage.setItem('data', JSON.stringify(data));
        
    }

    async  getWeather() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = `10c242d4a809f84ed03c2be55cfd3624`;
    if (this.country == 'Israel'){
        this.lat =32.0678;
        this.lon = 34.7647;
        }
    
    try{

        const server = '/weather'
        const res = await axios(`${server}`);
        //use dam value on the loacl server
        // const res = {
        //     data : {
        //     "MaxTemp": [
        //     15,
        //     15,
        //     13,
        //     15,
        //     14,
        //     15,
        //     14
        //     ],
        //     "MinTemp": [
        //     13,
        //     11,
        //     11,
        //     10,
        //     12,
        //     8,
        //     5
        //     ],
        //     "icon": [
        //     "rain",
        //     "rain",
        //     "rain",
        //     "rain",
        //     "partly-cloudy-day",
        //     "rain",
        //     "rain"
        //     ],
        //     "_id": "5d3f558fe45c7b967eb1941f",
        //     "cityName": "Tel Aviv",
        //     "lat": 32.0678,
        //     "lon": 34.7647,
        //     "timestamp": "2020-01-18T20:58:02.430Z",
        //     "__v": 0
        //     }
        // }

        //get the max and min temp of today 
        this.tempMin = Math.round(res.data.MinTemp[0]);
        this.tempMax = Math.round(res.data.MaxTemp[0]);
        this.tempIcon = res.data.icon[0];

        //array of max and min temp of the rest of the week
        this.maxWeek = res.data.MaxTemp;
        this.minWeek = res.data.MinTemp;
        this.tempIcons = res.data.icon;

        //get the names of the week day heb
        let dayName = new DateFormat();
        this.DayNameWeek = dayName.getHebWeekDayName();
        
    
    }catch (error) {
        console.log(error);
    }
}

    displayWeather(){
        //html for dispaly data in the main site
        document.getElementById("weather").innerHTML = `<span id="temp-min">${this.tempMax}</span><span>&#176;</span><span>&nbsp;-&nbsp;</span><span id="temp-max">${this.tempMin}</span><span>&#176;</span>`
        document.getElementById("weatherIcon").innerHTML = `${this.icons[this.tempIcon]}`
        //html for the dropdown of the rest of the week
        let weekWeather = document.getElementById("weekWeather");
        for (let i=1; i<7; i++)
        {
            weekWeather.innerHTML += 
           `<tr>
            <td>${this.DayNameWeek[i]}</td>
            <td>${this.icons[this.tempIcons[i]]}</td>
            <td>${this.minWeek[i]}&#176;-${this.maxWeek[i]}&#176;</td>
          </tr>`
        }
    }

}
