require('../db/mongoose')
const axios = require('axios');
const Currency = require('../db/models/currency')
var DOMParser = require('xmldom').DOMParser
var parser = new DOMParser();


//get currency data from bank of israel
async function getCurrency(num) {
    console.log(`the currency number is ${num}`);
    const url = `http://www.boi.org.il/currency.xml?curr=${num}`;
    console.log(`the url is ${url}`);
    try {
        //define cookie 
        let cookieName = 'cookieName';
        let cookieValue = 'cookieValue';
        //send the url and the cookies in try to get data
        let res = await getData(url, cookieName ,cookieValue);   
        console.log(res.data)
        //if cookie is needed it the res.data format is somting like <html><body><script>document.cookie='rrrr9bf16d56=d1857bd7rrrr9bf16d56_d1857bd7; path=/';window.location.href=window.location.href;</script></body></html>
        //check if the cookie format return
        if (res.data.includes(`window.location.href=window.location.href;`)){
            //define reg
            const reg = /\'(.*?)\;/;
            const match = reg.exec(res.data)[1]
            //get the cookie name
            cookieName = match.split('=')[0];
            //get the cookie value
            cookieValue = match.split('=')[1];
            //call the function with the url and the checked cookies
            res = await getData(url, cookieName,cookieValue);   
            //console log the value
            console.log(res.data)
        }
        

        let xml = parser.parseFromString(res.data, "text/xml");
        //get data from res
        const rate = Math.round(xml.getElementsByTagName('RATE')[0].childNodes[0].data * 100) / 100;
        const name = xml.getElementsByTagName('NAME')[0].childNodes[0].data;
        const change = xml.getElementsByTagName('CHANGE')[0].childNodes[0].data;
        //insert datestamp
        var d  = new Date(); 
        const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + "  " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        //define query
        var query = {'currencyNumber':parseInt(num)};
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
        console.log(newData);
        console.log("succesfully saved");
        return; 
        });

        } catch(error) {
            console.log(error);
    };
}

//function to get the currency data from bank of israel with cookies
async function getData(url,cookieName,cookieValue) {
    try {
       let res = await axios({
            url: url,
            method: 'get',
            timeout: 8000,
            headers: {
                Cookie: `${cookieName}=${cookieValue};`
            }
        })
        if(res.status == 200){
            // test for status
            console.log("get bank of Israel, status:")
            console.log(res.status)

        }    
        return res
    }
    catch (err) {
        console.error(err);
    }
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
    const timerUpdateCurrencyData = setInterval(function () {callUpdate() },15*60*1000);//fifteen minutes
}

module.exports = { setIntervalCurrency,getCurrency}
