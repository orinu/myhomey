import data from "./data";

//Fetch container
export const fetchContainers = () => {
   let i = 0;
   let button;
   let cointainerColor;
   for (var key in data.links) {
      if (key.toString().trim() === "menu") {
        button = `<a class="btn-floating btn-medium waves-effect waves-light teal modal-trigger tooltipped edit-menu" data-tooltip="ערוך תפריט" data-position="right" id="changeMenu" href="#menu-modal"><i class="material-icons">create</i></a> `
        cointainerColor ="bold teal-text";
      } else {
         button = " ";
         cointainerColor ="teal-text";
      }
      const ul= document.getElementById("container");
      const container =
      `<div class="container-${i} divbutton data-containerposition="${i}" data-name="${key}">
            <div class="row -1">
                <div class="col s1"> <br>${button}</div>
                <div class="col s10">
                <h5 class="${cointainerColor}"> ${data.links[key].name}</h5>
                <div class="row"></div>
                <div class="divider"></div>
                <ui class="link-list" id="${key}" container-name="${key}">
                </ui>                    
                    </div>
                    <div class="col s1">
                    <a href="#top" id="movebtn" style="display:none" data-movebtn="movebtn1" class="data-movebtn waves-effect waves-light btn btn-floating tooltipped" data-tooltip="גרור לשנות מקום" data-position="right" >
                    <i draggable="true" class="material-icons">unfold_more</i></a></div>
                </div>
              </div>
              <br>`
      ul.innerHTML += container;
      i++;
   }
}

//Fetch links
export const fetchLinks = () => {
  for (var key in data.links) {
      if (data.links.hasOwnProperty(key)) { 
         let li;
         let i=0;
         var obj = data.links[key];
         document.getElementById(key).innerHTML ="";
         for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && prop>=0) {
               const ul= document.getElementById(key);
               //If menu 
               if (key.toString().trim() === "menu") {
                  //If link add to the web by the user
                  if (parseInt(obj[prop][4]) === -1) {
                     li = `
                          <li class="box responsive-img waves-effect waves-light link" data-position="${prop}" data-idNumber="${obj[prop][4]}" data-keyMenu="${i}" links>
                          <a id="link" href="${obj[prop][0]}" target="_blank">
                          <img class="responsive-img waves-effect waves-light" src="${obj[prop][1]}" draggable="true" style="height: 20px;width: 20px;"><span class="name-add " style="font-weight: bold; color: black;">${obj[prop][3]}</span>
                          <button class="waves-effect waves-light floating delete-btn add"><i class="tiny material-icons">cancel</i></button>
                          </li></a>`
                          i++;
                  //not add by the user - got for web poll
                  }else {
                        li= `
                     <li class="box responsive-img waves-effect waves-light link" data-position="${prop}" data-idNumber="${obj[prop][4]}" data-keyMenu="${i}" links>
                     <a id="link" href="${obj[prop][0]}" target="_blank">
                     <img class="responsive-img waves-effect waves-light" src="${obj[prop][1]}" draggable="true" > 
                     <button class="waves-effect waves-light floating delete-btn"><i class="tiny material-icons">cancel</i></button>
                     </li></a>` 
                     i++;
                     }
               //not menu link
               }else {
               li= `
               <li class="box responsive-img waves-effect waves-light link" data-position="${prop}" data-idNumber="${obj[prop][4]}" container name links>
               <a id="link" href="${obj[prop][0]}" target="_blank">
               <img class="responsive-img waves-effect waves-light" src="${obj[prop][1]}" draggable="true" > 
               <button class="waves-effect waves-light floating delete-btn"><i class="tiny material-icons">cancel</i></button>
               </li></a>`}
               document.getElementById(key).innerHTML += li;
            }
          }
       }
  }
};

//Fetch menu
export const fetchMenu = () => {
   document.getElementById("menu").innerHTML ="";
   let i =0;
   let li;
   for (var key in data.links.menu) {
      if (data.links.menu.hasOwnProperty(key) && key>=0) {
         if (parseInt(data.links.menu[key][4])===-1)
         {
            li= `
            <li class="box responsive-img waves-effect waves-light link" data-position="${key}" data-idNumber="${data.links.menu[key][4]}" data-keyMenu="${i}" links>
            <a id="link" href="${data.links.menu[key][0]}" target="_blank">
            <img class="responsive-img waves-effect waves-light" src="${data.links.menu[key][1]}" draggable="true" style="height: 20px;width: 20px;">&emsp;  <span style="font-weight: bold; color: black;">${data.links.menu[key][3]}</span>
            <button id="delete-btn" class="waves-effect waves-light floating delete-btn add"><i class="tiny material-icons">cancel</i></button>
            </li></a>`
            i++;
         }else {
            li= `
            <li class="box responsive-img waves-effect waves-light link" data-position="${key}" data-idNumber="${data.links.menu[key][4]}" data-keyMenu="${i}" links>
            <a id="link" href="${data.links.menu[key][0]}" target="_blank">
            <img class="responsive-img waves-effect waves-light" src="${data.links.menu[key][1]}" draggable="true" > 
            <button id="delete-btn" class="waves-effect waves-light floating delete-btn"><i class="tiny material-icons">cancel</i></button>
            </li></a>`
            i++;
         }
               
         document.getElementById("menu").innerHTML += li;

      }

   }

}

//Fetch Radio
export const fetchRadio = () => {
   for (var key in data.radio) {
      const ul= document.getElementById("radio");
      let li = `<li><a href="${data.radio[key]}" target="_blank" class="center-align">${key}</a></li>`
      ul.innerHTML += li;
   }
}

//Fetch Tv links
export const fetchTv = () => {
   const ul= document.getElementById("Tv");
   ul.innerHTML += 
      `
      <li><a href="#!" ><span class="black-text right-align">שידורים חיים</span></a></li>
      <li class="divider" tabindex="-1"></li>`;
   for (var key in data.tv.live) {
      let li = `<li><a href="${data.tv.live[key]}" target="_blank" class="right-align">${key}</a></li>`
      ul.innerHTML += li;
   }
   ul.innerHTML += 
      `<li class="divider" tabindex="-1"></li>
      <li><a href="#!" class="right-align" ><span class="black-text">VOD</span></a></li>
      <li class="divider" tabindex="-1"></li>`;
   for (var key in data.tv.vod) {
      let li = `<li><a href="${data.tv.vod[key]}" target="_blank" class="right-align">${key}</a></li>`
      ul.innerHTML += li;
   }
}

//Modal change menu

//all other
export const addToMenu = () => {
   let menuId = [];
   //insert all the id the in the menu to an array
   for (var key in data.links.menu) {
      if (key.toString().trim() !== "name") { 
        menuId.push(data.links.menu[key][4]);
      }
   }
   //get the containars that not menu
   const container = document.getElementById("addtomenu");
   container.innerHTML = "";
   for (var key in data.links) {
      if (key.toString().trim() !== "menu"  && key.toString().trim() !== "undefined") {
         let pathKey = data.links[key];
         container.innerHTML +=
         `<tr class="title-menu"><td><span class="right-align teal-text" style="font-weight: bold; font-size: 18px;">${pathKey.name}</span></td></tr>`
         //get the link that not menu just id that not appered in the menu
         for (var prop in data.links[key])
         {
            if (prop.toString().trim() !== "name" && !(menuId.includes(data.links[key][prop][4])) ) {
            container.innerHTML +=
            `<tr>
            <td class="right-align" > ${data.links[key][prop][2]} </td>
            <td> <a herf="!#" data-key="${prop}" data-container="${key}" data-idNumber="${data.links[key][prop][4]}" id="addToMenu" class= "waves-effect waves-light"> <i class="small material-icons green-text text-darken-2">add</i></a></td>
           </tr>`   
            }
         }
      }
   }
}


//Change displayMenu
export const deleteFromMenu = () => {
   const container = document.getElementById("displaymenu");
   container.innerHTML = ""
   container.innerHTML +=
   `<td><span class="right-align teal-text title-menu" style="font-weight: bold; font-size: 18px;">תפריט אישי</span></td>`
   for (var key in data.links.menu) {
      if (key.toString().trim() !== "name") {
      container.innerHTML += 
      `<tr>
      <td class="right-align" > ${data.links.menu[key][2]} </td>
      <td> <a herf="!#" data-keyMenu="${key}"  id="removeFromMenu" class= " waves-effect waves-light"> <i class="small material-icons red-text text-darken-2" >close</i></a> </td>
      </tr>`   
   }
}
}



fetchRadio();
fetchTv();
fetchContainers();
fetchLinks();
