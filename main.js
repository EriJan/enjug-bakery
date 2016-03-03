var $;
//random function
function getRandomInt(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//todayslink
var theNames = ["Pankakstårta", "Mazarin", "Äppelpaj", "Pecanpaj"];
var linkToURLs = ["recept1.html", "recept2.html", "recept3.html", "recept4.html"];
var linkToImgs = ["./img/img1.png", "./img/img2.png", "./img/img3.png", "./img/img4.png"];
var linkId;
linkId = getRandomInt(0, 3);

function linkobjectAlert() { //just for info..
    'use strict';
    //linkId = getRandomInt(0, 3);
    return linkId + ' : ' + theNames[linkId] + ' ' + linkToURLs[linkId] + ' ' + linkToImgs[linkId];
}
var textInfo;
function linkobject() { //did not work :-(
    'use strict';
    //linkId = getRandomInt(0, 3);
    textInfo = "<a href=\"" + linkToURLs[linkId] + "\">" +
            "<img alt=\"En bild visas på en delikat sak\" src=\"" + linkToImgs[linkId] + "\" />" +
            theNames[linkId] +
            "</a>";
        
    //$("#hintRecept").text(textInfo);
    //alert("test2");
    //return linkId + ' : ' + theNames[linkId] + ' ' + linkToURLs[linkId] + ' ' + linkToImgs[linkId];
}
function openInSameWindow(evt) {
    'use strict';
    window.location = evt;
}
function changeClick() { //this is for the hintclicker link..
    'use strict';
    openInSameWindow(linkToURLs[linkId]);
}
function changeImg() { //this is for the hintclicker img..
    'use strict';
    var imagelinkTarget = document.getElementById('changingImg');
    imagelinkTarget.src = linkToImgs[linkId];
    //alert("linkToImgs");
}

function changeImgText() { //this is for the hintclicker text..
    'use strict';
    document.getElementById('imgText').innerHTML = theNames[linkId];
    //$(theNames[linkId]).hide(500);
    $(theNames[linkId]).show(500);
}

/*
<span id = "hintRecept">                
                    <a href="recept/pecanniklas.html">
                        <img alt="En bild visas på en delikat paj" src="img/pecanpaj.png" />
                    </a>
                
                </span>
*/

//linkClass.getInfo();
//alert(linkobjectAlert());
//linkobject();
window.onload = function () {
    'use strict';
    changeImg();
    changeImgText();
 
    
};