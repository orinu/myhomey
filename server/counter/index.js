const Counter = require('../db/models/counter')
require('../db/mongoose')

//if user enter counter up the count by 1
function counter() {
    Counter.updateOne({name:'general'} , {$inc: {totalVisitors:1}} ,function (err, data) {
        // console.log(data)
        if (err) console.log(err)
    });
}

function counterUniqueVisitors() {
    Counter.updateOne({name:'general'} , {$inc: {uniqueVisitors:1}} ,function (err, data) {
        // console.log(data)
        if (err) console.log(err)
    });
}

//return promise of totalVisitors from the db
function getTotalCounter() {
    return Counter.find({ name:'general' }).exec()
}

module.exports = {counter,counterUniqueVisitors, getTotalCounter}