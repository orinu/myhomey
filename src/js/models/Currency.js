const axios = require('axios');
let price = require('crypto-price')

export const getCurrencyValues = async () => {
  try {
    //init the table of the dropdown contant
    document.getElementById('currencyList').innerHTML = ``;

    //get the value from the server
    const url = `/currency`;
    let res = await axios.get(`${url}`);  

    //dummy values local 
  //   let res = {data: [
  //     {
  //         "_id": "5d3e300db14ee57daac9bff3",
  //         "currencyNumber": 1,
  //         "rate": 3.46,
  //         "name": "Dollar",
  //         "nameHeb": "דולר",
  //         "change": -0.087,
  //         "htmlIcon": "",
  //         "datestamp": "2020-01-24T20:34:12.256Z",
  //         "__v": 0
  //     },
  //     {
  //         "_id": "5d3e1a8380bdee7617a16372",
  //         "currencyNumber": 27,
  //         "rate": 3.82,
  //         "name": "Euro",
  //         "nameHeb": "יורו",
  //         "change": -0.454,
  //         "htmlIcon": "",
  //         "datestamp": "2020-01-24T20:34:02.199Z",
  //         "__v": 0
  //     },
  //     {
  //         "_id": "5e294819421777b983ee8f44",
  //         "currencyNumber": 31,
  //         "rate": 3.15,
  //         "name": "Yen",
  //         "nameHeb": "יין",
  //         "change": -0.048,
  //         "htmlIcon": " <img src=\"./img/currency/yen.png\" alt=\"rain\" height=\"28\" width=\"32\">",
  //         "datestamp": "2020-01-24T20:33:52.267Z",
  //         "__v": 0
  //     },
  //     {
  //         "_id": "5e294823421777b983ee8f45",
  //         "currencyNumber": 3,
  //         "rate": 0.36,
  //         "name": "Krona",
  //         "nameHeb": "כתר",
  //         "change": -0.467,
  //         "htmlIcon": " <img src=\"./img/currency/korona.png\" alt=\"rain\" height=\"38\" width=\"38\">",
  //         "datestamp": "2020-01-24T20:33:42.267Z",
  //         "__v": 0
  //     },
  //     {
  //         "_id": "5e294986421777b983ee8f47",
  //         "currencyNumber": 2,
  //         "rate": 4.53,
  //         "name": "Pound",
  //         "nameHeb": "פאונד",
  //         "change": -0.084,
  //         "htmlIcon": " <img src=\"./img/currency/pound.png\" alt=\"rain\" height=\"32\" width=\"32\">",
  //         "datestamp": "2020-01-24T20:33:32.384Z",
  //         "__v": 0
  //     }
  // ]}
  //display the 2 main currency
  for (let i = 0; i<2; i++){
      //define color as green
      let color = 'green';
      //change color if the currency rate is down
      if (res.data[i].change<0) color = 'red';
      //insert html of the main currency display
      document.getElementById(res.data[i].name).innerHTML =  `<span style="color: ${color};">₪${res.data[i].rate}</span>`;
    }
  //add the rest curnncy to the html dropdown currency table 
  for (let i = 2; i<res.data.length; i++){
    //define color as green
    let color ='green';
    //change color if the currency rate is down
    if (res.data[i].change<0) color = 'red';
    //add the currency to the html tble
    document.getElementById('currencyList').innerHTML +=  ` 
      <tr>
      <td class="right-align">${res.data[i].nameHeb}</td>
      <td class="right-align">${res.data[i].htmlIcon}</td>
      <td class="center-align" style="color: ${color}">₪${res.data[i].rate}</td>
      </tr>`;
  }
  //Crypto coins
  const currencyNames = {
    'BTC': ["ביטקוין",`<img src="./img/currency/bitcoin.png" height="28" width="32">`],
    'ETH': [`את'ריום`,`<img src="./img/currency/ethereum.png" height="28" width="32">`],
    'LTC': [`לייטקוין`,`<img src="./img/currency/litecoin.png" height="28" width="32">`]
  }
  const currencyName = Object.keys(currencyNames);
  //add the crypto curnncy to the html dropdown
  for (let i = 0; i<currencyName.length; i++){  
    /*the object is in format: 
    {
      base: 'BTC',
      target: 'USD',
      price: '9040.60409460',
      volume: '108272.58598317',
      change: '33.33339437'
    }
        */
  price.getCryptoPrice('USD', currencyName[i]).then(obj => {
    //define color as green
    let color ='green';    
    //change color if the currency rate is down
    if (obj.change<0) color = 'red';
    //add the currency to the html tble
    document.getElementById('currencyList').innerHTML +=  ` 
    <tr>
    <td class="right-align">${currencyNames[currencyName[i]][0]}</td>
    <td class="right-align">${currencyNames[currencyName[i]][1]}</td>
    <td class="center-align" style="color: ${color}">$${Math.round(obj.price).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
    </tr>`;

    }).catch(err => {
    console.log(err)
})

  }
    
  }catch(error) {
    console.log(error);
  };
}

