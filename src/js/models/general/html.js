const contactModal = `
<form class="col s12 contact-form">
        <div class="row">
          <div class="input-field col s6">
              <input placeholder="&emsp;&emsp;&emsp;&emsp;0543332323" id="phone" type="text" class="validate" required>
              <label for="phone">טלפון</label>
          </div>
          <div class="input-field col s6">
              <input placeholder="&emsp;&emsp;&emsp;&emsp;ישראל ישראלי" id="name" type="text" class="validate" required>
              <label for="name">שם מלא</label>
          </div>
        </div>
        <div class="row">
            <div class="input-field col s6">
            </div>
            <div class="input-field col s6">
                <input placeholder="&emsp;&emsp;&emsp;&emsp;gmail@gmail.com" id="email" type="email" class="validate" required>
                <label for="email">אימיל</label>
            </div>
          </div>
          <div class="row">
              <div class="input-field col s12">
                <textarea id="textarea" class="materialize-textarea" data-length="250"></textarea required>
                <label for="textarea">אנא הקלד את פנייתך</label>
              </div>
              <br><br> <br><br> 
              <div class="row"></div>
              <div class="row"></div>
              <div class="row">
               <div class="col s1"></div>
               <div class="col s1">
                  <button class="btn waves-effect waves-light" type="submit" name="action">שלח <i class="material-icons left">send</i></button>
                </div>
              </div>
          </form>`

module.exports = { 
    contactModal
}