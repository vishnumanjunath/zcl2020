
const config = {
  apiKey: "AIzaSyCRnlU2KO3pvZOlB7zloZwn14yX5p-5Kp4",
  authDomain: "zcl-2020.firebaseapp.com",
  databaseURL: "https://zcl-2020.firebaseio.com",
  projectId: "zcl-2020",
  storageBucket: "zcl-2020.appspot.com",
  messagingSenderId: "764552397777",
  appId: "1:764552397777:web:13f8e5cf700b914b9656f0",
  measurementId: "G-T58P0E8LNE"
};

firebase.initializeApp(config);
var boys_teams_list = [];
var fetch_boys_list_done = false;
var girls_teams_list = [];
var fetch_girls_list_done = false;

let dataMatrixString = ''
function updateUIData(item, index) {
  item.forEach(function(entry) {
    dataMatrixString = entry + ';\n';
    console.log(dataMatrixString);
  });
}

globalGraphixDataBody = ''
globalGraphixDataHead = ''

function formatTableData() {
  while (globalGraphixDataHead.includes(';\n')) {
    globalGraphixDataHead = globalGraphixDataHead.replace(';\n', '\n');
  }
  if (globalGraphixDataHead.endsWith(';')) {
    globalGraphixDataHead = globalGraphixDataHead.substring(0, globalGraphixDataHead.length - 1);
  }

  while (globalGraphixDataBody.includes(';\n')) {
    globalGraphixDataBody = globalGraphixDataBody.replace(';\n', '\n');
  }
  if (globalGraphixDataBody.endsWith(';')) {
    globalGraphixDataBody = globalGraphixDataBody.substring(0, globalGraphixDataBody.length - 1);
  }
}

function renderUIData(tableID) {
  globalGraphixDataHead = singleTeamList[0];
  for (var i = 1; i < singleTeamList.length; i++) {
    globalGraphixDataBody += singleTeamList[i].toString() + '\n';
    //console.log(singleTeamList[i].toString());
  }
  formatTableData();
  renderGraphicData(tableID)
}

girlsTableId = "163264988"
boysTable1Id = "163267617"
boysTable2Id = "163269189"
boysTable3Id = "163269343"

function renderGraphicData(tableID) {
  console.log('Rendering for table: ' + tableID)
          //var t431__tablehead = $('#rec' + tableID + ' .t431 .t-container .t431__data-part1').html();
          var t431__tablehead = globalGraphixDataHead;
          console.log('Table Head:' + t431__tablehead);
          //var t431__tablebody = $('#rec' + '163269343' + ' .t431 .t-container .t431__data-part2').html().replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
          var t431__tablebody = globalGraphixDataBody
          console.log('Table Body:'+t431__tablebody);
          var t431__btnstyles = $('#rec' + tableID + ' .t431 .t-container .t431__data-part1').attr('data-btn-style');
          var t431__tdstyles = 'font-size: inherit; border-width: 1px 1px 1px 1px; border-color: #ebebeb; color: #14120f;';
          var t431__thstyles = 'font-size: inherit; background: #ebebeb; border-width: 1px 1px 1px 1px; border-color: #ebebeb; color: #000000; font-size: ; font-family: ; font-weight: 500;';
          var t431__oddrowstyles = 'background: #ffffff';
          var t431__evenrowstyles = 'background: ';
          //console.log(document.getElementById('163269343'))
          t431_createTable(tableID, t431__tablehead, t431__tablebody, '30%;30%;30%;30%;30%;30%', 'on', t431__btnstyles, t431__tdstyles, t431__thstyles, t431__oddrowstyles, t431__evenrowstyles);
          if ('' && ($('#rec' + tableID + ' .t431 .t-container .t431__data-part2').html() || "").length > 0) {
            setTimeout(function() {
              t431_setHeadWidth(tableID);
            }, 200);
          }
          if ('' && ($('#rec' + tableID + ' .t431 .t-container .t431__data-part2').html() || "").length > 0) {
            $('.t431').bind('displayChanged', function() {
              t431_setHeadWidth(tableID);
            });
          }
          resetBuffers();
}

function constructTableData(my_array) {
  var i = 0;
  var j = 0;
  var len = 0;
  for (i; i < 15; i++) {
    for (j; j < 6; j++) {
      if (my_array[j][i]) {
        len += 1;
      }
    }
  }
}

function getSize(arr) {
  let l = 0;
  let len = 0
  for (l; l<arr.length; l++) {
    len = len + arr[l].length;
  }
  return len;
}
function makeArray(d1, d2) {
    var arr = [];
    for(let i = 0; i < d2; i++) {
        arr.push(new Array(d1));
    }
    return arr;
}
let dataArray = new Array(18)

let TABLE1 = makeArray(15, 6);
let TABLE2 = makeArray(15, 6);
let TABLE3 = makeArray(15, 6);

TEAM_INDEX = 0;
PLAYER_INDEX = 0;
let tableID = 0;
let callback_count = 0;
let team_callback_count = 0;
let singleTeamList = []


function getTeamCount(type) {
  console.log("Fetching count of "+type+" Teams");
  firebase.database().ref('Teams/'+type).on('value', function(snapshot) {
    console.log('Total ' + type +' Teams: '+snapshot.numChildren());
    if (type === 'boys') {
      totalTeams_boys = snapshot.numChildren();
    } else if (type === 'girls') {
      totalTeams_girls = snapshot.numChildren();
    }
    fetchFromDatabase(type);
  });
}

resetBuffersCount = 0;
renderingLimit = 6;

function resetBuffers() {
  // Reset buffers
  singleTeamList.splice(0, singleTeamList.length); // Empty the array.
  callback_count = 0;
  resetBuffersCount = 0;
  singleTeamList = [];
  //team_callback_count = 0;

  // Data buffers
  globalGraphixDataBody = ""
  globalGraphixDataHead = ""
}

function fetchFromDatabase(type) {
  resetBuffers();
  team_callback_count = 0;

  console.log("Fetching "+ type +" team from database")
  firebase.database().ref('Teams/'+type).on('child_added',function(snapshot) {  // Team Callback
      team_callback_count++;
      semiColonTrackerCount = 0;
      // Reset buffers and assign tableID : Done only for boys data
      if (team_callback_count > 6 && team_callback_count < 13) {
        tableID = boysTable2Id;
      } else if (team_callback_count < 6) {
        tableID = boysTable1Id;
      } else if (team_callback_count > 12 ) {
        tableID = boysTable3Id;
      }
      console.log("team_callback_count="+team_callback_count+" table ID: "+tableID);

      if (singleTeamList.length > 0) {
        var temp = singleTeamList[callback_count];
        console.log("temp team="+temp);
        singleTeamList[callback_count++] = temp + ';' + snapshot.key;
      }
      else {
        console.log("else temp team="+temp);
        singleTeamList.push(snapshot.key); // 1st Team
        callback_count++;
      }

      player_index = 1;
      snapshot.forEach(function(child) { // Player Callback
        semiColonTrackerCount++;
          if (team_callback_count < 2) {
            singleTeamList[player_index++] = child.val().name + ';';
            //console.log("Writing "+child.val().name+ " at "+(player_index-1))
          }
          else {
            var temp = singleTeamList[player_index++];
            var sc_count = 0;
            if (temp != undefined) {
              sc_count = temp.split(';').length - 1;
            } else {
              temp = ""
            }
              sc_s = ''
              //if (type === 'boys') {
                for (; sc_count < singleTeamList[0].split(';').length - 1; sc_count++) {
                  sc_s += ";" ;
                }
              // //} else if (type === 'girls') {
              //   for (; sc_count < totalTeams_girls - 1; sc_count++) {
              //     sc_s += ";" ;
              //   }
              // }
              
              temp += sc_s; // FATAL ERROR might be here, uncomment and verify if exists.

            singleTeamList[player_index-1] = temp + child.val().name+';' ;
          }
        });
        callback_count = 0;
        player_index = 0;
        if (type === 'boys') {
          if (team_callback_count == renderingLimit) {
            console.log("Rendering boys data now..in table:"+tableID);
            renderUIData(tableID);
          } else {
            console.log('team_callback_count='+team_callback_count +' : totalTeams_boys='+totalTeams_boys);
          }
        } else if (type === 'girls') {
          if (team_callback_count == totalTeams_girls) {
            console.log("Rendering girls data now..in table:"+tableID);
            renderUIData(girlsTableId);
          } else {
            console.log('team_callback_count='+team_callback_count +' : totalTeams_girls='+totalTeams_girls);
          }
      }
  });
}


function waitFor(conditionFunction) {
  const poll = resolve => {
    if(conditionFunction()) resolve();
    else setTimeout(_ => poll(resolve), 400);
  }
  return new Promise(poll);
}
let totalTeams_boys = undefined
let totalTeams_girls = undefined

async function initializeBoysTeams() {
  console.log("initializeBoysTeams..");
  totalTeams_boys = getTeamCount('boys')
  await waitFor(_ => totalTeams_boys != undefined);
  console.log('Rendering left out boys team data')
  renderUIData(tableID);
}
async function initializeGirlsTeams() {
  console.log("initializeGirlsTeams..");
  totalTeams_girls = getTeamCount('girls')
  await waitFor(_ => totalTeams_girls != undefined);
  console.log('Rendering left out Girls team data')
}

initializeGirlsTeams();
initializeBoysTeams();
