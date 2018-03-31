var isOpened=true;

$(function(){
    //------------------------------------
    // 標題列動畫
    //------------------------------------	
    $('.opener').mousedown(function(){
        if(isOpened){
            //標題列動畫
            $(this).parent().stop().animate({top:-80}, {duration:500, easing:'easeOutElastic'});
			
            //logo移動
            //$(this).stop().animate({top:50}, {duration:500, easing:'easeOutElastic'});			
			
            isOpened=false;
        }else{
            //標題列動畫			
            $(this).parent().stop().animate({top:0}, {duration:100});
			
            //logo移動			
           // $(this).stop().animate({top:20}, {duration:500, easing:'easeOutElastic'});			
	
            isOpened=true;			
        }
    })		
    //------------------------------------// JavaScript Document
});