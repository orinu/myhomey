// require('../db/mongoose')
const axios = require('axios');
const Currency = require('../db/models/currency')
var DOMParser = require('xmldom').DOMParser
var parser = new DOMParser();


async function getData(url) {
    try {
       let res = await axios({
            url: url,
            method: 'get',
            timeout: 8000,
            headers: {
                Cookie: `rrrr9bf16d56=a2be3f01rrrr9bf16d56_a2be3f01;`
            }
        })
        if(res.status == 200){
            // test for status you want, etc
            console.log(res.status)

        }    
        return res
    }
    catch (err) {
        console.error(err);
    }
}

//get currency data from bank of israel
async function getCurrency(num) {
    const url = `http://www.boi.org.il/currency.xml?curr=0${num}`;

    try {

        let res = await getData(url);   
        console.log(res.data)  
        let xml = parser.parseFromString(res.data, "text/xml");
        // console.log( xml);
        // const cookies =  xml.getElementsByTagName('script')[0].childNodes[0].data;
        // if (cookies.includes('window.location.href=window.location.href')) {
        //     console.log('yes')
        //     const regex =  /\'(.*?)\;/
        //     const cookie = regex.exec(cookies)[1];
        //     cookieName = cookie.split('=')[0];
        //     cookieValue = cookie.split('=')[1];
        //     console.log(cookie)
        //     console.log(cookieName)
        //     console.log(cookieValue)
        //     res = await getData(url,cookieName,cookieValue)
        //     xml = parser.parseFromString(res.data, "text/xml");
        //     console.log(xml)
            
        // }
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
getCurrency(1)