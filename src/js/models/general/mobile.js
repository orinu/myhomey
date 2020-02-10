var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

if (isMobile){
   document.getElementById('container-up').innerHTML = `
   
 
<!--up models-->
<div class="container up data" id="container-up">
<!--date-->
<div class="row">
    <h6 class="teal-text right-align"> <span style="font-size: 19px;" id="engdate">    </span> </h6> 
   <span class="right-align" id="hebdate"> <h6>     </h6> </span></div>
</div>
    </div>
</div>

<div class="row">
  <!--currency-->
  <div class= "col s6 dropdown-trigger currency" data-target="currency-dropdown">
  <div class="col s4"> </div>
        <div class="col s2" ><i class="small material-icons ">attach_money</i> 
          <br><span id="Dollar">  </span>
        </div>
        <div class="col s3"> </div>
        <div class="col s2" > <i class="small material-icons">euro_symbol</i>
          <br><span id="Euro">  </span>
    </div>
  </div>
  <div class="col s2 "></div>
  <!--wheather-->
    <div class="col s6 divide center-align weather dropdown-trigger " data-target="wheather-dropdown"  > <span id="weatherIcon"></span>
      <br><span id="weather"></span>
  </div>
<div class="row">
<div class="col s1 "></div>
<div class="col s10 ">

 <div class="divider"></div> </div>

</div>
</div>

  
<!--wheather dropdown-->
<div id="wheather-dropdown" class="dropdown-content">
<div>
  <table class="highlight" id="weekWeather">
    
  </table>
</div>
</div>

<!--currency dropdown-->
<div id="currency-dropdown" class="dropdown-content">
<div>
  <table class="highlight" id="currencyList">
  </table>
</div>
</div>
<span id ="parasha" style="display: none;" ></span>
<span id="time" style="display: none;">    </span> 
   `

document.getElementById("search-container").innerHTML= `
 <div class="col s10 offset-s2">
          <div class="row">
                <div class="col s9 offset-s2" >
                 <form id="searchForm" action="#" >

                  <p> 
                  <label class="radio" >
                  <input name="group1" type="radio" id="radio1" value="גוגל" checked  data-ac="https://www.google.com/search" />
                  <span>&nbsp</span><label class="right-align" ><span class="textradio"> גוגל&nbsp&nbsp</span></label></label>
                  &nbsp&nbsp&nbsp&nbsp
                  <label class="radio" >
                  <input name="group1" type="radio"  value="יוטיוב"  data-ac="https://www.youtube.com/search" />
                  <span>&nbsp</span><label class="right-align" ><span class="textradio"> יוטיוב&nbsp&nbsp</span></label></label>             
                <br>
                   <label class="radio" >
                   <input name="group1" type="radio" value="תמונות"  data-ac="https://www.google.com/search?tbm=isch" />
                   <span>&nbsp</span><label class="right-align" ><span class="textradio"> תמונות&nbsp&nbsp</span></label></label>
               
                   <label class="radio" >
                   <input name="group1" type="radio"  value="ויקיפדיה"  data-ac="https://he.wikipedia.org/w/index.php" />
                   <span>&nbsp</span><label class="right-align" ><span class="textradio"> ויקיפדיה&nbsp&nbsp</span></label></label>
                   
                  
             </p> </form>
                </div>
            </div>

                <div class="row" >
                    <form action="https://www.google.com/search" class="searchform" method="get" name="searchform" target="_blank">
                        <div class="col s2">
                                <button class="btn search-btn" type="submit" style="margin: 5px;">חפש</button>
                        </div>
                    <div class="col s9">
                          
                          <input name="sitesearch" type="hidden" class="sitesearch">
                          <input autocomplete="on" class="form-control search" name="q" placeholder="חיפוש בגוגל" required="required"  type="text" autofocus id="searchfield">
                    </div>
                    </form>

                </div>
            </div>   
`
}
export {isMobile};