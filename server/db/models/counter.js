const mongoose = require('mongoose')

const Counter = mongoose.model('Counter', {
    name: {type:String},
    totalVisitors: {type: Number}
})

module.exports = Counter;