import datalinks from "./links";


let data;

if (localStorage.getItem("data")  === null) { //not save change the !
  data = datalinks; 
  }
else{
   data = JSON.parse(localStorage.getItem('data'));
   data.user.firstTime = 'no';
}


export default data;
