const axios = require('axios');
let data =  require("../data/data");
var DateFormat = require('./DateFormats');

data = data.default;


  
module.exports = class Weather {
    constructor() {
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
        //http://localhost:3150/
    const server = '/weather'
    
        const res = await axios(`${server}`);
        // console.log(res.data)

        //get the max and min temp of today
        this.tempMin = Math.round(res.data.MinTemp[0]);
        this.tempMax = Math.round(res.data.MaxTemp[0]);

        //array of max and min temp of the week
        this.maxWeek = res.data.MaxTemp;
        this.minWeek = res.data.MinTemp;
        //get the names of the week day heb
        let dayName = new DateFormat();
        this.DayNameWeek = dayName.getHebWeekDayName();
        
        

    //api
    // const api = `https://api.darksky.net/forecast/321eb5bdb50ea50ecad85f4a28a4c67d/${this.lat},${this.lon}?units=si`;
    //     const res = await axios(`${proxy}${api}`);
    //     console.log(res)
    //     this.tempMin = Math.round(res.data.daily.data[1].temperatureLow);
    //     this.tempMax = Math.round(res.data.daily.data[1].temperatureMax);

    //dam data
        // this.tempMin = 22.32;  
        // this.tempMax = 28.16; 
        // this.tempMax = Math.round(this.tempMax);
        // this.tempMin = Math.round(this.tempMin);

    }catch (error) {
        console.log(error);
    }
}

    displayWeather(){
        document.getElementById("weather").innerHTML = `<span id="temp-min">${this.tempMax}</span><span>&#176;</span><span>&nbsp;-&nbsp;</span><span id="temp-max">${this.tempMin}</span><span>&#176;</span>`
        let weekWeather = document.getElementById("weekWeather");
        for (let i=1; i<7; i++)
        {
            weekWeather.innerHTML += 
           `<tr>
            <td>${this.DayNameWeek[i]}</td>
            <td><i class="small material-icons yellow-text text-darken-2">wb_sunny</i></td>
            <td>${this.minWeek[i]}&#176;-${this.maxWeek[i]}&#176;</td>
          </tr>`
        }
    }

}
