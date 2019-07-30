const axios = require('axios');
const Weather = require('../db/models/weather')
require('../db/mongoose')


//get whether data 
async function getWeather(city,lon,lat) {
    try{
    const api = `${process.env.SENDURL_WEATHER_API}${lat},${lon}?units=si`;
        const res = await axios(`${api}`);
        var MaxTemp = [], MinTemp =[], icon=[];
        //insert data to array
        for (var i =1; i<8; i++) {
            MaxTemp.push(Math.round(res.data.daily.data[i].temperatureMax));
            MinTemp.push(Math.round(res.data.daily.data[i].temperatureLow));
            icon.push(res.data.daily.data[i].icon);
        }
        
        var d  = new Date(); 
        const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        //define qury
        var query = {'cityName':city};
        //define the data that need to update
        newData = 
        {'cityName':city, 
        'MaxTemp':MaxTemp, 
        'MinTemp':MinTemp,  
        'icon':icon ,
        'lat':lat ,
        'lon':lon ,
        'timestamp':d} 
      
        //update data
        Weather.updateOne(query, newData, {upsert:true}, function(err, doc){
        if (err) {
            console.log(err)
            return;}
        console.log("succesfully saved");
        console.log(doc);
        return; 
        });
        
        }catch (error) {
            console.log(error);
        }
    }

//update data in place i of the db
function updateWeatherData(i) {
    //get all cities from db
    console.log(i);
    Weather.find({  }, function (err, docs) {
        setTimeout(function() {
            //update data for city in play i
            getWeather(docs[i].cityName,docs[i].lon,docs[i].lat);
            //dic i
            i--;
            if (i>-1) {
                updateWeatherData(i);
            }
            },10*1000);
     })
    }
    
// send to updateWeatherData the number of cities in db from 0
function callUpdate() {
    Weather.find({ }, function (err, docs) {
        updateWeatherData(docs.length-1) })
    }

// define timer of updating
function setIntervalWeather(){
    const timerUpdateWeatherData = setInterval(function () {callUpdate() },2*60*60*1000);//two hours
}
module.exports =  { setIntervalWeather,updateWeatherData }