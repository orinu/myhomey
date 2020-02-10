const mongoose = require('mongoose')
// const Counter = require('./models/counter')




// mongoose.connect('mongodb://localhost:27017/hompage' ,{
mongoose.connect(process.env.MONGODB_URL  ,{
    useNewUrlParser: true,
    useCreateIndex: true
})



// Currency.find({ currencyNumber:2}).then((result) => {
//     console.log(result[0]);
// }).catch((err) => {
//     console.log(err);
// });


// const ll = new Counter({
//     name: 'general',
//     totalVisitors: 0
// })


// const telaviv = new Weather({
//     cityName: 'Haifa',
//     MaxTemp: [31,30,30,30,30,31,31],
//     MinTemp: [22,23,26,25,25,25,25],
//     icon: ["clear-day","clear-day","clear-day","clear-day","clear-day","clear-day","clear-day"],
//     lat: 32.794044,
//     lon: 34.989571,
//     timestamp: new Date()
// })

// ll.save().then(() => {
//     console.log(ll);
// }).catch((error) => {
//     console.log(error);
// })