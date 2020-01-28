const mongoose = require('mongoose')

const Currency = mongoose.model('Currency', {
    currencyNumber: {type: Number},
    rate: {type: Number},
    name: {type: String},
    nameHeb: {type: String},
    change: {type: Number},
    htmlIcon: {type: String},
    datestamp: {}
})

module.exports = Currency