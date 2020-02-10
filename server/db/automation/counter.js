require('../mongoose')
const Counter = require('../models/counter');


//Get day before yestarday date
let beforeYesterday = new Date();
beforeYesterday.setDate( beforeYesterday.getDate()-2 );

//Get date of last week
let lastWeek = new Date();
lastWeek.setDate( beforeYesterday.getDate()-8 );

//Open new row in the DB and save the data
async function insertNewDayCounterDb() {
    const date = new Date();
    console.log(date);

    const newRow = new Counter({
        name: 'daily',
        name: 'daily',
        date: date,
        daily: await getLastDayVisitors(),
        monthly: await sumMonth(),
        totalVisitors: await getTotalVisitors()
    })

    newRow.save().then(() => {
      console.log("Daily counter record update sucssefully"  ,'\n' ,"The new record:",'\n', newRow);
    }).catch((error) => {
      console.log(error);
})
}

//get the delta visitor between the total visitor to last record 
async function getLastDayVisitors() {
    const today = new Date();
    console.log(today)
    console.log(lastWeek)

    //get the last week records
    const result1 = await Counter.find({date: {$gte: lastWeek, $lt:today }});
        // console.log(result1)

    //run on the array and get pointer of the newest record
    let pointer=0;
    let date= new Date(0);
    for (let i=0; i<result1.length; i++) {
        if (result1[i].date>date){
            date=result1[i].date;
            pointer=i; 
        }
    }
    //get the totalVisitor of newest record
    const TotalVisitorYesterday = result1[pointer].totalVisitors;
   
    //get the totalVisitors in general
    const result2 = await Counter.find({name: 'general'})
    const TotalVisitorOverAll = result2[0].totalVisitors;

    //return the delta
    return ( TotalVisitorOverAll-TotalVisitorYesterday);
}

//Count the mounly visitors
async function sumMonth() {
    const today = new Date();

    //FIRST OF THE MOUNTH
    //reset the mounthly coounter if is the first of the month
    if (today.getDate() == 1) return 0;

    //NOT THE FIRST OF THE MOUNTH
    //get the delta visitor between the total visitor to last record 
    const todayTotalVisitor = await getLastDayVisitors();
    //query - get the "monthly" of the last record
    const result1 = await Counter.find({date: {$gte: lastWeek, $lt:today }})

     //run on the array and get pointer of the newest record
     let pointer=0;
     let date= new Date(0);
     for (let i=0; i<result1.length; i++) {
         if (result1[i].date>date){
             date=result1[i].date;
             pointer=i; 
         }
     }
     //get the totalVisitor of newest record of the new pointer
     const monthlyYesterday = result1[pointer].monthly;

    if (monthlyYesterday == NaN) {
        monthlyYesterday = 0;
    }
    //get today total visitor
    return todayTotalVisitor + monthlyYesterday;
}

async function getTotalVisitors() {
    const res = await Counter.find({name: 'general'});
    console.log(res[0].totalVisitors);
    return res[0].totalVisitors;
    
}

//LOCALY CHECK
// insertNewDayCounterDb().then(r => console.log(r));
// getLastDayVisitors().then((r => console.log(r)))
// sumMonth().then((r => console.log(r)))

module.exports = insertNewDayCounterDb;