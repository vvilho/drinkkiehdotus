// List of beaches at Helsinki area

var maplist = [
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1840.5114349703615!2d25.150330418509405!3d60.19905930081654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920f0776894ea7%3A0x9cf4601dee670d52!2sAurinkolahden%20uimaranta!5e0!3m2!1sfi!2sfi!4v1587726433738!5m2!1sfi!2sfi",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126866.78463489145!2d24.95483819999999!3d60.208974100000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x22ca0e6f88e5a7eb!2sKallahdenniemen%20uimaranta!5e0!3m2!1sfi!2sfi!4v1587726831738!5m2!1sfi!2sfi",
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3553.422290944972!2d24.993427696950828!3d60.181556504008576!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692095e33140aab%3A0x5face5dcda1e42b5!2sMustikkamaan%20ranta!5e0!3m2!1sfi!2sfi!4v1587727668874!5m2!1sfi!2sfi",
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1378.3102482267675!2d24.905359920312566!3d60.173461874758736!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920a3945a9850b%3A0x3886c288b54ffa1f!2sHietaranta!5e0!3m2!1sfi!2sfi!4v1587727793119!5m2!1sfi!2sfi",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212.71574874266042!2d24.85033050655853!3d60.17495085147887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8512ba25b056563!2sLehtisaaren%20uimaranta!5e0!3m2!1sfi!2sfi!4v1587728024914!5m2!1sfi!2sfi",
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d153.3962414373873!2d24.787418203632136!3d60.15597325016462!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df5726d00d29d%3A0xd09fa90b7ed538d1!2sToppelundin%20ranta!5e0!3m2!1sfi!2sfi!4v1587732763056!5m2!1sfi!2sfi",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d419.48620556141344!2d24.855639784319187!3d60.20083460090145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df5fda842059f%3A0xce232acb194ad5ac!2sMunkkiniemen%20uimaranta!5e0!3m2!1sfi!2sfi!4v1587732816369!5m2!1sfi!2sfi",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20968.522177945553!2d24.961277703382645!3d60.17903784872121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692096a5fb41a73%3A0x2bc6da0930282289!2sKivinokan%20uimaranta!5e0!3m2!1sfi!2sfi!4v1587732838711!5m2!1sfi!2sfi",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6428.244109213448!2d25.074850978224312!3d60.1576693983278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x616e1404b4bdbdb8!2sPorvariskuninkaan%20uimaranta!5e0!3m2!1sfi!2sfi!4v1587732867162!5m2!1sfi!2sfi",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2378.7586242992734!2d24.982917858885777!3d60.13980000809489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920b8f501bca5b%3A0xc346fea2a5c4b89d!2sSuomenlinnan%20uimaranta!5e0!3m2!1sfi!2sfi!4v1587732990863!5m2!1sfi!2sfi"
]

var length = maplist.length;
var choice = Math.floor(Math.random() * length);
var link = maplist[choice];


document.getElementById("map").src = link;

// Function to choose random location from the list
function getRandom() {
    choice = Math.floor(Math.random() * length);
    link = maplist[choice];
    document.getElementById("map").src = link;
}