const shabatData = require("../data/shabatdata");
var DateFormat = require("./DateFormats");

module.exports = class Shabat {
  constructor() {}

  getParasha() {
    const returnValue = [];
    //get today date with no hours (cant compare date with hours and date without)
    const object = new DateFormat();
    const today = object.getEngDate();
    const compare2 = today.split(`.`);
    const todayDate = new Date(compare2[2], compare2[1] - 1, compare2[0]);

    //array of the date key
    const dates = Object.keys(shabatData);

    //compare shabat dates with todaty and return the next shabat
    dates.forEach(function (el) {
      let compare1 = el.split(`/`);
      let shabatDate = new Date(compare1[2], compare1[1] - 1, compare1[0]);
      //if the the shabat date are grater then today push them to an array
      if (Date.parse(shabatDate) > Date.parse(todayDate)) {
        returnValue.push(shabatDate);
      }
    });

    //take the first date of the array
    let nextShabat = new DateFormat(returnValue[0]);
    //return the israel format with slash
    let nextShabatDate = nextShabat.getEngDatewSlash();

    //add the value to parasha object from the data
    console.log(shabatData);
    this.parasha = shabatData[nextShabatDate][3];
    this.startShabat = shabatData[nextShabatDate][0];
    this.stopShabat = shabatData[nextShabatDate][1];
  }

  display() {
    if (this.parasha === undefined) {
      document.getElementById("parasha").innerHTML = "";
    } else {
      document.getElementById(
        "parasha"
      ).innerHTML = `<span>פרשת השבוע: </span><spand>${this.parasha}</span><br>
         <span>כניסת שבת: </span><spand>${this.startShabat}</span><br>
         <span>צאת שבת: </span><spand>${this.stopShabat}</span>`;
    }
  }
};
