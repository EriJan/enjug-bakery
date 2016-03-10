
        /*for (i = 0; i < maxi; i++) {
        var v = 5
        $("#loading").show();
        $.ajax({
        method: "GET",
        url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj&rating=" + v,
        success: function() {
        $("#loading").hide();
        $("#average").getVotes();
        }
        });
        }
 */

//          url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj&rating=" + vote,
//        url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj",


var vote = 0;
var averageStars;
var $;
var quantityList1 = document.getElementsByClassName("q1List");
var quantityList2 = document.getElementsByClassName("q2List");
var isFyllning = false;
var alert;

var pecanPie = [2.5, 0.5, 150, 0.5, 0.5, 0.5, 0.5 ];
var pecanFilling = [2, 125, 1.5, 0.5, 3, 2, 1, 150 ];

if (localStorage.pecanAmount === null) {
    localStorage.pecanAmount = 1;
    changeAmount(this.value);
}

if (localStorage.voteCheckPecan === null) {
    localStorage.voteCheckPecan = 0;
}

function autoList(factor, type) {
    'use strict';
    if (type === "pecanPie") {
        var index1 = 0, arrayLength1 = quantityList1.length;
        for (index1 = 0; index1 < arrayLength1; index1 = index1 + 1) {
            quantityList1[index1].innerHTML = pecanPie[index1] * factor;
        }
    } else {
        var index2 = 0, arrayLength2 = quantityList2.length;
        for (index2 = 0; index2 < arrayLength2; index2 = index2 + 1) {
            quantityList2[index2].innerHTML = pecanFilling[index2] * factor;
        }
    }
}

function changeAmount(factor) {
    'use strict';
    if (factor < 1 || factor > 10) {
        factor = 1;
        document.getElementById("pies").innerHTML = factor;
    }
    localStorage.pecanAmount = Number(factor);
    //localStorage.pecanAmount = factor;
    autoList(factor, "pecanPie");
	autoList(factor, "fyllning");
}

$(document).ready(function () {
    'use strict';
    $("#pies").val(localStorage['pecanAmount']);
    $("#average").getVotes();
    $(".rate").hover(function () {
        $(this).prevAll().andSelf().css("color", "orange");
        $(this).nextUntil("#" + averageStars).css("color", "yellow");
        if ($(this).attr("id") <= averageStars) {
            $("#" + averageStars).nextAll().css("color", "black");
            $("#" + averageStars).css("color", "yellow");
        }
        $(this).css("color", "orange");
    });
    
    $(".rate").mouseleave(function () {
        $("#" + vote).nextAll().css("color", "yellow");
        if (vote === 0) {
            $(".rate").css("color", "yellow");
        }
        $("#" + averageStars).nextAll().css("color", "black");
        $("#" + vote).prevAll().andSelf().css("color", "orange");
    });
    
    $(".rate").click(function () {
        vote = ($(this).attr("id"));
        $(".rating").show();
        $.ajax({
            method: "GET",
            url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj&rating=" + vote,
            success: function () {
                $(".rating").hide();
                $("#average").getVotes();
            }
        });
        $(this).animate({fontSize: '45px'}, 100);
        $(this).animate({fontSize: '30px'}, 100);
        $(this).prevAll().andSelf().css("color", "orange");
        $(this).prevAll().css("fontSize", 24);
        $(this).nextAll().css("fontSize", 24);
        
    });
});

$.fn.getVotes = function () {
    'use strict';
    $("#average").text("");
    $("#loading").show();
    $.ajax({
        method: "GET",
        url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj",
        success: function (data) {
            $("#loading").hide();
            $("#average").text(data.rating.toFixed(2) + " av " + data.votes + " röster");
            averageStars = data.rating.toFixed(0);
            $("#" + averageStars).prevAll().andSelf().css("color", "yellow");
            $("#" + averageStars).nextAll().css("color", "black");
        }
    });
};