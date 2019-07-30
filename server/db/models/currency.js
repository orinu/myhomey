const mongoose = require('mongoose')

const Currency = mongoose.model('Currency', {
    currencyNumber: {type: Number},
    rate: {type: Number},
    name: {type: String},
    change: {type: Number},
    datestamp: {}
})

module.exports = Currency