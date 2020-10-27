// const axios = require("axios");

// const url = `http://old.dat.gov.il/Pages/ShabathTimes.aspx`;

// const getPrashaFromWeb = async () => {
//   const res = await axios.get(url);
//   const regex = /<td class="Azure" >((.|\n)*)[0-9]<\/td><\/tr><\/table><\/div><\/td>/;
//   const match = regex.exec(res.data);
//   console.log(match[0]);
// };

// // getPrashaFromWeb();

//make an object from the data of the table in misrad hadaot (use element in chrome)
//key = date, 0 = heb date, 1 = parasha name, 2= Jerusalem enter , 3= Jerusalem exit , 4= Tel Aviv enter , 5= Tel Aviv exit
// 6= Haifa enter , 7= Haifa exit , 8= Beer Sheva enter , 9= Beer Sheva exit
// const txt =` <td class="Azure" >30/11/2019</td><td class="Azure" >ב' כסלו תש"פ</td><td>תולדות</td><td>16:00</td><td>17:15</td><td>16:14</td><td>17:16</td><td>16:03</td><td>17:14</td><td>16:18</td><td>17:18</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_538"><td class="Azure" >07/12/2019</td><td class="Azure" >ט' כסלו תש"פ</td><td>ויצא</td><td>16:00</td><td>17:15</td><td>16:14</td><td>17:16</td><td>16:03</td><td>17:14</td><td>16:18</td><td>17:18</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_539"><td class="Azure" >14/12/2019</td><td class="Azure" >ט"ז כסלו תש"פ</td><td>וישלח</td><td>16:01</td><td>17:16</td><td>16:15</td><td>17:18</td><td>16:04</td><td>17:15</td><td>16:19</td><td>17:20</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_540"><td class="Azure" >21/12/2019</td><td class="Azure" >כ"ג כסלו תש"פ</td><td>וישב</td><td>16:03</td><td>17:19</td><td>16:17</td><td>17:21</td><td>16:07</td><td>17:18</td><td>16:22</td><td>17:23</td></tr><tr class="zbTRYellow" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_541"><td class="Azure" >28/12/2019</td><td class="Azure" >ל' כסלו תש"פ</td><td>מקץ</td><td>16:07</td><td>17:23</td><td>16:21</td><td>17:24</td><td>16:10</td><td>17:22</td><td>16:26</td><td>17:27</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_542"><td class="Azure" >04/01/2020</td><td class="Azure" >ז' טבת תש"פ</td><td>ויגש</td><td>16:12</td><td>17:28</td><td>16:26</td><td>17:29</td><td>16:15</td><td>17:27</td><td>16:30</td><td>17:31</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_543"><td class="Azure" >11/01/2020</td><td class="Azure" >י"ד טבת תש"פ</td><td>ויחי</td><td>16:17</td><td>17:33</td><td>16:32</td><td>17:35</td><td>16:21</td><td>17:32</td><td>16:36</td><td>17:37</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_544"><td class="Azure" >18/01/2020</td><td class="Azure" >כ"א טבת תש"פ</td><td>שמות</td><td>16:24</td><td>17:39</td><td>16:38</td><td>17:40</td><td>16:27</td><td>17:38</td><td>16:42</td><td>17:42</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_545"><td class="Azure" >25/01/2020</td><td class="Azure" >כ"ח טבת תש"פ</td><td>וארא</td><td>16:30</td><td>17:45</td><td>16:44</td><td>17:46</td><td>16:34</td><td>17:44</td><td>16:48</td><td>17:48</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_546"><td class="Azure" >01/02/2020</td><td class="Azure" >ו' שבט תש"פ</td><td>בא</td><td>16:36</td><td>17:51</td><td>16:51</td><td>17:52</td><td>16:40</td><td>17:51</td><td>16:55</td><td>17:54</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_547"><td class="Azure" >08/02/2020</td><td class="Azure" >י"ג שבט תש"פ</td><td>בשלח</td><td>16:43</td><td>17:57</td><td>16:57</td><td>17:58</td><td>16:47</td><td>17:57</td><td>17:01</td><td>18:00</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_548"><td class="Azure" >15/02/2020</td><td class="Azure" >כ' שבט תש"פ</td><td>יתרו</td><td>16:49</td><td>18:02</td><td>17:03</td><td>18:04</td><td>16:53</td><td>18:03</td><td>17:07</td><td>18:05</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_549"><td class="Azure" >22/02/2020</td><td class="Azure" >כ"ז שבט תש"פ</td><td>משפטים</td><td>16:54</td><td>18:08</td><td>17:09</td><td>18:10</td><td>17:00</td><td>18:08</td><td>17:12</td><td>18:11</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_550"><td class="Azure" >29/02/2020</td><td class="Azure" >ד' אדר תש"פ</td><td>תרומה</td><td>17:00</td><td>18:13</td><td>17:15</td><td>18:15</td><td>17:05</td><td>18:14</td><td>17:18</td><td>18:16</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_551"><td class="Azure" >07/03/2020</td><td class="Azure" >י"א אדר תש"פ</td><td>תצוה</td><td>17:05</td><td>18:18</td><td>17:20</td><td>18:20</td><td>17:11</td><td>18:19</td><td>17:23</td><td>18:21</td></tr></table></div></td> `
const txt = ` <td class="Azure" >06/06/2020</td><td class="Azure" >י"ד סיון תש"פ</td><td>בהעלותך</td><td>19:07</td><td>20:25</td><td>19:22</td><td>20:28</td><td>19:15</td><td>20:29</td><td>19:23</td><td>20:26</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_568"><td class="Azure" >13/06/2020</td><td class="Azure" >כ"א סיון תש"פ</td><td>שלח</td><td>19:10</td><td>20:28</td><td>19:25</td><td>20:31</td><td>19:18</td><td>20:32</td><td>19:26</td><td>20:29</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_569"><td class="Azure" >20/06/2020</td><td class="Azure" >כ"ח סיון תש"פ</td><td>קרח</td><td>19:12</td><td>20:30</td><td>19:27</td><td>20:33</td><td>19:20</td><td>20:35</td><td>19:28</td><td>20:31</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_570"><td class="Azure" >27/06/2020</td><td class="Azure" >ה' תמוז תש"פ</td><td>חקת</td><td>19:13</td><td>20:31</td><td>19:29</td><td>20:34</td><td>19:22</td><td>20:35</td><td>19:29</td><td>20:32</td></tr><tr class="zbTRYellow" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_571"><td class="Azure" >04/07/2020</td><td class="Azure" >י"ב תמוז תש"פ</td><td>בלק</td><td>19:13</td><td>20:31</td><td>19:28</td><td>20:33</td><td>19:21</td><td>20:35</td><td>19:29</td><td>20:32</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_572"><td class="Azure" >11/07/2020</td><td class="Azure" >י"ט תמוז תש"פ</td><td>פינחס</td><td>19:12</td><td>20:29</td><td>19:27</td><td>20:32</td><td>19:20</td><td>20:33</td><td>19:28</td><td>20:30</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_573"><td class="Azure" >18/07/2020</td><td class="Azure" >כ"ו תמוז תש"פ</td><td>מטות מסעי</td><td>19:09</td><td>20:26</td><td>19:25</td><td>20:28</td><td>19:18</td><td>20:30</td><td>19:26</td><td>20:27</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_574"><td class="Azure" >25/07/2020</td><td class="Azure" >ד' אב תש"פ</td><td>דברים</td><td>19:06</td><td>20:21</td><td>19:21</td><td>20:24</td><td>19:14</td><td>20:25</td><td>19:22</td><td>20:22</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_575"><td class="Azure" >01/08/2020</td><td class="Azure" >י"א אב תש"פ</td><td>ואתחנן</td><td>19:01</td><td>20:15</td><td>19:16</td><td>20:18</td><td>19:09</td><td>20:19</td><td>19:17</td><td>20:17</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_576"><td class="Azure" >08/08/2020</td><td class="Azure" >י"ח אב תש"פ</td><td>עקב</td><td>18:55</td><td>20:09</td><td>19:10</td><td>20:11</td><td>19:03</td><td>20:12</td><td>19:12</td><td>20:10</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_577"><td class="Azure" >15/08/2020</td><td class="Azure" >כ"ה אב תש"פ</td><td>ראה</td><td>18:48</td><td>20:01</td><td>19:03</td><td>20:04</td><td>18:55</td><td>20:04</td><td>19:05</td><td>20:03</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_578"><td class="Azure" >22/08/2020</td><td class="Azure" >ב' אלול תש"פ</td><td>שופטים</td><td>18:40</td><td>19:53</td><td>18:56</td><td>19:55</td><td>18:48</td><td>19:56</td><td>18:57</td><td>19:55</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_579"><td class="Azure" >29/08/2020</td><td class="Azure" >ט' אלול תש"פ</td><td>כי תצא</td><td>18:32</td><td>19:44</td><td>18:47</td><td>19:46</td><td>18:39</td><td>19:46</td><td>18:49</td><td>19:46</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_580"><td class="Azure" >05/09/2020</td><td class="Azure" >ט"ז אלול תש"פ</td><td>כי תבוא</td><td>18:23</td><td>19:35</td><td>18:39</td><td>19:37</td><td>18:30</td><td>19:37</td><td>18:41</td><td>19:37</td></tr><tr class="zbTRLiteGray" id="TRItem_810beab8-f814-494b-91a0-4a18b67cbafa_581"><td class="Azure" >12/09/2020</td><td class="Azure" >כ"ג אלול תש"פ</td><td>נצבים וילך</td><td>18:14</td><td>19:25</td><td>18:29</td><td>19:28</td><td>18:21</td><td>19:27</td><td>18:32</td><td>19:28</td></tr></table></div></td> `;

//define an object
const map = [];

//the date format that use as keys
dateReg = /([0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9])/;

//define key - save the keys of the object, count init in evrey new key
let key = null;
let count = 0;

for (let i = 0; i < txt.length; i++) {
  //check of the end of the html tag is data and no new tag
  if (txt[i].trim() === ">" && txt[i + 1].trim() !== "<") {
    i++;
    let data = "";

    //for gitting a hole word add to data the next char until "<" char
    while (txt[i] !== "<" && i < txt.length) {
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
const newmap = {};
//inset the new data
for (let i = 0; i < key.length; i++) {
  newmap[keys[i]] = [];
  newmap[keys[i]][0] = map[keys[i]][6];
  newmap[keys[i]][1] = map[keys[i]][7];
  newmap[keys[i]][2] = map[keys[i]][2]; // spot for Rabeno Taam, indifferent
  newmap[keys[i]][3] = map[keys[i]][1];
}
//print the new data
console.log(newmap);
