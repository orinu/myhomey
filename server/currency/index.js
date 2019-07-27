var fs = require('fs');
var path = require('path')
const axios = require('axios');
var DOMParser = require('xmldom').DOMParser
var parser = new DOMParser();

//meke a global varible from the json name data
const jsonPath = path.join(__dirname,"./data.json");
var data = require(jsonPath); 

//save json file
function saveData() {
    var json = JSON.stringify(data);
    fs.writeFile(jsonPath, json, function(err, result) {
        if(err) console.log('error', err);
    });
}


//get q from the server - cookies data 
function queryCurrency(num) {
    //the city already in the server data
    if (data[num] !== undefined) {
        return data[num];
    //not exist in the data get the data and save
    }else {
    throw new Error('No currency number in the data');
    }
}

//get currency data from bank of israel
async function getCurrency(num) {
    const url = `http://www.boi.org.il/currency.xml?curr=${num}`;

    try {

        const  res = await axios.get(`${url}`);      
        var xml = parser.parseFromString(res.data, "text/xml");
        //get data from the xml return
        data[num].rate = Math.round(xml.getElementsByTagName('RATE')[0].childNodes[0].data * 100) / 100;
        data[num].name = xml.getElementsByTagName('NAME')[0].childNodes[0].data;
        data[num].change = xml.getElementsByTagName('CHANGE')[0].childNodes[0].data;
        //insert datestamp
        var d  = new Date(); 
        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        data[num].datestamp = datestring;
        //save data
        saveData() 

    } catch(error) {
        console.log(error);
    };
}


function updateCurrencyData(i) {
    const currency = Object.keys(data);

    setTimeout(function() {
    getCurrency(currency[i]); 
    var d  = new Date(); 
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    console.log (i, datestring);  
    i--;
    if (i>-1) {
        updateCurrencyData(i);
    }
    },10*1000);
}

// updateCurrency
const timerUpdateCurrencyData = setInterval(function () {updateCurrencyData(Object.keys(data).length-1) },1*60*60*1000);//one hours


module.exports = {queryCurrency, getCurrency}