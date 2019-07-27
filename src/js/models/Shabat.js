const shabatData = require("../data/shabatdata");
var DateFormat = require('./DateFormats');

module.exports = class Shabat {
    constructor() {
    }


getParasha() {
    const returnValue = [];
    //get today date with no hours
    const object = new DateFormat();
    const today = object.getEngDate();
    const compare2 = today.split(`.`);
    const todayDate = new Date(compare2[2],compare2[1],compare2[0]);
    //const todayDate = new Date(2019,6,5);
       //console.log(todayDate);

    //array of the date key
    const dates = Object.keys(shabatData);
       
    //compare with shabat dates with todaty and return the next one
    dates.forEach(function(el) {
        let compare1 = el.split(`.`);
        let shabatDate = new Date(compare1[2],compare1[1],compare1[0]);

        if (shabatDate < todayDate ) {
        } else if (shabatDate >= todayDate) {
            returnValue.push(shabatDate)
        }
    })
    //return returnValue[0];
    
    let nextShabat = new DateFormat(returnValue[0]);
    let nextShabatDate = nextShabat.getEngDateFromOutSide();
    
    this.parasha = shabatData[nextShabatDate][3];
    this.startShabat = shabatData[nextShabatDate][0];
    this.stopShabat = shabatData[nextShabatDate][1];
}

   display() {
       document.getElementById("parasha").innerHTML =       
       `<span>פרשת השבוע: </span><spand>${this.parasha}</span><br>
         <span>כניסת שבת: </span><spand>${this.startShabat}</span><br>
         <span>צאת שבת: </span><spand>${this.stopShabat}</span>`
   }

}