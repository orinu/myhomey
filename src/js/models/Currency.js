const axios = require('axios');

  
module.exports =  class Currency {
        constructor(CurrencyNum) {
            this.num = CurrencyNum;
        }

        //Bank of israel
        async getResults() {
          const url = `http://myhomey.co.il/currency?curnum=${this.num}`;

          try {
            let res = await axios.get(`${url}`);  
            this.rate = res.data.rate;
            this.name = res.data.name;
            this.change = res.data.change;
                  
        } catch(error) {
            console.log(error);
        };
    }

    displayCurrency(name) {
        if (this.change>0) {
            document.getElementById(name).innerHTML =  `<span style="color: green;">₪${this.rate}</span>`;
          } else {
            document.getElementById(name).innerHTML =  `<span style="color: red;">₪${this.rate}</span>`;
          }
    }
    
}