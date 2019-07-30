//detect the browser
function detectBrowser () {
    const homepagecontent = document.getElementById("homepagecontent");
    homepagecontent.innerHTML = '';
    if(/*@cc_on!@*/false || typeof ScriptEngineMajorVersion === "function")
  {//You are using IE >= 4 (unreliable for IE11!!!)
    homepagecontent.innerHTML = `
    <h4 class="teal-text" >הפוך את MyHomey לדף הבית</h4>
    <div class="divider"></div>
    <h5> נשמח לעזור לך להפוך את  Homy לדף הבית בשלושה צעדים פשוטים:</h5><br>
    <br>
      <div >
        <span class="homenumber">1 &nbsp&nbsp</span><span class="hometext">הקלק על הסמל  &nbsp </span><span> <img src="./img/trurntohomepage/explorer/icon.png" ></span><span class="hometext"> &nbsp בסרגל הכלים העליון של הדפדפן.</span><br><br>
        <span class="homenumber">2 &nbsp&nbsp</span><span class="hometext">בחר "באפשרויות אינטרנט (internet options)".</span><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <a class="teal-text" id="openpic" href="#" data-number="1">לחץ להצגת תמונה</a> <img class="materialboxed" id="pic1" src="./img/trurntohomepage/explorer/internetoptions .png" width="1" ></span><br>
        <span class="homenumber">3 &nbsp&nbsp</span><span class="hometext">והקלד בשדה את כתובת האתר: www.MyHomey.co.il ולחץ על ״אישור (ok)".</span><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span> <a class="teal-text" id="openpic" href="#" data-number="2">לחץ להצגת תמונה</a> <img class="materialboxed" id="pic2" src="./img/trurntohomepage/explorer/ok.png" width="1" ></span><br>
      </div>
        <div class="row">
          <br><br><br><br><br>
          <div class="col s1"></div>
          <div class="col s1"><a href="#!" class="waves-effect modal-close waves-light btn">הבנתי</a></div>    
      </div>
      </div>`
      return("IE");
    }else if(window.chrome){
    //You are using Chrome or Chromium
    homepagecontent.innerHTML = `
    <h4 class="teal-text" >הפוך את MyHomey לדף הבית</h4>
    <div class="divider"></div>
    <h5> נשמח לעזור לך להפוך את  Homy לדף הבית בשלושה צעדים פשוטים:</h5><br>
      <div >
        <span class="homenumber">1 &nbsp&nbsp</span><span class="hometext">הקלק על הסמל  &nbsp </span><span> <img src="./img/trurntohomepage/google-menu-icon.png" ></span><span class="hometext"> &nbsp בסרגל הכלים העליון של הדפדפן.</span><br><br>
        <span class="homenumber">2 &nbsp&nbsp</span><span class="hometext">בחר "הגדרות (Settings)".</span><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <a class="teal-text" id="openpic" href="#" data-number="1">לחץ להצגת תמונה</a> <img class="materialboxed" id="pic1" src="./img/trurntohomepage/chrome/setting.png" width="1" ></span><br>
        <span class="homenumber">3 &nbsp&nbsp</span><span class="hometext">תחת "מראה (Appearance)" סמן את "הצג לחצן דף בית (Show Home button)".</span><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span> <a class="teal-text" id="openpic" href="#" data-number="2">לחץ להצגת תמונה</a> <img class="materialboxed" id="pic2" src="./img/trurntohomepage/chrome/appearance.png" width="1" ></span><br>
        <span class="homenumber">4 &nbsp&nbsp</span><span class="hometext">לחץ על "שנה (Change)" והקלד בשדה את כתובת האתר: www.MyHomey.co.il</span><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>  <a class="teal-text" id="openpic" href="#" data-number="3">לחץ להצגת תמונה</a> <img class="materialboxed" id="pic3" src="./img/trurntohomepage/chrome/homepage.png" width="1" ></span><br><br>
        <span class="homenumber">&nbsp&nbsp</span><span class="hometext">לנוחיותך יתווסף הכפתור  &nbsp </span><span> <img src="./img/trurntohomepage/chrome/button.jpg" ></span><span class="hometext"> &nbsp בסרגל הכלים העליון של הדפדפן.</span><br><br>
      </div>
        <div class="row">
          <br><br>
          <div class="col s1"></div>
          <div class="col s1"><a href="#!" class="waves-effect modal-close waves-light btn">הבנתי</a></div>    
      </div>`

    return("Crome");
  }else if(window.opera){
    //You are using Opera >= 9.2
    return("Opera");
  }else if('MozBoxSizing' in document.body.style){
    //You are using Firefox or Firefox based >= 3.2
    homepagecontent.innerHTML = `
    <h4 class="teal-text" >הפוך את MyHomey לדף הבית</h4>
    <div class="divider"></div>
    
      <h5> נשמח לעזור לך להפוך את  Homy לדף הבית בחמישה צעדים פשוטים:</h5><br>
      <div >
        <span class="homenumber">1 &nbsp&nbsp</span><span class="hometext">הקלק על הסמל  &nbsp </span><span> <img src="./img/trurntohomepage/firefox/icon.png" ></span><span class="hometext"> &nbsp בסרגל הכלים העליון של הדפדפן.</span><br><br>
        <span class="homenumber">2 &nbsp&nbsp</span><span class="hometext">בחר "העדפות (Preferences)".</span><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <a class="teal-text" id="openpic" href="#" data-number="1">לחץ להצגת תמונה</a> <img class="materialboxed" id="pic1" src="./img/trurntohomepage/firefox/Preferences.png" width="1" ></span><br>
        <span class="homenumber">3 &nbsp&nbsp</span><span class="hometext">לחץ על "בית (Hoem)".</span><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span> <a class="teal-text" id="openpic" href="#" data-number="2">לחץ להצגת תמונה</a> <img class="materialboxed" id="pic2" src="./img/trurntohomepage/firefox/home.png" width="1" ></span><br>
        <span class="homenumber">4 &nbsp&nbsp</span><span class="hometext">לחץ על התפריט ליד ״דף הבית וחלונות חדשים (Homepage and new windows)</span><span class="hometext">ובחר ״כתובות מותאמות אישית (Custom URLs)" </span></span> <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>  <a class="teal-text" id="openpic" href="#" data-number="3">לחץ להצגת תמונה</a> <img class="materialboxed" id="pic3" src="./img/trurntohomepage/firefox/homepage.png" width="1" ></span><br><br>
        <span class="homenumber">5 &nbsp&nbsp</span><span class="hometext">לחץ על "שנה (Change)" והקלד בשדה את כתובת האתר: www.MyHomey.co.il</span><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>  <a class="teal-text" id="openpic" href="#" data-number="3">לחץ להצגת תמונה</a> <img class="materialboxed" id="pic3" src="./img/trurntohomepage/firefox/url.png" width="1" ></span>
      </div>
        <div class="row">
          <br><br>
          <div class="col s1"></div>
          <div class="col s1"><a href="#!" class="waves-effect modal-close waves-light btn">הבנתי</a></div>    
      </div>
    `
    return("Firefox");
  }else if(navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
  navigator.userAgent &&
  navigator.userAgent.indexOf('CriOS') == -1 &&
  navigator.userAgent.indexOf('FxiOS') == -1){
    //You are using Safari >= 3.1
    homepagecontent.innerHTML =`
    <h4 class="teal-text" >הפוך את MyHomey לדף הבית</h4>
    <div class="divider"></div>
   
      <h5> נשמח לעזור לך להפוך את  Homy לדף הבית בשלושה צעדים פשוטים:</h5><br>
      <div >
        <span class="homenumber">1 &nbsp&nbsp</span><span class="hometext"> הקלק על safari </span><span class="hometext"> בסרגל הכלים העליון.</span><br><br>
        <span class="homenumber">2 &nbsp&nbsp</span><span class="hometext">בחר "העדפות (preferences)".</span><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <a class="teal-text" id="openpic" href="#" data-number="1">לחץ להצגת תמונה</a> <img class="materialboxed" id="pic1" src="./img/trurntohomepage/safari/setting.png" width="1" ></span><br>
        <span class="homenumber">3 &nbsp&nbsp</span><span class="hometext">בשורת ״עמוד הבית״ לחצו על ״השתמש בעמוד נוכחי (set to current page)״.</span><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span> <a class="teal-text" id="openpic" href="#" data-number="2">לחץ להצגת תמונה</a> <img class="materialboxed" id="pic2" src="./img/trurntohomepage/safari/general.png" width="1" ></span><br>
        
      </div>
        <div class="row">
          <br><br><br><br><br><br><br>
          <div class="col s1"></div>
          <div class="col s1"><a href="#!" class="waves-effect modal-close waves-light btn">הבנתי</a></div>    
      </div>`
    return("Safari");    
  }else{
      //Unknown
  }}



module.exports = {detectBrowser}