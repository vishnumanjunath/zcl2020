
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

/*******************************/


formSubmitted = false;
formTip = false;

function not_valid_text(text) {
  return text ? false : true;
}
// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function removeRefs(refs) {
  console.log("Removing Firebase ref :"+refs);
  let ref = firebase.database().ref(refs);
  ref.remove();
  return true;
}

function getData() {
  var ref = firebase.database().ref('primaryKeys/');

  ref.orderByChild('email').on("child_added", function(snapshot) {
    console.log(snapshot.val().email);
    console.log(snapshot.val().key);
  }, function (error) {
    console.log("Error: " + error.code);
    }
  );
}
let duplicateKey = null
let shouldAdd = true;
let isFirebaseFetching = true;

function waitFor(conditionFunction) {
  const poll = resolve => {
    if(conditionFunction()) resolve();
    else setTimeout(_ => poll(resolve), 400);
  }
  return new Promise(poll);
}

async function validateWithFirebase(input_email) {
  console.log('input_email sent for validation='+input_email);
  shouldAdd = true;
  isFirebaseFetching = true;
  duplicateKey_primaryKey = null;
  firebase.database().ref('primaryKeys/').orderByChild('email').equalTo(input_email).once('value').then(function(snapshot) {
    snapshot.forEach(function(child) {
      console.log(child.key+": "+child.val().email);
      if (child.val().email === input_email) {
          console.log("This email id "+input_email+" is already registered to ZCL 2020!");
          shouldAdd = false;
          duplicateKey = child.val().key;
          duplicateKey_primaryKey = child.key;
          console.log('Setting duplicateKey='+duplicateKey+'\tduplicateKey_primaryKey='+duplicateKey_primaryKey);
          isFirebaseFetching = false;
      }
    });
     console.log("Loading emails done");

       isFirebaseFetching = false;
  });
  console.log("Waiting NOW for firebase");
  // Savier query...
  // const query = firebase.database().ref('primaryKeys/').orderByChild('email').equalTo(input_email).on('value', function(snapshot){
  //   console.log(snapshot.val());
  //   console.log("Loading emails done...:"+snapshot.val().email);
  // });

    await waitFor(_ => isFirebaseFetching === false);
    console.log("Waiting for firebase is OVER.");
    if (shouldAdd == false && duplicateKey != null && duplicateKey_primaryKey != null) {
      console.log("All conditions are met to remove the duplicate entry.., globalRefUsed="+globalRefUsed)
      duplicate_refs = 'Teams/' + duplicateKey;
      removeRefs(duplicate_refs)
      duplicateKey = null;
      primaryKeys_duplicate_refs = 'primaryKeys/' + duplicateKey_primaryKey;
      removeRefs(primaryKeys_duplicate_refs)
      duplicateKey_primaryKey = null;
    }
   return shouldAdd;
}

function getGameType(game_type_boys, game_type_girls, game_type_watch) {
  let game_type = "boys"
  if (game_type_girls) {
    game_type = "girls"
  } else if (game_type_watch) {
    game_type = "watch"
  }
  console.log('getGameType returns:'+game_type);
  return game_type;
}

function getDuplicateRemovalURI(game_type, team_name) {
  let uri = get_team_list(game_type, team_name) + ""
  console.log(typeof uri)
  var start = uri.indexOf('Teams');
  return uri.substr(start);
}
function get_team_list(game_type, team_name) {
  console.log('get_team_list[input]: game_type='+game_type+'\t team_name='+team_name);
  if (game_type === "boys") {
    team_list = firebase.database().ref("Teams/Boys/"+team_name);
  } else if (game_type === 'girls') {
    team_list = firebase.database().ref("Teams/Girls/"+team_name);
  } else {
    team_list = firebase.database().ref("Teams/Audience");
  }
  team_list = firebase.database().ref("Teams/" + game_type + '/' + team_name);
  console.log('get_team_list returns:'+team_list);
  return team_list;
}

function formSubmit() {
  // Return here while debugging..
  //showToast();
  //return;
  // if (removeRefs()) {
  //   return;
  // }
  replaceButtonText('submit_button', "Please wait..");
  if (!formSubmit_internal()) {
    replaceButtonText('submit_button', "Something went wrong, scroll up.." )
    sleep(3500).then(() => {
      // Do something after the sleep!
      replaceButtonText('submit_button', "Sign up for ZCL 2020" )
    });
  }
}

function formSubmit_internal() {
  //formSubmitted = true;
  if (formSubmitted) {
    if (!formTip) {
      replaceButtonText('submit_button', 'I promise, I have received your registration data!');
      formTip = true;
      return true;
    } else {
      replaceButtonText('submit_button', 'You can submit any number of times, but it will be overwritten!');
      sleep(2000).then(() => {
        // Do something after the sleep!
        location.reload();
      });
      return true;
    }
  }
  let name = document.getElementById('player_name').value;
  if (not_valid_text(name)) {
    document.getElementById('player_name').style.borderColor = "red";
    document.getElementById('player_name').style.background = "red";
    document.getElementById('player_name').placeholder = "This can not be empty";
    return false;
  } else {
        document.getElementById('player_name').style.borderColor = "green";
        document.getElementById('player_name').style.background = "white";
  }
  let email = document.getElementById('player_email').value;
  if (not_valid_text(email)) {
    document.getElementById('player_email').style.borderColor = "red";
    document.getElementById('player_email').style.background = "red";
    document.getElementById('player_email').placeholder = "This can not be empty";
    return false;
  } else {
        document.getElementById('player_email').style.borderColor = "green";
        document.getElementById('player_email').style.background = "white";
  }
  let phone = document.getElementById('player_phone').value;
  if (not_valid_text(phone)) {
    document.getElementById('player_phone').style.borderColor = "red";
    document.getElementById('player_phone').style.background = "red";
    document.getElementById('player_phone').placeholder = "This can not be empty";
    return false;
  } else {
        document.getElementById('player_phone').style.borderColor = "green";
        document.getElementById('player_phone').style.background = "white";
  }
  let team_name = document.getElementById('team_name').value;

  if (!document.getElementById('checkbox').checked) {
    document.getElementById('checkbox').parentElement.style.background = "red";
    return false;
  } else {
    document.getElementById('checkbox').parentElement.style.background = "white";
  }
  let game_type_boys = document.getElementById('player_game_type_boys').checked;
  let game_type_girls = document.getElementById('player_game_type_girls').checked;
  let game_type_watch = document.getElementById('player_game_type_watch').checked;

  console.log("Found valid input values.");
  //check if user is already registered!
  let isValid = validateWithFirebase(email);
  isValid = false;
    ///console.log("Is it valid? "+isValid);
    sendMessage(name, email, phone, getGameType(game_type_boys, game_type_girls, game_type_watch), team_name);

  return true;
}

//Send Message to Firebase(4)
function replaceButtonText(buttonId, text)
{
  if (document.getElementById)
  {
    var button=document.getElementById(buttonId);
    if (button)
    {
      if (button.childNodes[0])
      {
        button.childNodes[0].nodeValue=text;
      }
      else if (button.value)
      {
        button.value=text;
      }
      else
      {
        button.innerHTML=text;
      }
    }
  }
}
let unique_user_id = null
function save_unique_user_data(key, email) {
  let unique_list = firebase.database().ref("primaryKeys/").push()
  unique_list.set({
      key : key,
      email : email
    }, function (error) {
        if (error) {
          console.log("Error storing unique key");
        } else {
          console.log('Passed storing unique key');
        }
    }
  );
}

let globalRefUsed = null
function sendMessage(name, email, phone, game_type, team_name) {
  console.log("Inside sendMessage()");
  var team_list = get_team_list(game_type, team_name);
  globalRefUsed = team_list
  var update_list = team_list.push();
  update_list.set({
    name: name,
    email: email,
    game_type: game_type,
    phone: phone,
    team: team_name
  }, function (error) {
      if (error) {
        alert('Failed to send to data to Firebase servers..');
      } else {
        console.log("Firebase write Passed");
        replaceButtonText('submit_button', "All the best, practice well and play well!");
        showToast();
        setTimeout(function () {window.scrollTo(0,document.body.scrollHeight)}, 1500)

        formSubmitted = true;
        unique_user_id = game_type + '/' + team_name + '/' + update_list.key
        //alert("Data write Passed: key=" + unique_user_id);
        save_unique_user_data(unique_user_id, email);
      }
    }
  );
  console.log("Returning from sendMessage()");
}

/****** Other
              Utilities
                        ********/
// document.getElementsByClassName('t006__uptitle t-uptitle t-uptitle_md')[0].addEventListener(
//   'click', function(event) {
//
//     if (UNDER_DEVELOPMENT) {
//       alert("We are sorry, this feature is still under development :(");
//     }
//   }
// );
