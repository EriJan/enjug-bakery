var applePie = {
    Äpplen:5,
    Smör:150,
    Socker:1.5,
    Havregryn:3,
    Mjöl:1.5,
    Bakpulver:0.5,
    Sirap:0.5,
    Mjölk:2
};

var vote = 0;
var averageStars;
var quantityList = document.getElementsByClassName("qList");
if (localStorage.pieAmount == null) {
    localStorage.pieAmount = 1;
}

if (localStorage.voteCheck == null) {
    localStorage.voteCheck = 0;
}

function autoList(factor){
    var index = 0;
    for(var i in applePie) {
    quantityList[index].innerHTML = applePie[i]*factor;
    index++;
    }
}

function changeAmount(factor)
{
	document.getElementById("amount").innerHTML=factor;
    localStorage.pieAmount = factor;
    autoList(factor);
}

$(document).ready(function(){
    $("#pies").val(localStorage['pieAmount']);
    $("#average").getVotes();
    $(".rate").hover(function(){
        $(this).prevAll().andSelf().css("color", "orange");
        $(this).nextUntil("#"+averageStars).css("color", "yellow");
        if ($(this).attr("id") <= averageStars){
                $("#"+averageStars).nextAll().css("color", "black");
                $("#"+averageStars).css("color", "yellow");
            }
        $(this).css("color", "orange");
    });
    
    $(".rate").mouseleave(function(){
        $("#"+vote).nextAll().css("color", "yellow");
        if (vote == 0){
            $(".rate").css("color", "yellow");
        }
        $("#"+averageStars).nextAll().css("color", "black");
        $("#"+vote).prevAll().andSelf().css("color", "orange");
    });
    
    $(".rate").click(function(){
        vote = ($(this).attr("id"));
        $("#loading").show();
        $.ajax({
            method: "GET",
            url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7607304c8de1b93&recipe=applepiemarcus&rating=" + vote,
            success: function() {
                $("#loading").hide();
                $("#average").getVotes();
            }
        })
        $(this).animate({fontSize: '45px'},100);
        $(this).animate({fontSize: '30px'},100);
        $(this).prevAll().andSelf().css("color", "orange");
        $(this).prevAll().css("fontSize", 24);
        $(this).nextAll().css("fontSize", 24);
        
    });
});

$.fn.getVotes = function () {
        $("#average").text("");
        $("#loading").show();
        $.ajax({
        method: "GET",
        url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=d7607304c8de1b93&recipe=applepiemarcus",
        success: function(data) {
            $("#loading").hide();
            $("#average").text(data.rating.toFixed(2) + " av " + data.votes + " röster");
            averageStars = data.rating.toFixed(0);
            $("#"+averageStars).prevAll().andSelf().css("color", "yellow");
            $("#"+averageStars).nextAll().css("color", "black");
        }, 
    });
};