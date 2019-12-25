var hebrewDate = require("hebrew-date");

module.exports =  class DateFormat{
    constructor(enterDate){
        if (enterDate == undefined) {
            this.today = new Date();
        }else {
        this.today = enterDate;
        } 

        this.date = {
            years: {
                5779: `תשע"ט`,
                5780: `תש"ף`,
                5781: `תשפ"א`,
                5782: `תשפ"ב`,
                5783: `תשפ"ג`,
                5784: `תשפ"ד`,
                5785: `תשפ"ה`,
            },
            month: { 
                "Tishri":`תשרי`,
                "Heshvan": `חשוון` , 
                "Kislev": `כסלו`, 
                "Tevet": `טבת`, 
                "Shevat": `שבט`, 
                "AdarI": `אדר א׳`, 
                "AdarII": `אדר ב׳`, 
                "Nisan": `ניסן`, 
                "Iyyar": `אייר`, 
                "Sivan": `סיוון`, 
                "Tammuz": `תמוז`, 
                "Av": `אב`, 
                "Elul": `אלול`
            },
            days: {
                1:`א׳`,
                2:`ב׳`,
                3:`ג׳`,
                4:`ד`,
                5:`ה׳`,
                6:`ו׳`,
                7:`ז׳`,
                8:`ח׳`,
                9:`ט׳`,
                10:`י׳`,
                11:`י״א`,
                12:`י״ב`,
                13:`י״ג`,
                14:`י״ד`,
                15:`ט״ו`,
                16:`ט״ז`,
                17:`י״ז`,
                18:`י״ח`,
                19:`י״ט`,
                20:`כ׳`,
                21:`כ״א`,
                22:`כ״ב`,
                23:`כ״ג`,
                24:`כ״ד`,
                25:`כ״ה`,
                26:`כ״ו`,
                27:`כ״ז`,
                28:`כ״ח`,
                29:`כ״ט`,
                30:`ל׳`
            },
            dayNames: {
                0: "ראשון",
                1: "שני",
                2: "שלישי",
                3: "רביעי",
                4: "חמישי",
                5: "שישי",
                6: "שבת",
                
            },
            dayNamesComma: {
                0: "ראשון,",
                1: "שני,",
                2: "שלישי,",
                3: "רביעי,",
                4: "חמישי,",
                5: "שישי,",
                6: "שבת,",
                
            }
        }
    }

    getHebDate(){
        this.hebValu = hebrewDate(this.today);
        let year = this.date.years[this.hebValu.year];
        let month =  this.date.month[this.hebValu.month_name];
        let day = this.date.days[this.hebValu.date];
        let dayName = this.date.dayNamesComma[this.today.getDay()];
        return `${dayName} ${day} ${month} ${year}`;
    }

    getHebWeekDayName() {
        const weekDayName = [];
        this.hebValu = hebrewDate(this.today);
        for (let i=7,j=this.today.getDay(); i>0; i--){
            if (j>6){
                j=0;
            }
            weekDayName.push(this.date.dayNames[j])
            j++;
        }
        return weekDayName;
    }

    getEngDate(){
        let day = this.today.getDate();
        (day<10) ? day = "0" +day: "";
        let month = this.today.getMonth()+1;
        (month<10) ? month = "0" +month: "";
        const year = this.today.getFullYear();
        return `${day}.${month}.${year}`;
    }

    getEngDatewSlash(){
        let day = this.today.getDate();
        (day<10) ? day = "0" +day: "";
        let month = this.today.getMonth()+1;
        (month<10) ? month = "0" +month: "";
        const year = this.today.getFullYear();
        return `${day}/${month}/${year}`;
    }

    //send a date and return with the form with no add 1 to the month
    getEngDateFromOutSide(){
        let day = this.today.getDate();
        (day<10) ? day = "0" +day: "";
        let month = this.today.getMonth();
        (month<10) ? month = "0" +month: "";
        const year = this.today.getFullYear();
        return `${day}.${month}.${year}`;
    }

    getTime(){
        let hour = this.today.getHours();
        let month = this.today.getMinutes();
        (month<10) ? month = "0" +month: "";
        (hour<10) ? hour = "0" +hour: "";
        return `${hour}:${month}`;
    }

    getTimeNoColon(){
        let hour = this.today.getHours();
        let month = this.today.getMinutes();
        (month<10) ? month = "0" +month: "";
        (hour<10) ? hour = "0" +hour: "";
        return `${month} ${hour}`;
    }

    
/*
    flipHeb (word) {
        let newWord;
        console.log(word.length);
        for (let i= word.length;i>0;i--){
            console.log(word[i]);
            newWord =+ word[i];
        }
        return newWord;
    } */

}
