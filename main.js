
var $;

//random function
function getRandomInt(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//todayslink
var theNames = ["Pankakstårta", "Mazarin", "Äppelpaj", "Pecanpaj"];
var linkToURLs = ["recept1.html", "recept2.html", "recept3.html", "recept4.html"];
var linkToImgs = ["pecan/img/img1.png", "pecan/img/img2.png", "pecan/img/img3.png", "pecan/img/img4.png"];
var linkId;
linkId = getRandomInt(0, 3);

function linkobjectAlert() { //just for info..
    'use strict';
    console.log("Används denna metod ");
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
    changePresText(theNames[linkId]);
    
    //$(theNames[linkId]).hide(500);
    $(theNames[linkId]).show(500);
}

function changePresText(name){
          
    var lista = document.getElementById("tipOfDay").childNodes;
    for(var i = 0; i < lista.length; i++){
        if(lista[i].id !== undefined){
        if(lista[i].id == name){
           lista[i].style.display = 'block';
        } else {
            lista[i].style.display = 'none';
        }
    }
    }
}

function rateCakes(){
var lista = document.getElementById("ratingApplePie").textContent;
    console.log(lista);
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
    //rateCakes();
 
    
};