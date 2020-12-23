const colors=[
    ["#282828","#676767","#000000"],//bittersweet and yellow green
    ["#282828","#676767","#000000"],//pink and purple
    ["#282828","#676767","#000000"],//light orange and green
    ["#282828","#676767","#000000"],//shades of purple
    ["#282828","#676767","#000000"]//blue and red
]

var a=Math.ceil(Math.random()*colors.length)
$('body').css('background-color',colors[a][0]);

$('.side-panel').css('background-color',colors[a][1]);
$('.side-panel').css('box-shadow','10px 11vh 20px 2px '+colors[a][2]);

$('.logo').css('color',colors[a][2]);


$('.nav-bar').css('background-color',colors[a][1]);
$('.nav-links').css('color',colors[a][2]);
$('.btns').css('color',colors[a][2]);


$('.nav-links').hover(function(){
    $(this).css('color',colors[a][0]);
},function(){
    $(this).css('color',colors[a][2]);

});

$('.btns').hover(function(){
    $(this).css('background-color',colors[a][1]);
},function(){
    $(this).css('background-color','white');

});


// $('.nav-bar').css('box-shadow','0px 1vh 15px 2px '+colors[a][2]);

$('.cards').hover(function(){
    $(this).css('box-shadow','0px 0px 30px 2px '+colors[a][2])
    $(this).css('transform','scale(1.05)');

},function(){
    
    $(this).css('box-shadow','0px 0px 20px  rgb(20, 20, 20)')
    $(this).css('transform','scale(1)');
})

$('.cards').mousedown(function(){
    $(this).css('transform','scale(1)');
})
$('.cards').mouseup(function () { 
    $(this).css('transform','scale(1.05)');
    
});
