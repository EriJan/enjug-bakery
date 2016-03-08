var numberOfClick = 0;
var numberOfPortions = 1;
var starBoxClick = 1;

 $("document").ready(function() {
    
    $("#slider[type=range]").val(localStorage.getItem("numberOfPortions"));
    getPortions();
 });


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
