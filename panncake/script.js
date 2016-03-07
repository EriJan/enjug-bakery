var numberOfClick = 0;
var numberOfPortions = 1;
var starBoxClick = 1;

 $("document").ready(function() {
    
    reBind();
    getData();
    $("#slider[type=range]").val(localStorage.getItem("numberOfPortions"));
    getPortions();
     
    $(window).load(function(){
    $(".loader").html("<img src='ajax-loader.gif'>");
     });
       
     $(document).ajaxStart(function() {
         $(".loader").show();
     });

     $(document).ajaxComplete(function(){  
         $(".loader").hide();
     });
     
     $(".animatediv").mouseover(function(){
        $(".column").animate({
            opacity: 1.0
        },3000, "easeInQuad", function(){
            
        });
     });  

     
    $(".starbox").click(function(){
        if(starBoxClick % 2 === 0){
            reBind();
        } else {
            unDoBindings();
        }
        starBoxClick++;
    });
 });

function reBind(){
    $(".starbox img").each(function(index){
        var nr = index + 1;
        $(this).click(function(){
        $(".starbox img").each(function(index){
        if(index < nr){
        $(this).attr("src", "filledStar.png");
        }             
    });
                
        numberOfClick++;
        sessionStorage.setItem("numberOfClick", numberOfClick);
        $.ajax({
            method: "GET",
            url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=698db01736ec3abd&recipe=pannkakst%C3%A5rta&rating="+nr,
            success: function(data){
                $(thanks).text("Tack för din röst! Du har röstat " + sessionStorage.getItem("numberOfClick") + " gånger");
                getData(); 
                }
            });
        });
    });
    
    
    $(".starbox img").each(function(index){
        $(this).mouseleave(function(){
            $(".starbox img").each(function(index){
         $(this).attr("src", "unFStar.png");
            });    
        });
    });  
    
    
       $(".starbox img").each(function(index){
           var nr = index + 1; 
            $(this).mouseover(function(){
            $(".starbox img").each(function(index){
                if(index < nr){
                    $(this).attr("src", "filledStar.png");
                }    
            });
        });
    }); 
}


function unDoBindings(){
    $(".starbox img").each(function(index){
        $(this).unbind("mouseover");
        $(this).unbind("mouseleave"); 
        $(this).unbind("click");
        });  
}



function addPortions(inValue, addValue) {
    math.config({
  number: 'fraction' 
});
    var a = math.number(inValue * addValue);
    var b = math.fraction(a);
    
    return math.format(b, {fraction: 'ratio'});    
}

function addPortions(inValue) {
    math.config({
  number: 'fraction' 
});
    var a = math.number(inValue);
    var b = math.fraction(a);
    
    return math.format(b, {fraction: 'ratio'});    
}

var originalSizePannkaka = [1, 1/3, 2/3, 1/3, 1/3];
var originalSizeFyllning = [4/5, 1, 1, 1/2, 2/3];

function getPortions (){ 
    if(document.getElementById("numCakes") == null){
        numberOfPortions = localStorage.getItem("numberOfPortions");
    } else {
    numberOfPortions = document.getElementById("numCakes").value;
    }

    prependFyllning(numberOfPortions);
    prependPannkaka(numberOfPortions);
    appendParagraf(numberOfPortions);
    localStorage.setItem("numberOfPortions", numberOfPortions);
}

function prependPannkaka(portion){
     $("#pancake li"). each(function(index){
         if(index < 5){
             var size = originalSizePannkaka[index] * portion; 
             var count = 0;
             for(var i = size; i >= 1; i--){
                 count++;
                 size--;
             }
             var stringcount = count + " ";
             var fraction = addPortions(size);
            $(this).html($(this).text().replace(/\d\S\d+/g,''));
             $(this).html($(this).text().replace(/\d\s\d\S\d+/g,''));
             $(this).html($(this).text().replace(/\d+\s/g,''));
             if(size != 0){
        $(this).prepend(fraction);
             }
             if(count > 0){
         $(this).prepend(stringcount);
             }
         }    
    });
}

function prependFyllning(portion){
      $("#filling li"). each(function(index){      
             var size = originalSizeFyllning[index] * portion; 
             var count = 0;
             for(var i = size; i >= 1; i--){
                 count++;
                 size--;
             }
             var stringcount = count + " ";
             var fraction = addPortions(size);
            $(this).html($(this).text().replace(/\d\S\d+/g,''));
             $(this).html($(this).text().replace(/\d\s\d\S\d+/g,''));
             $(this).html($(this).text().replace(/\d+\s/g,''));
             if(size != 0){
        $(this).prepend(fraction);
             }
             if(count > 0){
         $(this).prepend(stringcount);
             }
    }); 
}

function appendParagraf(portion){
    $("#numberOf").html($("#numberOf").text().replace(/\d/g, ''));
    $("#numberOf").append(portion);
}


  function getData(){
     $.ajax({
        method: "GET",
        url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=698db01736ec3abd&recipe=pannkakst%C3%A5rta",
         beforeSend: function(){
            //$(".loader").show();
             console.log("I before send");
            
         },
        success: function(data) {
            $("#rating").text("Pannkakstårtans betyg: "+data.rating.toFixed(2));  
            $("#ratingPanncake").text(data.rating.toFixed(2));
            $("#votes").text("Antal röster: "+data.votes);  
          //  $(".loader").hide(); 
             console.log("I success");
        }, 
         
    }); 
   }