var fs = require('fs');
var path = require('path')

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

function counter() {
    const count = data.totalCount+1;
    data.totalCount = count;
    saveData()
}

function getTotalCounter() {
    return data.totalCount;
}

module.exports = {counter, getTotalCounter}