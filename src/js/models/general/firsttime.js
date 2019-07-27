
//First Time modals
$(".modal.firsttime").modal({onOpenStart: firstTime(1)});

function firstTime (counter)  {
  //array of all the links objects
  const contaienrs = Object.keys(data.links);
  //start on container 1
  document.getElementById("firsttime-title").innerHTML = data.links[contaienrs[counter]].name;
  const countlinks = Object.keys(data.links[contaienrs[counter]]);

  //inner html iside the modal
  let linksli = document.getElementById("firsttime-links");
  //rest the html
  linksli.innerHTML = "";

  //display the title and all the links 
  for (let i=0;i<countlinks.length; i++) {
    if (countlinks[i].trim() !== "name") { 
    linksli.innerHTML +=  
    `<li class="box responsive-img waves-effect waves-light" id="firsttime-link" data-contianer="${contaienrs[counter]}" data-idnumber="${[i]}">
    <img class="responsive-img waves-effect waves-light" src="${data.links[contaienrs[counter]][i][1]}" draggable="false">
    </li>`;
  }}
}

//run on the rest of the links by counter
let counter = 1;
$(document).on("click", '#next-firsttime' , function() {
  counter++;
  const numberlinks = Object.keys(data.links).length-1;
  if (counter<=numberlinks) {
    firstTime(counter);
  }
  else {
    document.getElementById("sub-title-first-time").innerHTML = ''
    document.getElementById("firsttime-title").innerHTML = 'סיימנו, הכל מוגדר!'
    document.getElementById("firsttime-links").innerHTML = ' באפשרותך לערוך תמיד את תפריטך האישי ע״י לחיצה על כפתור העריכה או גרירת הקישורים. <br> אנו מאחלים לך הנאה בעת שימושך באתר!'

  }
})

//when cilck on the link inside the modal
$(document).on("click", '#firsttime-link' , function() {
  //the way to recognize if unclick is by the border, if 230 , unclick
  //unchoose click //defualt 1px solid rgb(179, 179, 179) , hever 2px solid rgb(75, 90, 229)
  if ( $(this).css('border') === "2px solid rgb(75, 90, 230)")  {
    $(this).css('border', '1px solid rgb(179, 179, 179)')
    //get data on the clicked link
    let idLink = $(this).attr('data-idnumber');
    let contianerName = $(this).attr('data-contianer');
    let idnumber = data.links[contianerName][idLink][4];
    let keymenu = $("li[data-idnumber="+idnumber+"]").attr("data-keymenu");
    //the number of links after delceting
    const last = Object.keys(data.links.menu).length-2;
    //run on the object and change the data
        for (var i=keymenu; i<=last; i++) {
          data.links.menu[i] = data.links.menu[parseInt(i)+1];
        }
        console.log(data.links.menu)
        //delete the last row
        delete data.links.menu[last];
        //save the data
        localStorage.setItem('data', JSON.stringify(data));
        //update the links in the main menu 
        fetch.fetchMenu();

  }else {// if link click for the first time (choosed)
    // chage border
    $(this).css('border', '2px solid rgb(75, 90, 230');
    //get data
    let contianerName = $(this).attr('data-contianer');
    let idLink = $(this).attr('data-idnumber');
    // last in menu under links
    let lastInMenu =  Object.keys(data.links.menu).length-1;
    //for empty menu, first category
    if (lastInMenu<0) {
      lastInMenu = 0;
    }
    //add the link to the menu
    data.links.menu[lastInMenu] = data.links[contianerName][idLink]
    //save the data
    localStorage.setItem('data', JSON.stringify(data));
    //fetch the menu in the main page
    fetch.fetchMenu();
  }
})
