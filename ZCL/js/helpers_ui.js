/****** Other
              Utilities
                        ********/
UNDER_DEVELOPMENT = false
//
// document.getElementsByClassName('t006__uptitle t-uptitle t-uptitle_md')[1].addEventListener(
//   'click', function(event) {
//
//     window.location.assign("table/index.html");
//     if (UNDER_DEVELOPMENT) {
//       alert("We are sorry, this feature is still under development :(");
//     }
//   }
// );

/**
“Nobody goes undefeated all the time.
 If you can pick up after a crushing defeat,
  and go on to win again,
   you are going to be a champion some day!”
    – Kumara Sangakkara
*/


var bannerColors = ["#5B84B1FF",
"#E69A8DFF",
"#CDB599FF",
"#F95700FF",
"#ADEFD1FF",
"#D6ED17FF",
"#D85A7FFF",
"#97BC62FF",
"#EEA47FFF",
"#9CC3D5FF",
"#E0C568FF",
"#FEE715FF",
"#EA738DFF",
"#5CC8D7FF",
"#FCF6F5FF",
"#B1B3B3FF",
"#F2AA4CFF",
"#D4B996FF",
"#A2A2A1FF",
"#C7D3D4FF",
"#FCF6F5FF",
"#6E6E6DFF",
"#E94B3CFF",
"#616247FF",
"#FCF6F5FF",
"#D64161FF",
"#76528BFF",
"#333D79FF",
"#FDD20EFF",
"#755139FF",
"#101820FF",
"#00539CFF",
"#343148FF",
"#F5C7B8FF",
"#3C1053FF",
"#2C5F2DFF",
"#9E1030FF",
"#A2A2A1FF",
"#422057FF",
"#D01C1FFF",
"#CE4A7EFF",
"#FDDB27FF",
"#FF7F41FF",
"#A13941FF",
"#9FC131FF",
"#E10600FF",
"#184A45FF",
"#EED971FF",
"#696667FF",
"#53A567FF",
"#A8D5BAFF",
"#ABD6DFFF",
"#9B4A97FF",
"#D32E5EFF",
"#8ABAD3FF",
"#F1AC88FF",
"#E683A9FF",
"#28334AFF",
"#339E66FF",
"#EE2737FF",
"#00A4CCFF",
"#4F2C1DFF",
"#2DA8D8FF",
"#FEAE51FF",
"#A13941FF",
"#D9B48FFF",
"#6E4C1EFF",
"#FF4F58FF",
"#FE0000FF",
"#008C76FF",
"#301728FF",
"#EF6079FF",
"#97B3D0FF"
];

function getColorCode() {
    var index = Math.floor((Math.random() * bannerColors.length));
    document.getElementById('rec163039063').style.backgroundColor = bannerColors[index];
  }

getColorCode();

