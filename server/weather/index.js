var fs = require('fs');
var path = require('path')
const axios = require('axios');
const jsonPath = path.join(__dirname,"./data.json");
var data = require(jsonPath); 


function saveData() {
    var json = JSON.stringify(data);
    fs.writeFile(jsonPath, json, function(err, result) {
        if(err) console.log('error', err);
    });

}

//get q from the server - cookies data 
function queryWeather(city,lon,lat) {
    console.log(city);
    //no city sstring - problem with the ip-api
    if (!city) {
        throw new Error('No city string');
    }
    //the city already in the server data
    if (data[city] !== undefined) {
        console.log('exist');
        return data[city];
    //not exist in the data get the data and save
    }else {
        getWeather(city,lon,lat).then(() => {
            return data[city];
        });
        
    }
}

//get whether data 
async function getWeather(city,lon,lat) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    try{
    const api = `https://api.darksky.net/forecast/321eb5bdb50ea50ecad85f4a28a4c67d/${lat},${lon}?units=si`;
        const res = await axios(`${api}`);
        data[city] = {};
        data[city].MaxTemp = [], data[city].MinTemp = [],  data[city].icon =[];
        for (var i =1; i<8; i++) {
            data[city].MaxTemp.push(Math.round(res.data.daily.data[i].temperatureMax));
            data[city].MinTemp.push(Math.round(res.data.daily.data[i].temperatureLow));
            data[city].icon.push(res.data.daily.data[i].icon);
        }
        data[city].lat = lat;
        data[city].lon = lon;
        data[city].timestamp = new Date();
        saveData() 

    }catch (error) {
        console.log(error);
    }
}


function updateWeatherData(i) {
        const citys = Object.keys(data);
        setTimeout(function() {
        //getWeather(citys[i],data[citys[i][lat]])
        getWeather(citys[i],data[citys[i]].lon,data[citys[i]].lat); 
        var d  = new Date(); 
        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

        console.log (i, datestring);  
        i--;
        if (i>-1) {
            updateWeatherData(i);
        }
        },10*1000);
}

// updateWeatherData(Object.keys(data).length-1);
const timerUpdateWeatherData = setInterval(function () {updateWeatherData(Object.keys(data).length-1) },2*60*60*1000);//two hours
module.exports = {queryWeather,updateWeatherData}