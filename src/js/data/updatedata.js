import data from "./data";
import links from "./links";

//the update version
const updateVersion = 3;

//last saved data on the localstorage
const savedVersion = Object.keys(data.version);
const lastSavedVersion = savedVersion[Object.keys(data.version).length-1];
// console.log(lastSavedVersion);
// console.log(updateVersion);

if (updateVersion == lastSavedVersion) {
    //pass no change
}else {
    // get keys from links
    const lenksKey = Object.keys(links.links);
    for (let i=0; i<lenksKey.length; i++) {
        //pass menu
        if (lenksKey[i].toString().trim() === "menu") { }
        //for all container change links inside
        else{
            // console.log(lenksKey[i])
            data.links[lenksKey[i]] = links.links[lenksKey[i]];
        }
         //save the data
        localStorage.setItem('data', JSON.stringify(data));

    }

    // for (let i=lastSavedVersion; i<updateVersion; i++) {
    //     console.log(i);
    //     let changedContainers = Object.keys(links.version[[parseInt(i)+1]]);
    //     for (let j=0; j<changedContainers.length; j++) {
    //         //if new container copy the whole links form links to data
    //         if (data.links[changedContainers[j]] === undefined) {
    //             data.links[changedContainers[j]] = links.links[changedContainers[j]];
    //             console.log(changedContainers[j]);
    //             console.log(data.links[changedContainers[j]]);
    //         }else {
    //             for (k=updateVersion-1; k)
    //             if ()


    //         }
    //     }
    // }
  
}


