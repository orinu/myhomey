const axios = require('axios');
var dataObj =  require("../../data/data");
import {deleteFromMenu} from '../../data/fetchdata';

var data = dataObj.default;

class Newlink {
    constructor(url) {
        this.urlName(url);
        this.getFavicon();
        if (this.name.length>7){
            this.cutName = this.name.substring(0,7);
        }else {this.cutName = this.name; }
    }

    urlName(url){
        console.log(url);
        const checkWww = new RegExp('^www.', 'i');
        const checkHttp = new RegExp('^http://', 'i');
        const checkHttps = new RegExp('^https://', 'i');
        if (checkWww.test(url)) {
            this.urlForPic = url;
            this.urlForHerf = 'http://'+ url.substring(4);
            this.name = url.substring(4).substring(0,url.substring(4).indexOf("."));

        }else if (checkHttp.test(url)) { 
            if (checkWww.test(url.substring(7))) {
                this.urlForPic = url.substring(7);
                this.urlForHerf = 'http://'+ url.substring(11);
                this.name = url.substring(11).substring(0,url.substring(11).indexOf("."));
        
            }else {
                this.urlForPic = 'www.'+url.substring(7);
                this.urlForHerf = url;
                this.name = url.substring(7).substring(0,url.substring(7).indexOf("."));
                 }
             }else if (checkHttps.test(url)) { 
                 if (checkWww.test(url.substring(8))) {
                     this.urlForPic = url.substring(8);
                     this.urlForHerf = 'http://'+ url.substring(12);
                     this.name = url.substring(12).substring(0,url.substring(12).indexOf("."));
                
                 }else {
                     this.urlForPic = 'www.'+url.substring(8);
                     this.urlForHerf = url;
                     this.name = url.substring(8).substring(0,url.substring(8).indexOf("."));
             }
                 }else {
                 this.urlForPic = 'www.' + url;
                 this.urlForHerf = 'http://'+ url;
                 this.name = url.substring(0,url.indexOf("."));
              }
}

    async getFaviconPromise() {
        const http = `http://s2.googleusercontent.com/s2/favicons?domain_url=http://${this.urlForPic}`
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        
        return axios.get(`${proxy}${http}`, { responseType: 'arraybuffer' })
        .then(response => `data:${response.headers['content-type']};base64,${btoa(String.fromCharCode(...new Uint8Array(response.data)))}`);
      }
      
      getFavicon() {
        this.getFaviconPromise().then((value) => { 
            this.pic = value;
        }).then(() => this.appendLink()).then(() => this.dispaly()).then(() => deleteFromMenu()).then(()=>this.scrollDown());
      }
    
      appendLink() {
          this.lastDataPosition = Object.keys(data.links.menu).length-1;
          data.links.menu[this.lastDataPosition] = [this.urlForHerf, this.pic, this.name , this.cutName , -1];
          localStorage.setItem('data', JSON.stringify(data));
          
      }

      dispaly() {
          const menu = document.getElementById("menu").innerHTML;
          let li= `
               <li class="box responsive-img waves-effect waves-light link" data-position="${this.lastDataPosition}" data-idNumber="-1" data-keyMenu="${this.lastDataPosition}" links>
               <a id="link" href="${this.urlForHerf}" target="_blank">
               <img class="responsive-img waves-effect waves-light" src="${this.pic}" draggable="true" style="height: 20px;width: 20px;"><span class="name-add" style="font-weight: bold; color: black;">${this.cutName}</span>
               <button class="waves-effect waves-light floating delete-btn add"><i draggable="true" class="tiny material-icons">cancel</i></button>
               </li></a>`
           document.getElementById("menu").innerHTML += li;
      }
      scrollDown() {
        $('.box-container.displaymenu').scrollTop($('.box-container').height());
      }

}

export default Newlink;
