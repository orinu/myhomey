const mongoose = require('mongoose')

const Weather = mongoose.model('Weather', {
    cityName: {type:String},
    MaxTemp: {type: []},
    MinTemp: {type: []},
    icon: {type: []},
    lat: {type:Number},
    lon: {type:Number},
    timestamp: {type:Date}
})

module.exports = Weather;

