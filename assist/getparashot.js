//make an object from the data of the table in misrad hadaot (use element in chrome)
//key = date, 0 = heb date, 1 = parasha name, 2= Jerusalem enter , 3= Jerusalem exit , 4= Tel Aviv enter , 5= Tel Aviv exit
// 6= Haifa enter , 7= Haifa exit , 8= Beer Sheva enter , 9= Beer Sheva exit
const txt =` <td class="Azure" >30/11/2019</td><td class="Azure" >ב' כסלו תש"פ</td><td>תולדות</td><td>16:00</td><td>17:15</td><td>16:14</td><td>17:16</td><td>16:03</td><td>17:14</td><td>16:18</td><td>17:18</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_538"><td class="Azure" >07/12/2019</td><td class="Azure" >ט' כסלו תש"פ</td><td>ויצא</td><td>16:00</td><td>17:15</td><td>16:14</td><td>17:16</td><td>16:03</td><td>17:14</td><td>16:18</td><td>17:18</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_539"><td class="Azure" >14/12/2019</td><td class="Azure" >ט"ז כסלו תש"פ</td><td>וישלח</td><td>16:01</td><td>17:16</td><td>16:15</td><td>17:18</td><td>16:04</td><td>17:15</td><td>16:19</td><td>17:20</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_540"><td class="Azure" >21/12/2019</td><td class="Azure" >כ"ג כסלו תש"פ</td><td>וישב</td><td>16:03</td><td>17:19</td><td>16:17</td><td>17:21</td><td>16:07</td><td>17:18</td><td>16:22</td><td>17:23</td></tr><tr class="zbTRYellow" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_541"><td class="Azure" >28/12/2019</td><td class="Azure" >ל' כסלו תש"פ</td><td>מקץ</td><td>16:07</td><td>17:23</td><td>16:21</td><td>17:24</td><td>16:10</td><td>17:22</td><td>16:26</td><td>17:27</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_542"><td class="Azure" >04/01/2020</td><td class="Azure" >ז' טבת תש"פ</td><td>ויגש</td><td>16:12</td><td>17:28</td><td>16:26</td><td>17:29</td><td>16:15</td><td>17:27</td><td>16:30</td><td>17:31</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_543"><td class="Azure" >11/01/2020</td><td class="Azure" >י"ד טבת תש"פ</td><td>ויחי</td><td>16:17</td><td>17:33</td><td>16:32</td><td>17:35</td><td>16:21</td><td>17:32</td><td>16:36</td><td>17:37</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_544"><td class="Azure" >18/01/2020</td><td class="Azure" >כ"א טבת תש"פ</td><td>שמות</td><td>16:24</td><td>17:39</td><td>16:38</td><td>17:40</td><td>16:27</td><td>17:38</td><td>16:42</td><td>17:42</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_545"><td class="Azure" >25/01/2020</td><td class="Azure" >כ"ח טבת תש"פ</td><td>וארא</td><td>16:30</td><td>17:45</td><td>16:44</td><td>17:46</td><td>16:34</td><td>17:44</td><td>16:48</td><td>17:48</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_546"><td class="Azure" >01/02/2020</td><td class="Azure" >ו' שבט תש"פ</td><td>בא</td><td>16:36</td><td>17:51</td><td>16:51</td><td>17:52</td><td>16:40</td><td>17:51</td><td>16:55</td><td>17:54</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_547"><td class="Azure" >08/02/2020</td><td class="Azure" >י"ג שבט תש"פ</td><td>בשלח</td><td>16:43</td><td>17:57</td><td>16:57</td><td>17:58</td><td>16:47</td><td>17:57</td><td>17:01</td><td>18:00</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_548"><td class="Azure" >15/02/2020</td><td class="Azure" >כ' שבט תש"פ</td><td>יתרו</td><td>16:49</td><td>18:02</td><td>17:03</td><td>18:04</td><td>16:53</td><td>18:03</td><td>17:07</td><td>18:05</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_549"><td class="Azure" >22/02/2020</td><td class="Azure" >כ"ז שבט תש"פ</td><td>משפטים</td><td>16:54</td><td>18:08</td><td>17:09</td><td>18:10</td><td>17:00</td><td>18:08</td><td>17:12</td><td>18:11</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_550"><td class="Azure" >29/02/2020</td><td class="Azure" >ד' אדר תש"פ</td><td>תרומה</td><td>17:00</td><td>18:13</td><td>17:15</td><td>18:15</td><td>17:05</td><td>18:14</td><td>17:18</td><td>18:16</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_551"><td class="Azure" >07/03/2020</td><td class="Azure" >י"א אדר תש"פ</td><td>תצוה</td><td>17:05</td><td>18:18</td><td>17:20</td><td>18:20</td><td>17:11</td><td>18:19</td><td>17:23</td><td>18:21</td></tr></table></div></td> `

//define an object
const map = [];

//the date format that use as keys
dateReg = /([0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9])/;

//define key - save the keys of the object, count init in evrey new key
let key = null;
let count = 0;

for (let i =0; i<txt.length;i++) {
    //check of the end of the html tag is data and no new tag
    if (txt[i].trim()===">" && txt[i+1].trim() !== "<"){
        i++;
        let data = '';

        //for gitting a hole word add to data the next char until "<" char
        while (txt[i] !=="<" && i<txt.length ) {
            data += txt[i];
            i++;
        } 
        
        //if the data is a date/key format, add a key in the object and init the counter
        if (data.match(dateReg) !== null) {
            key = data;
            map[key] = [];
            count = 0;
        } 
        // if the data is not a key put it in the object[key][counter]
        if (key !== data) {
            map[key][count] = data;
            count++;
        } 
    }

}

// console.log(map);  //the all data from the web
// ,ake an array of the keys
const keys = Object.keys(map);
//define a newmap for the name and haifa enter and exit
const newmap = {}
//inset the new data 
for (let i=0; i<key.length; i++) {
    newmap[keys[i]] = []
    newmap[keys[i]][0]= map[keys[i]][6]
    newmap[keys[i]][1]= map[keys[i]][7]
    newmap[keys[i]][2]= map[keys[i]][2] // spot for Rabeno Taam, indifferent
    newmap[keys[i]][3]= map[keys[i]][1]
}
//print the new data
console.log(newmap);