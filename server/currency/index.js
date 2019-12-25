require('../db/mongoose')
const axios = require('axios');
const Currency = require('../db/models/currency')
var DOMParser = require('xmldom').DOMParser
var parser = new DOMParser();



//get currency data from bank of israel
async function getCurrency(num) {
    const url = `http://www.boi.org.il/currency.xml?curr=${num}`;

    try {

        const  res = await axios.get(`${url}`);      
        var xml = parser.parseFromString(res.data, "text/xml");
        //get data from the xml return
        const rate = Math.round(xml.getElementsByTagName('RATE')[0].childNodes[0].data * 100) / 100;
        const name = xml.getElementsByTagName('NAME')[0].childNodes[0].data;
        const change = xml.getElementsByTagName('CHANGE')[0].childNodes[0].data;
        //insert datestamp
        var d  = new Date(); 
        const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + "  " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

        //define query
        var query = {'currencyNumber':num};
        //defince new data
        newData = 
        {'rate':rate, 
        'name':name,  
        'change':change ,
        'datestamp':d} 
        
        //update new data in the db
        Currency.updateOne(query, newData, {upsert:true}, function(err, doc){
            if (err) {
                console.log(err)
                return;}
        console.log("succesfully saved");
        return; 
        });

        } catch(error) {
            console.log(error);
    };
}

//update data in place i of the db
function updateCurrencyData(i) {
    //get all the currency from db
    Currency.find({  }, 'currencyNumber', function (err, docs) {
        setTimeout(function() {
            console.log(i)
            //fix the number with 0 if needed
            let fixNumber;
            if (docs[i].currencyNumber<10) {
                fixNumber = ('00'+docs[i].currencyNumber).slice(-2);
                getCurrency(fixNumber); 
            }else {
                getCurrency(docs[i].currencyNumber);
            }
            //dic i
            i--;
            //recursion until the end of the list e
            if (i>-1) {
                updateCurrencyData(i);
            }
            },10*1000);

     })
    
}

    
// send to updateCurrencyData the number of currencies in db from 0
function callUpdate() {
    Currency.find({ }, function (err, docs) {
        updateCurrencyData(docs.length-1) 
    })}


// define timer of updating
function setIntervalCurrency(){
    callUpdate();
    const timerUpdateCurrencyData = setInterval(function () {callUpdate() },10*60*1000);//ten minutes
}

module.exports = { setIntervalCurrency,getCurrency}