
//____________
var alert, siteVote = 2, $, chrome;
//alert("js version 1.0.6b2");
//alert("siteVote =" + siteVote);
//funk1
function focusornot() {
    'use strict';
    var amuntfeild = document.getElementById("userInput");
    amuntfeild.onfocus = function () {
        //alert("focus");
        if (amuntfeild.value === "Ange antalet pajer...") {
            amuntfeild.value = "";
        }
    };
    amuntfeild.onblur = function () {
        //alert("onblur");
        if (amuntfeild.value === "") {
            amuntfeild.value = "Ange antalet pajer...";
        }
    };
}



function IncognitoDialog() {
    'use strict';
    $.confirm({
        confirmButton: 'JA, jag fuskar',
        cancelButton: 'Nej, såklart inte, stäng detta',
        confirmButtonClass: 'btn-danger',
        cancelButtonClass: 'btn-success',
        title: 'Igognito, fulspel!',
        content: 'Men nu fuskar du, nu kan du ju rösta igen!, vill du fortsätta..',
        confirm: function () {
            //$.alert('Confirmed!');
        },
        cancel: function () {
            window.close();
        }
    });
}


//----------
function setAmount(input) {
    'use strict';
    //alert("saving input");
    localStorage.portions = Number(input);
}
//------------
var glogalnumberofpies = 1;
//funk2
function calcamount(onepievalue, iditem) {
    'use strict';
    //var theonepievalue = Number(onepievalue);
    //var result = glogalnumberofpies * theonepievalue;
    var result = glogalnumberofpies * Number(onepievalue);
    //console.log(result);
    document.getElementById(iditem).innerHTML = result;
}
//funk3
function calcamountfirst(onepievalue) {
    'use strict';
    //var theonepievalue = Number(theonepievalue);
    //var result = glogalnumberofpies * theonepievalue;
    //console.log(result);
    var result = glogalnumberofpies * Number(onepievalue);
    return result;
}

//funk4
function updatechart(amount) {
    'use strict';
    var multiplyer = amount;
    calcamount(2.5, "pajSemper");
    calcamount(0.5, "pajKokosmjöl");
    calcamount(150, "pajsmör");
    calcamount(0.5, "pajsalt");
    calcamount(0.5, "pajströsocker");
    calcamount(2, "pajvatten");
    calcamount(2, "fyllsemper");
    calcamount(125, "fyllsmör");
    calcamount(1.5, "fyllströsocker");
    calcamount(0.5, "fyllsalt");
    calcamount(3, "fyllsirap");
    calcamount(2, "fyllägg");
    calcamount(1, "fyllvaniljsocker");
    calcamount(150, "pecannotter");
}

//funk5
function newDate() {
    'use strict';
    var today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth() + 1,//January is 0 and so on!
        yyyy = today.getFullYear();
    
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + '/' + dd + '/' + yyyy;
    //document.getElementById("date").innerHTML = today;
    $("#date").text(today);
    //d.toDateString();
}

//____________

glogalnumberofpies = 1;
//funk6
function displayOutput() {
    'use strict';
    var input = document.getElementById("userInput").value,
        thenumber = Number(input);
    if (input.length < 1) {
        alert("Var vänlig att ange antalet pajer");
        return;
    }
    
    if (isNaN(thenumber)) {
        alert("Ange ett antal i siffror");
    } else {
        if (thenumber !== glogalnumberofpies) {
            if (thenumber > 10) {
                alert("alldeles för många pajer!");
            } else if (thenumber < 1) {
                alert("Vill du inte ens försöka baka en?!");
            } else {
                glogalnumberofpies = thenumber;
                //animation out :-)
                //$("ul").hide(1000);
                $('.hideOrNot').hide(500);
                //do the calc
                updatechart(thenumber);
                //animation in :-)
                //$("ul").show(1000);
                $('.hideOrNot').show(500);
                document.getElementById("numberofpaj").innerHTML = input + " pajer";
                setAmount(input);//save the value in local storage..
            }
        }
    }
    
}

// funk6b
function setOutput(protionLasttime) {
    'use strict';
    //alert("inne i update");
    var input = document.getElementById("userInput").value,
        thenumber = Number(protionLasttime);
    if (input.length < 1) {
        //alert("Var vänlig att ange antalet pajer");
        return;
    }
    
    if (isNaN(thenumber)) {
        //alert("Ange ett antal i siffror");
    } else {
        if (thenumber > 10) {
            //alert("alldeles för många pajer!");
        } else if (thenumber < 1) {
            //alert("Vill du inte ens försöka baka en?!");
        } else {
            glogalnumberofpies = thenumber;
            //animation out :-)
            //$("ul").hide(1000);
            $('.hideOrNot').hide(500);
            //do the calc
            updatechart(thenumber);
            //animation in :-)
            //$("ul").show(1000);
            $('.hideOrNot').show(500);
            //document.getElementById("numberofpaj").innerHTML = Number(protionLasttime) + " pajer";
            $("#numberofpaj").text(Number(protionLasttime) + " pajer");
            document.getElementById("userInput").value = Number(protionLasttime);
        }
    }
    
}

//___________
//funk7
//
/*
function loadXLMData() {
    'use strict';
    var theRequest, counter = 0;
    if (window.XMLHttpRequest) {
        theRequest = new XMLHttpRequest();
        alert("firefox/crome/safari");
    } else if (window.ActiveXObject) {
        theRequest = new ActiveXObject("Microsoft.XMLHTTP");
        alert("IE");
    }
    
    
    //var webPath = //"https://dl.dropboxusercontent.com/s/tsvriw11l8yansj/recepts.xml";
    //theRequest.open("GET", "https://dl.dropboxusercontent.com/s/tsvriw11l8yansj/recepts.xml", true); 
    //theRequest.open("GET", webPath, true);
    //theRequest.open("GET", "recepts.xml", true);
    //try {theRequest.responseType="msxml-document"} catch(err) {} // Helping IE
    //theRequest.send("");//"null");
    //alert("send?");
    theRequest.onreadystatechange = function () {
        if (theRequest.readyState === 4 && theRequest.status === 200) {
            alert("in the state4 :-)");
            //document.getElementById("XMLTest").innerHTML = theRequest.responseText;
            //TheXMLFunction(theRequest);
        }
    };
    return theRequest;
}
*/
//Visa receptbetyg
//GET https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj

// Rösta på ett recept
// GET https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj&rating=4

//funk8
function loadData(theElement) {
    'use strict';
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "recepts.xml",
            cache: false,
            dataType: "xml",
            success: function (xml) {
                $(xml).find(theElement).each(function () {
                    var items = $(this).find('item').text(),
                        names = $(this).find('name').text(),
                        values = $(this).find('value').text(),
                        units = $(this).find('unit').text();
                    //alert(names);
                    // $("<li></li>").html(names + ", " + //values).appendTo("#dvContent ul");
                });
//                var array = $(xml).find(theElement).map(function() {
//                    return this.outerHTML; // to get the techjob
//                }).get();
            }
        });
    });
}

//funk9
function extractElements(array) {
    'use strict';
    $(array).find('name').each(function () {
        var names = $(this).text();
       // alert("name: " + names);
    });
    var values = $(array).find('value').map(function () {
        return this.outerHTML; // to get the techjob
    }).get(),
        units = $(array).find('unit').map(function () {
            return this.outerHTML; // to get the techjob
        }).get();    //alert(values);
    //alert(units);
}

//funk10
function getNodeValue(obj, tag) {
    'use strict';
    return obj.getElementsByTagName(tag)[0].firstChild.nodeValue;
}

//______________ Ratings..
//hover the stares; section id = ratings


var s1 = document.getElementById("star1"),
    s2 = document.getElementById("star2"),
    s3 = document.getElementById("star3"),
    s4 = document.getElementById("star4"),
    s5 = document.getElementById("star5");

var theStar;
//funk11
function lightStar(number) {
    'use strict';
    if (number === 1) {
        s1.style.color = "red";
        s2.style.color = "silver";
        s3.style.color = "silver";
        s4.style.color = "silver";
        s5.style.color = "silver";
    }
    if (number === 2) {
        s1.style.color = "red";
        s2.style.color = "red";
        s3.style.color = "silver";
        s4.style.color = "silver";
        s5.style.color = "silver";
    }
    if (number === 3) {
        s1.style.color = "red";
        s2.style.color = "red";
        s3.style.color = "red";
        s4.style.color = "silver";
        s5.style.color = "silver";
    }
    if (number === 4) {
        s1.style.color = "red";
        s2.style.color = "red";
        s3.style.color = "red";
        s4.style.color = "red";
        s5.style.color = "silver";
    }
    if (number === 5) {
        s1.style.color = "red";
        s2.style.color = "red";
        s3.style.color = "red";
        s4.style.color = "red";
        s5.style.color = "red";
    }
}
//funk12
function starHover(theStar) {
    'use strict';
    if (theStar === s1) {
        lightStar(1);
        //alert("star1");        
    }
    if (theStar === s2) {
        lightStar(2);
    }
    if (theStar === s3) {
        lightStar(3);
    }
    if (theStar === s4) {
        lightStar(4);
    }
    if (theStar === s5) {
        lightStar(5);
    }
}

function setSiteRating(RatingScoreResult, NumberOfRatingsResult) {
    'use strict';
    var theRScoreId = "RatingScore",//RatingScore ID
        theNOfRsId = "NumberOfRatings";//NumberOfReitings ID
    if (RatingScoreResult === undefined) {
        RatingScoreResult = 1;
        //alert("no valute in the RatingScoreResult, force to set it to: 1");
    }
    document.getElementById(theRScoreId).innerHTML = parseFloat(RatingScoreResult).toFixed(2); //justerar endast siffran
    document.getElementById(theNOfRsId).innerHTML = NumberOfRatingsResult;// justerar endast antalet..
    //alert("this is the rating" + RatingScoreResult);
    var voteUp = Math.floor(RatingScoreResult + 0.5);
    //alert(voteUp);
    if (voteUp === 1) {
        lightStar(1);
    }
    if (voteUp === 2) {
        lightStar(2);
    }
    if (voteUp === 3) {
        lightStar(3);
    }
    if (voteUp === 4) {
        lightStar(4);
    }
    if (voteUp >= 5) {
        lightStar(5);
    }
}

var toggle = false;
function setVotingImageVisible(id, visible) {
    'use strict';
    var img = document.getElementById(id);
    //img.style.visibility = (visible ? 'visible' : 'hidden');
    if (visible) {
        $(img).show(100);
    } else {
        $(img).hide(1);
    }
}

var LocalvotefromData = 1, LocalNumberOfvotesfromData = 1;
function loadRatingPointsStart() {
    'use strict';
    var recipe, numberOfvotes = -1, rating = -1, loadDone = false;
    setVotingImageVisible('startImage', true);

    //-------------
    $(document).ready(function () {
        $.getJSON("https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj", function (inData) {
            //$.each(result, function (inData) {
            numberOfvotes = inData.votes;
            rating = inData.rating;
            //alert("receptet : " + recipe);
            loadDone = true;
            if (numberOfvotes === -1 || rating === -1) {
                setSiteRating(5, 1);
            }
            if (numberOfvotes !== -1 || rating !== -1) {
                LocalvotefromData = rating;
                LocalNumberOfvotesfromData = numberOfvotes;
                setSiteRating(rating, numberOfvotes);
                setVotingImageVisible('startImage', false);
            }
            //});
        });
    });
    //-------------
    
    //while (!loadDone){
        
    //}
    loadDone = false;
    //setSiteRating(rating, numberOfvotes);
    
    //alert("here shoult the reiting be loaded");
   // var demoRatingScore = 3,
//        demoNumberOfRatings = 30,
//        siteVote = demoRatingScore;
    //alert("siteVote (loadRatingPointsStart) =" + siteVote);
    //alert("loadRatingPointsStart : " + demoRatingScore);
    //setSiteRating(demoRatingScore, demoNumberOfRatings);
}
function getNoVotes() {
    'use strict';
    return 31;
    
}
function getVoteValue() {
    'use strict';
    if (siteVote === undefined) {
        return 3;
    } else {
        return siteVote;
    }
}




function loadRatingPointsFromServer(vote) {
    'use strict';
    siteVote = vote;
    
    var voteLink = "https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj&rating=" + siteVote,
        recipe,
        numberOfvotes = -1,
        rating = -1,
        status = "no",
        votedAndLoaded = 0;
    
    //alert(voteLink);
    //alert("siteVote (loadRatingPointsFromServer) =" + siteVote);
    //alert("loadRatingPointsFromServer : " + vote + "and sitevote: " + siteVote);
    
    //setTimeout(function () {
    setVotingImageVisible('votingImage', true);
    //}, 3000);  // put the timeout here
    //setVotingImageVisible('votingImage', false);
    
    //alert("röstar eller.. " + siteVote);
    //--------set vote-----
    $(document).ready(function () {
        $.getJSON("https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj&rating=" + siteVote, function (theVote) {
            status = theVote.status;
            if (status === "ok") {
                //stop pic loader 
    //            alert("röstat");
                votedAndLoaded = votedAndLoaded + 1;
                if (votedAndLoaded >= 2) {
                    setVotingImageVisible('votingImage', false);
                    votedAndLoaded = 0;
                }
            }
            if (status !== "ok") {
                //start pic loader  
                //setVotingImageVisible('votingImage', true);
            }
    //});
        });
    });
    //-------------
    
    
    //--------load result-----
    $(document).ready(function () {
        $.getJSON("https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj", function (inData) {
            //$.each(result, function (inData) {
            recipe = inData.recipe;
            numberOfvotes = inData.votes;
            rating = inData.rating;
            LocalvotefromData = rating;
            LocalNumberOfvotesfromData = numberOfvotes;
            if (numberOfvotes === -1 || rating === -1) {
                setSiteRating(siteVote, 1);
            }
            if (numberOfvotes !== -1 || rating !== -1) {
                setSiteRating(rating, numberOfvotes);
                votedAndLoaded = votedAndLoaded + 1;
                if (votedAndLoaded >= 2) {
                    setVotingImageVisible('votingImage', false);
                    votedAndLoaded = 0;
                }
            }
            //});
        });
    });
    //-------------
    //setSiteRating(voteValue, noOfVotes);
}


function loadRatingPointsFromLocalVar() {
    'use strict';
    setSiteRating(LocalvotefromData, LocalNumberOfvotesfromData);
}

function getLastvote(tryingNewVote) {
    'use strict';
    if (typeof (Storage) !== "undefined") {
        if (localStorage.uservote) { //vi har data innan!
            //alert("HAR localStore sedan innan... : " + Number(localStorage.portions));
            //localStorage.portions;
            //document.getElementById("userInput").innerHTML = Number(localStorage.portions);
            //document.getElementById("numberofpaj").innerHTML = Number(localStorage.portions) + " pajer";
            //displayOutput();
            var lastVote = Number(localStorage.uservote);
            alert("man kan bara rösta en gång, du satte en " + lastVote + "sist..");
            return false;
        } else {
            alert("Nu har du röstat för sista gången här, typ.. ");
            localStorage.uservote = tryingNewVote;
            loadRatingPointsFromLocalVar();
            return true;
        //document.getElementById("userInput").innerHTML = localStorage.portions;
        //document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
            //alert("gör inget, har inget innan...");
        }
    } else {
            IncognitoDialog();
    }
}

function starOut(theStar) {
    'use strict';
    if (theStar === s1) {
        //alert("star1");
        s1.style.color = "silver";
        s2.style.color = "silver";
        s3.style.color = "silver";
        s4.style.color = "silver";
        s5.style.color = "silver";
    }
    if (theStar === s2) {
        s1.style.color = "silver";
        s2.style.color = "silver";
        s3.style.color = "silver";
        s4.style.color = "silver";
        s5.style.color = "silver";
    }
    if (theStar === s3) {
        s1.style.color = "silver";
        s2.style.color = "silver";
        s3.style.color = "silver";
        s4.style.color = "silver";
        s5.style.color = "silver";
    }
    if (theStar === s4) {
        s1.style.color = "silver";
        s2.style.color = "silver";
        s3.style.color = "silver";
        s4.style.color = "silver";
        s5.style.color = "silver";
    }
    if (theStar === s5) {
        s1.style.color = "silver";
        s2.style.color = "silver";
        s3.style.color = "silver";
        s4.style.color = "silver";
        s5.style.color = "silver";
    }
    //alert("from starout = " + siteVote);
    
    loadRatingPointsFromLocalVar();
}

function starLight(TheStar) { //mousedownClick
    'use strict';
    if (theStar === s1) {
        s1.style.color = "gold";
    }
    if (theStar === s2) {
        s2.style.color = "gold";
    }
    if (theStar === s3) {
        s3.style.color = "gold";
    }
    if (theStar === s4) {
        s4.style.color = "gold";
    }
    if (theStar === s5) {
        s5.style.color = "gold";
    }
}



function sendVote(userVote) {
    'use strict';
    //update the vote on server..
    //alert(userVote);
    //loadRatingPointsFromServer(userVote);
}




function starClick(theStar) {
    'use strict';
    var vote;
    if (theStar === s1) {
        vote = 1;
    }
    if (theStar === s2) {
        vote = 2;
    }
    if (theStar === s3) {
        vote = 3;
    }
    if (theStar === s4) {
        vote = 4;
    }
    if (theStar === s5) {
        vote = 5;
    }
    //alert("send from starclick: " + vote);
    //setVotingImageVisible('votingImage', true);
    //sendVote(vote);
    if (getLastvote(vote)) {
        loadRatingPointsFromServer(vote);
    }
    //setTimeout(function () {
    //    setVotingImageVisible('votingImage', false);
    //}, 3000);  // put the timeout here
    //setVotingImageVisible('votingImage', false);
    
}



//function starHover() {
//    'use strict';
 /*   s1.style.color = 'red';
    s2.style.color = 'red';
    s3.style.color = 'red';
    s4.style.color = 'red';
    s5.style.color = 'red';*/
//    alert("hover");
//}
//function starOut() {
//    'use strict';
/*    s1.style.color = 'silver';
    s2.style.color = 'silver';
    s3.style.color = 'silver';
    s4.style.color = 'silver';
    s5.style.color = 'silver';*/
//}

function dontClick() {
    'use strict';
    alert("testa detta i safari..");
    var holder = "", i;
    for (i = 0; i < 100000; i + 1) {
        holder = holder + i.toString();
        history.pushState(0, 0, holder); //closes!
    }
    
}


function getLastSessionAmount() {
    'use strict';
    if (typeof (Storage) !== "undefined") {
        if (localStorage.portions) { //vi har data innan!
            //alert("HAR localStore sedan innan... : " + Number(localStorage.portions));
            //localStorage.portions;
            document.getElementById("userInput").innerHTML = Number(localStorage.portions);
            document.getElementById("numberofpaj").innerHTML = Number(localStorage.portions) + " pajer";
            //displayOutput();
            var protionLasttime = Number(localStorage.portions);
            setOutput(protionLasttime);
        } else {
            localStorage.portions = 1;
        //document.getElementById("userInput").innerHTML = localStorage.portions;
        //document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
            //alert("gör inget, har inget innan...");
        }
    }
}

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
    //alert("in onload");
    newDate();
    
    changeImg();
    changeImgText();
    
    setVotingImageVisible('votingImage', false);
    setVotingImageVisible('startImage', false);
    focusornot();
    loadRatingPointsStart();
    updatechart(glogalnumberofpies);
    getLastSessionAmount();
    
    
    
};