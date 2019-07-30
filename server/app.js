const path = require('path')
const express =require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
var bodyParser = require('body-parser')
var {counter, getTotalCounter} = require('./counter/index')
var nodemailer = require('nodemailer');

require('./db/mongoose')
require('./currency/index')
const Currency = require('./db/models/currency')
const Weather = require('./db/models/weather')

//setting of nodemailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: process.env.MYHOMY_EMAIL_USER,
           pass: process.env.MYHOMY_EMAIL_PASS
       }
   });

//setting the port
const port = process.env.PORT || 3150;
const dist = path.join(__dirname , '../dist')

const app = express();

app.use(express.static(dist));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser());

app.get ('', (req,res) => {
    res.render('index.html');
})



app.get ('/weather', async(req,res) => {
    //visitor counter - weather call when user open website
    counter();
    //weather

    //no cookies body
    if (!req.cookies.city) {
    return res.send( {
      'error': 'problem with city data'
    }) }
    //query of cityName from data
    try {
    const cityName = await Weather.find({cityName:req.cookies.city})
    res.send(cityName[0])
    } catch (e) {
      res.status(500).send()
  }
    
  })

    // console.log(req.cookies.city, req.cookies.lon, req.cookies.lat)
    // res.send( queryWeather(req.cookies.city, req.cookies.lon, req.cookies.lat))


app.get ('/currency', async(req,res) => {
  //no query body
  if (!req.query.curnum) {
    return res.send( {
      'error': 'You must provide a currency number'
    }) }
    
    let fixNumber = req.query.curnum; 
    //validate the number that is 2 digit
    if (req.query.curnum<10) {
        fixNumber = ('00'+req.query.curnum).slice(-2);
    }
    //query of currency number from the sql
    try {
    const cur = await Currency.find({currencyNumber:fixNumber})
    res.send(cur[0])
    } catch (e) {
      res.status(500).send()
  }
    
  })


//post of contact send mail
app.post('/contact', (req,res) => {
    console.log(req.body);
    const mailOptions = {
        from: 'homeyhomeyhomeyhomeyhomey@gmail.com', // sender address
        to: 'ori@ezracpa.co.il', 
        subject: 'פנייה חדשה מאתר Homey', // Subject line
        html: `<p>name:&emsp;${req.body.name}<br>phone:&emsp;${req.body.phone}<br>email:&emsp;${req.body.email}<br>text:&emsp;${req.body.text}<br></p>`// plain text body
      };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
});

//send total visitor via mail
app.get ('/counter', (req,res) => {
    sendCounter()
    return res.send(200, { message: 'ok' });
})


async function sendCounter () {
  const res = await getTotalCounter();
  const totalCounter = res[0].totalVisitors;
  const mailOptions = {
    from: 'homeyhomeyhomeyhomeyhomey@gmail.com', // sender address
    to: 'ori@ezracpa.co.il', 
    subject: 'counter Homey', // Subject line
    html: `<p>total counter:&emsp;${totalCounter}</p>`// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
}
//send on timer total visitor via mail
const timersendCounter = setInterval(function () { sendCounter() },10*60*60*1000);//twenty four hours


app.listen (port, () => {
    console.log(`Server is up port ${port}`)
})