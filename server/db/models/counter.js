const mongoose = require('mongoose')

const Counter = mongoose.model('Counter', {
    name: {type:String},
    date: {type:Date},
    daily: {type:Number},
    monthly: {type:Number},
    totalVisitors: {type: Number}
})

module.exports = Counter;