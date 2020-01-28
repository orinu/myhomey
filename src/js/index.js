let $ = require('jquery');
const axios = require('axios');
import 'jquery-ui-bundle';
import 'materialize-css/dist/css/materialize.css';
import './materialize/materialize.min.js';
import "./data/updatedata";

import './test';

import data from "./data/data";

import * as fetch from "./data/fetchdata";

import * as currency from './models/Currency';


var DateFormat = require('./models/DateFormats');
var Weather = require('./models/Weather');
var Shabat = require('./models/Shabat');
var {detectBrowser} = require('./models/general/browserAdustment');
var {contactModal} = require('./models/general/html');
import Newlink from './models/general/Newlink';




//inner html data for making homepage
detectBrowser();

//update currency and run timer
currency.getCurrencyValues();
window.setInterval(function(){ 
  currency.getCurrencyValues();
  console.log('now')
}, 15*60*1000);  //every 15 min

//First update date and clock
let now = new DateFormat()
const heb = now.getHebDate();
const eng = now.getEngDate();
const time = now.getTime();
document.getElementById("hebdate").innerHTML = heb;
document.getElementById("engdate").innerHTML = eng;
document.getElementById("time").innerHTML = time;
  

//update date timer
window.setInterval(function(){
  let now = new DateFormat()
  const heb = now.getHebDate();
  const eng = now.getEngDate();

  document.getElementById("hebdate").innerHTML = heb;
  document.getElementById("engdate").innerHTML = eng;
}, 1000);

//update clock timer
window.setInterval(function(){
  let now = new DateFormat()
  const time = now.getTime();
  document.getElementById("time").innerHTML = time;
  setTimeout(function(){
    document.getElementById("time").innerHTML = now.getTimeNoColon();  
  }, 500); 
}, 1000);

//First Update whether
async function weather() {
  const weather = new Weather();
  //check if there cookies saved
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)country\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  //just if no location data call the api
  if (!cookieValue){
    await weather.user();
  }
  await weather.getWeather();
  weather.displayWeather()
}

weather();

//First update shabat
function shabat() {
  const shabat = new Shabat();
  shabat.getParasha();
  shabat.display();
}
shabat();


//get from the server unique id and count up the uniqueVisitor
async function uniqueUsersCookies() {
  //define UUC cookie
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)UUC\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  //cheak if exist
  if (!cookieValue){
    console.log('no cookie')
  //call the server to count up the unique user and get the id
  const url = `http://myhomey.co.il/countUniqueUser`;
  try {
    let res = await axios.get(`${url}`);  
    console.log(res.data)
    //insert the UUC cookie value
    document.cookie = `UUC=${res.data}`
} catch(error) {
    console.log(error);
};
}}
uniqueUsersCookies();


$(function() { 

  //Nav dropdown
  $(".dropdown-trigger").dropdown({coverTrigger: false , hover: true})
  $(".dropdown-trigger.currency").dropdown({coverTrigger: false , hover: true, constrainWidth:true})
  $(".dropdown-trigger.ddhover").dropdown({coverTrigger: false , hover: true , constrainWidth: false})
  
 
  $('.modal').modal();
  $('.materialboxed').materialbox();
  $('.tooltipped').tooltip()
  $('input#input_text, textarea#textarea').characterCounter();

  $(document).on('click', '#contact-btn', function(){
    $('input#input_text, textarea#textarea').characterCounter();
});

  //make home page - modal - open pic
  $(document).on('click', '#openpic', function() {
    console.log(  $(this).attr("data-number"));
    const picName = '#pic'+$(this).attr("data-number");
    $(picName).materialbox('open');
    
  });


//Radio button
$(".radio").click(function() {
  //clear the checked
  $("input:radio").attr("checked", false);
  //checked on div click
  $(this).children().attr("checked", true);
    // -- console.log($(this).children());
  //set the input text as the radio button
  $("#searchfield").attr("placeholder",`חיפוש ב${$(this).children().attr("value")}`);
  const radioValue = $(this).children().attr("value");
  //set the field of url
  $(".searchform").attr("action", $(this).children().attr("data-ac"));
  //change the name attr if wiki to get "https://he.wikipedia.org/w/index.php?/search=query
  if (radioValue == "ויקיפדיה"){
    $(".sitesearch").attr("name" , "");
    $(".form-control").attr("name", "search");
  //change the name attr if google,youtube or pin to get https://www.google.com/search?sitesearch=&q=
  } else if (radioValue == "גוגל" || radioValue == "יוטיוב" || radioValue == "פינטרסט") {
    $(".sitesearch").attr("name" , "sitesearch");
    $(".form-control").attr("name", "q");
  // google photo not work so if radio on and click prevent, get the value, open link, unbing.
  }else if (radioValue == "תמונות" ) {
    $(".search-btn").click(function(e) {
      e.preventDefault();
      var searchString  = $("#searchfield").val()
      window.open(`https://www.google.com/search?tbm=isch&q=${searchString}`, '_blank'); 
      $(this).unbind('click').trigger('click')
    })
  }
})


//show and invis the delete button when hover
$(document).on('mouseover', '.box', function() {
  $(this).children().children().closest( "button" ).css("visibility" ,'visible');
});
$(document).on('mouseout', '.box', function() {
  $(this).children().children().closest( "button" ).css("visibility" ,'hidden');
});


    //bottun up appear 150 scroling. 
    $(window).scroll(function() {
      var height = $(window).scrollTop();
      if(height  < 100) {
        $(".sticky").hide();}
      else{
        $(".sticky").show();}
        });

    $('#div-frame').scroll(function(){
      console.log(1);
      console.log($('#div-frame').scrollTop());
    })


    //move button
    $( ".divbutton" ).on("mouseenter", function() {
      $(this).find('.data-movebtn').show();})
      .on("mouseleave", function() {
      $(this).find('.data-movebtn').hide();});
       
      
  //CHANGE MENU MENU
  //Fetch data when click on change button
  $("#changeMenu").click(function() {
    //Fech the data on the two menus
    fetch.addToMenu();
    fetch.deleteFromMenu();
  })

  //ADD 
  //handlar Add in the menu menu clicked
  $(document).on('click', '#addToMenu', function(){
    const that = $(this);
    addItemMenuMenu(that);
});

//function to add
function addItemMenuMenu(thisObj) {
      //the number of links in menu
      const last = Object.keys(data.links.menu).length-2;
      //get the data of the add link
      // console.log($(this));
      const idNumber = $(thisObj).attr('data-idNumber');
      const key = $(".link[data-idNumber="+idNumber+"]").attr("data-position");
      const contaienr = $(".link[data-idNumber="+idNumber+"]").parent().attr("id");
      //change the object
      data.links.menu[parseInt(last)+1] = data.links[contaienr][key];
      //save the data
      localStorage.setItem('data', JSON.stringify(data));
      //remove ui
      $(thisObj).parent().parent().remove();
      //fetch the deleteFromMenu ui
      fetch.deleteFromMenu();
      //fetch the menu in the main page
      fetch.fetchMenu();
}

    //REMOVE
//handlar remove in the menu menu clicked
$(document).on('click', '#removeFromMenu', function(){
    const that = $(this);
    removeItemMenuMenu(that);
});

function removeItemMenuMenu(thisObj) {
    //get the data position of the deleted link
    const positionData = $(thisObj).attr('data-keyMenu');
    //the number of links after deleting
    const last = Object.keys(data.links.menu).length-2;
    //run on the object and change the data
    for (var i=positionData; i<=last; i++) {
      data.links.menu[i] = data.links.menu[parseInt(i)+1];
    }
    //delete the last row
    delete data.links.menu[last];
    // console.log(data.links.menu)
    //update ui
    fetch.deleteFromMenu();
    //fetch the menu ui
    fetch.addToMenu();
    //save the data
    localStorage.setItem('data', JSON.stringify(data));
    //update the links in the main menu 
    fetch.fetchMenu();
}




//MenuMenu d&d
//drag From add to menu
$(".menumenu").sortable({
  connectWith:"#displaymenu",
  
  receive: function (event, ui) {
      // console.log('receive');
      // console.log(ui.item.find("tr").hasClass("title-menu"));
    //remove the option of sortable titles
    if (ui.item.find("tr").hasClass("title-menu")) {
      $(".menumenu").sortable("cancel");
    }

    //array to save the menu-keys
    let menuLinks = [];
    //avoid aliasing 
    var menuObj = jQuery.extend({}, data.links.menu);
    //get the data of the ui that trasformed
    const keyNum = ui.item.find("a").attr("data-key");
    const contaienr = ui.item.find("a").attr("data-container");
    
    $("#displaymenu").find("a").each(function(index) {
      //array of the menu-key
      menuLinks.push($(this).attr("data-keyMenu"));
    })
    //run on the array find the undefined(the trasformed ui)
    for (var i = 0;i<menuLinks.length-1;i++) {
      if (menuLinks[i] === undefined) {
        //if found save in data object
        data.links.menu[i] =  data.links[contaienr][keyNum];
        for (var j = i; j<menuLinks.length-1; j++) {
          //init the number of the key-menu in the data after
          data.links.menu[j+1]= menuObj[j];
        }
      }
    }
    //display new ui
    fetch.deleteFromMenu();
    //save the data
    localStorage.setItem('data', JSON.stringify(data));
    //fetch the menu in the main page
    fetch.fetchMenu();
  }
})

//Change position in menu
$("#displaymenu").sortable({
  stop: function (event, ui) {
    console.log('stop');
    let keyBefore, keyAfter;
    //avid aliasing
    var menuObj = jQuery.extend({}, data.links.menu);
    //check for each item in the menu if there are differences between position  after and before
    ui.item.parent().find("a").each(function(index) {
      keyBefore = $(this).attr("data-keyMenu");
      //change the attr
      $(this).attr("data-keyMenu", index);
      keyAfter = $(this).attr("data-keyMenu");
      //check if diffrences
      if (keyBefore !== keyAfter) {
        // change the position data 
        data.links.menu[index] = menuObj[keyBefore];
      }
    })
    //save the data
    localStorage.setItem('data', JSON.stringify(data));
    //update the links in the main menu 
    fetch.fetchMenu();
  }
})

//user add external link
//press button
$(document).on('submit','.add-link-form',function(e){
  e.preventDefault();
  new Newlink($('#add-link').val());
  $('.add-link-form').trigger("reset");
});

//submit contact form
$(document).on('submit','.contact-form',function(e){
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const text = document.getElementById("textarea").value;

  //http://localhost:3150
  axios.post('/contact' , {
    name,
    phone,
    email,
    text
  })
  document.getElementById("contact-content").innerHTML = 
  `
  <br><br><br>
  <div>
  <h5><p>פנייתך התקבלה, תודה.</p></h5>
  <div class="row">
          <br><br><br><br><br><br><br><br>
          <div class="col s1"></div>
          <div class="col s1"><a href="#!" class="waves-effect modal-close waves-light btn">תודה</a></div>    
      </div>
  </div>
  `;
});

//return the html value of the cotact modal whem modal close
$(".modal.contact").modal({onOpenStart: getContactHtml});

function getContactHtml ()  {
  document.getElementById("contact-content").innerHTML = contactModal;
}




//Drag&drop links main web
    $(".link-list").sortable({
      connectWith:"#menu",
      dropOnEmpty: true,
      distance: 9,

      
      remove: function (event, ui) {
        console.log('remove')
        //duplicate the trasformed data
        ui.item.clone().insertAfter(ui.item);
        $(this).sortable('cancel');
        //array to save the menu-keys
        let menuLinks = [];
        //copy the data avoid aliasing 
        var menuObj = jQuery.extend({}, data.links.menu);
        //push the data-keyMenu to menuLinks
        $("#menu").find("li").each(function() {
          menuLinks.push($(this).attr("data-keyMenu"));
        })
        //get the data-position of the transfer item
        const keyNumber = ui.item.attr("data-position");
        //get the the container name of the transfer item
        const contaienr = $(this).attr('id');
        //run on the array find the undefined(the trasformed ui)
         for (var i = 0;i<menuLinks.length;i++) {
          if (menuLinks[i] === undefined) {
            //if found save in data object
                 //console.log(`${i} is undefind change with ${data.links[contaienr][keyNumber]} `)
            data.links.menu[i] = data.links[contaienr][keyNumber];
            for (var j = i; j<menuLinks.length-1; j++) {
              //init the number of the key-menu in the data after
              data.links.menu[j+1]= menuObj[j];
            }
          }
        }
        //make the delete button of the item "hidden"
        $( "button:visible#delete-btn").css("visibility", "hidden");

        //update the data-keyMenu
        //If not fetch data need to init the key neumber above

        // $("#menu").find("li").each(function(i) {
        //   $(this).attr("data-keyMenu",i);
        // })
        fetch.fetchMenu();
       
    

    },
      //Update event
      stop: function(event, ui){
        
        console.log('stop ');
        let newOrder = [];  //puse the new order of the links in NewOrder.
        $(this).children().each(function(index){
          //push the new order
          newOrder.push($(this).attr("data-position"));
          //init the order
          $(this).attr("data-position", index);
      
        });
        let containerName = $(this).attr("container-name");
        //make a copy object with the new order and get data from the original
        let newObject = {};
        for (let i=0; i<newOrder.length; i++){
          //*//console.log(data.menu[newOrder[i]]);
          newObject[i] = data.links[containerName][newOrder[i]];
        }
        const name = Object.keys(newObject).length +1;
        newObject.name = data.links[containerName].name;
        //console.log(Object.keys(newObject).length);
        //save the data
        data.links[containerName] = newObject;
        localStorage.setItem('data', JSON.stringify(data));
  
      }

    });


  //Delete item
  $(document).on("click", '.delete-btn' , function(e) {
  e.preventDefault();
  //get the container name
  const contaienr = $(this).parent().parent().parent().attr('id');

  //get the data position of the deleted link
  const position = $(this).parent().parent().attr("data-position");
  //the number of links after deleting
  const last = Object.keys(data.links[contaienr]).length-2;
  
 //from the deleted item up to the last el
  for (var i=position; i<=last; i++) {
    // change the data in the primary object
    data.links[contaienr][i] = data.links[contaienr][parseInt(i)+1];
    // countdown keymenu and potion of the item in the menu
    $("[data-keymenu="+i+"]").attr("data-keymenu", parseInt(i)-1)
    $("[data-position="+i+"]").attr("data-position", parseInt(i)-1)
  }
  //delete the last row
  delete data.links[contaienr][last];
  //save the data
  localStorage.setItem('data', JSON.stringify(data));
  //delete the UI link
  $(this).parent().parent().remove();
});


  
    //Drag&drop containers
    $(".divbutton").parent().sortable({
      update: function(event, ui){
        //object for the order and the contaienrs names
        let newOrder = {};
        
        $(this).children().each(function(index){
          //insert data
          newOrder[index] = $(this).attr("data-name");
          //init the order
          $(this).attr("data-containerposition", index);
          
        });
        let newObject = {};

        for(var key in newOrder) {
          //get the value in newOrder
          let value = newOrder[key]
          //insert to temp object the original links
          newObject[value] = data.links[value];
        }

        //Save the data
        data.links = newObject;
        localStorage.setItem('data', JSON.stringify(data));  
      }
    });

/*
    //first time , open modal
    if (data.user.firstTime === 'yes') {
      $("#first-time-button")[0].click();
    }  */

});

 