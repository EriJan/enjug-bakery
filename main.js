
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
    var i;
    for(i = 0; i < lista.length; i++){
        if(lista[i].id !== undefined){
        if(lista[i].id == name){
           lista[i].style.display = 'block';
        } else {
            lista[i].style.display = 'none';
        }
    }
    }
}

function highScoreItem(urlStr, htmlStr, score) {
    this.urlStr = urlStr;
    this.htmlStr = htmlStr;
    this.score = score;
}

var applePieUrl = "https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7607304c8de1b93&recipe=applepiemarcus";

var panncakeUrl = "https://edu.oscarb.se/sjk15/api/recipe/?api_key=698db01736ec3abd&recipe=pannkakst%C3%A5rta";

var pecanUrl = "https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj";

var mazarinUrl = "https://edu.oscarb.se/sjk15/api/recipe/?api_key=7cd7a288a851a28b&recipe=mazarint%C3%A5rta";

var applePieHtml = '<a href="./applepie/index.html">Äppelpaj</a>';

var panncakeHtml = '<a href="./panncake/panncake_merged.html">Pannkakstårta</a>';

var pecanHtml = '<a href="./pecan/recept/pecanniklas.html">Pecanpaj</a>';

var mazarinHtml = '<a href="./mazarin/index.html">Mazarintårta</a>';

var hsItemList = [];
hsItemList[0] = new highScoreItem(applePieUrl, applePieHtml, 0.0);
hsItemList[1] = new highScoreItem(mazarinUrl, mazarinHtml, 0.0);
hsItemList[2] = new highScoreItem(panncakeUrl, panncakeHtml, 0.0);
hsItemList[3] = new highScoreItem(pecanUrl, pecanHtml, 0.0);

function setHighScore () {
    hsItemList.sort(function(a,b) {return b.score - a.score});
    var listItem = $("#rating li").first();
    var i;
    for (i = 0; i < 3; i++) {
        listItem.html(hsItemList[i].htmlStr);
        listItem.append(" ("); 
        listItem.append(hsItemList[i].score.toString());
        listItem.append(")"); 
        listItem = listItem.next();
    }
}

function updateAllVotingResults (callCount) {
    $.ajax({
        method: "GET",
        url: hsItemList[callCount].urlStr,
        success: function(data) {
            hsItemList[callCount].score = data.rating.toFixed(1);
            callCount++;
            if (callCount < 4 && callCount >= 0) {
                updateAllVotingResults(callCount);
            } else {
                setHighScore();
            }
        },
    });   
}

$(document).ready(function () {
    updateAllVotingResults(0);
});


window.onload = function () {   
    'use strict';
    changeImg();
    changeImgText();
    //rateCakes();
};