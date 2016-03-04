var averageStars, alert, vote = 2, $, chrome, math;
if (localStorage.pecanAmount === null) {
    localStorage.pecanAmount = 1;
}

if (localStorage.votePecanCheck === null) {
    localStorage.votePecanCheck = 0;
}

function addPortions(inValue, addValue) {
    'use strict';
    math.config({
        number: 'fraction'
    });
    var a = math.number(inValue * addValue), b = math.fraction(a);
    
    return math.format(b, {fraction: 'ratio'});
}

function addPortions(inValue) {
    'use strict';
    math.config({
        number: 'fraction'
    });
    var a = math.number(inValue), b = math.fraction(a);
    
    return math.format(b, {fraction: 'ratio'});
}
var originalSizePecanP = [5 / 2, 1 / 2, 150, 1 / 2, 1 / 2, 4 / 2];
var originalSizePecanFyllning = [2, 125, 3 / 2, 1 / 2, 3, 2, 1, 150];

function prependPPaj(portion) {
    'use strict';
    $("#pancake li").each(function (index) {
        if (index < 5) {
            var size = originalSizePecanP[index] * portion, count = 0, i;
            for (i = size; i >= 1; i = i - 1) {
                count = count + 1;
                size = size - 1;
            }
            var stringcount = count + " ", fraction = addPortions(size);
            $(this).html($(this).text().replace(/\d\S\d+/g, ''));
            $(this).html($(this).text().replace(/\d\s\d\S\d+/g, ''));
            $(this).html($(this).text().replace(/\d+\s/g, ''));
            if (size !== 0) {
                $(this).prepend(fraction);
            }
            if (count > 0) {
                $(this).prepend(stringcount);
            }
        }
    });
}

function prependFyllning(portion) {
    'use strict';
    $("#filling li").each(function (index) {
        var size = originalSizePecanFyllning[index] * portion, count = 0, i;
        for (i = size; i >= 1; i = i - 1) {
            count = count + 1;
            size = size - 1;
        }
        var stringcount = count + " ";
        var fraction = addPortions(size);
        $(this).html($(this).text().replace(/\d\S\d+/g, ''));
        $(this).html($(this).text().replace(/\d\s\d\S\d+/g, ''));
        $(this).html($(this).text().replace(/\d+\s/g, ''));
        if (size !== 0) {
            $(this).prepend(fraction);
        }
        if (count > 0) {
            $(this).prepend(stringcount);
        }
    });
}





function appendParagraf(portion) {
    'use strict';
    $("#numberOf").html($("#numberOf").text().replace(/\d/g, ''));
    $("#numberOf").append(portion);
}

function getPortionsPecan() {
    'use strict';
    var numberOfPortions = document.getElementById("pecanPies").value;
    prependFyllning(numberOfPortions);
    prependPPaj(numberOfPortions);
    appendParagraf(numberOfPortions);
}

function changePecanAmount(factor) {
    'use strict';
    document.getElementById("numberOf").innerHTML = factor;
    localStorage.pecanAmount = factor;
	getPortionsPecan();
}

$(document).ready(function () {
    'use strict';
    $("#pecanPies").val(localStorage['pecanAmount']);
    changePecanAmount(localStorage['pecanAmount']);
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
    var i = 1, maxi = 100;
    $(".rate").click(function () {
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
        vote = ($(this).attr("id"));
        $("#loading").show();
        $.ajax({
            method: "GET",
            url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7db3379c942dc44&recipe=pecanpaj&rating=" + vote,
            success: function () {
                $("#loading").hide();
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