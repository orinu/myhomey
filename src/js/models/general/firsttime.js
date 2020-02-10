import { Dropdown } from "materialize-css";

//When the modal is open send 1 to FirstTimeModal
$(".modal.firsttime").modal({onOpenStart: firstTimeModal(1)});

//main function - edit the html of the modal
function firstTimeModal (pageNumber)  {
//define the titles and the gif path
const objnumber = {
  1: ['<span class="hometext">בהעברת עכבר ניתן לצפות בתחזית שבועית, שערי מטבעות, ערוצי טלוויזיה וערוצי רדיו:</span><br><br>','<img src ="./img/first-time/dorpdown.gif" alt="animate"  height="60%" width="90%" />'],
  2: ['<span class="hometext">בלחיצת כפתור ניתן לחפש בגוגל, יוטיוב, גוגל תמונות, וקיפדיה ופינטרסט:</span><br><br>  ' , '<img src ="./img/first-time/search.gif" alt="animate"  height="60%" width="70%" />'],
  3: ['<span class="hometext">ניתן לשנות את סדר הקישורים בתפריט הראשי ואת סדר התפריטים  עי״ גרירה. הנתונים ישמרו גם ללא הרשמה:</span><br><br>  ' , '<img src ="./img/first-time/transfer.gif" alt="animate" height="60%" width="60%"/>'],
  4: ['<span class="hometext">הוספה והסרת קישורים בקלות ובנוחות דרך ״ערוך תפריט אישי״:</span><br><br>  ' , '<img src ="./img/first-time/menumenu.gif" alt="animate"  height="60%" width="70%" />']
}
  //if the pageNumber is 5 close the modal
  if (pageNumber>Object.keys(objnumber).length) {
    $(".modal.firsttime").modal('close');
  }
  //change the previous color to grey and the data-mark from yes to '' 
  $(".first-time-page[data-marked=yes]").children().css('color', '#78909c');
  $(".first-time-page[data-marked=yes]").attr('data-marked', '');
  //change the pageNumber color to blue and the data-mark to yes
  $(".first-time-page[data-page="+pageNumber+"]").children().css('color', '#283593');
  $(".first-time-page[data-page="+pageNumber+"]").attr('data-marked', 'yes');
  //locate sub-title of the modal
  let subHtml = document.getElementById("first-time-sub-title");
  //locate gif of the modal
  let gifHtml = document.getElementById("first-time-gif");
  //inset the sub html
  subHtml.innerHTML =objnumber[pageNumber][0];
  //inset the gif html
  gifHtml.innerHTML =objnumber[pageNumber][1];
}

//handler - click on one of the circle
$(document).on("click", '.first-time-page' , function(e) {
  e.preventDefault();
  const dataPage =  $(this).attr("data-page");
  firstTimeModal(dataPage)
})


//handler - click on next btn
$(document).on("click", '.next.first-page' , function(e) {
  e.preventDefault();
  //calculate the number page and inc by one
  const dataPage = parseInt($(".first-time-page[data-marked=yes]").attr('data-page'))+1;
  //send to firsTimeModel
  firstTimeModal(dataPage)
})