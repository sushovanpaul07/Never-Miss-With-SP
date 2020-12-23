var i=0;
$('#toggleicon').on('click',function(){
    if(i==0)
    {
        i=1;
        $('#sidebar').css('width','7.5vh');
        $('#shrinker').css('display','none');
        $('.tohide').css('display','none');
        $('#holder').css('margin-left','10.5vh');
        

    }
    else
    {
        i=0;
        $('#sidebar').css('width','40vh');
        $('#shrinker').delay(400).css('display','flex');
        $('.tohide').css('display','block');

        $('#holder').css('margin-left','43vh');

    }
})


$('.cards').hover(function(){
    $(this).css('transform','scale(1.0)');

},function(){
    $(this).css('transform','scale(0.9)');
})

$('#popup-si').on('click',function(){
    $('#signin-panel').css('display','block');
})

$('#popup-su').on('click',function(){
    $('#signup-panel').css('display','block');
})

$('#close-btn1').on('click',function(){
    $('#signin-panel').css('display','none');
})  

$('#close-btn2').on('click',function(){
    $('#signup-panel').css('display','none');
})  