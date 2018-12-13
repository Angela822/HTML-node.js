$(function(){
    var len = 150; // 超過50個字以"..."取代
    $(".text2").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
        }
    });
	
	
});