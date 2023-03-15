var cnt = 0;
var index = 0;
var i = 0;
var index = 0;//tabindex
var widthSum = 0;
var src = null;


var fnLoadContents = function(_obj, _src , title) {
	var tabArr = [];
	//alert(title);
	if(title !== undefined){
		src = _src;
		var container =  document.getElementsByClassName("container");
		var tab = document.createElement('div');
		tab.id = 'tab' +idx;
		$(tab).addClass('tablink');
	    $('#tabArea').append(tab);
	    $('#contents_area').attr('src', _src);
	    $("#tab"+idx).attr("href", _src);
	    $("#tab"+idx).text(title);
		if(idx > index){
			widthSum = 0;
			for(var i = 0; i < idx; i++){
				widthSum = widthSum + $("#tab"+(i)).outerWidth();
				if(idx === 0){
					$("#tab"+idx).css("left", widthSum + 19 + 'px');
				}
				$("#tab"+idx).css("left", widthSum + 'px');
			}
		}
		index = idx;
	    idx++;
	    fnIframeResize();
	}else if(title === undefined){
		$('#contents_area').attr('src', '${contextPath}/globalcj/bpms/bpms.dashboard');
		fnIframeResize();
	}
};

$(document).on({
	click: function(e){
		var href = $(e.target).attr("href");
		var flag = false;
		$('#contents_area').css('display', 'none');
		if($(e.target).attr("href") === '#'){
			href = $($('.tablink')[$('.tablink').length - 1]).attr('href');
			fnIframeResize();
			$('<iframe>', {
				   src: href,
				   id:  'myFrame',
				   class: 'tabContent',
				   frameborder: 0,
				   scrolling: 'no'
				   }).appendTo('.container');
				
		}else{
			flag = true;//중복여부
		}

		for(var i = 0; i < $('.tablink').length; i++){
			if(i === $('.tablink').length - 1){
				$($('.tablink')[i]).addClass("active");
			}else{
				$($('.tablink')[i]).removeClass("active");
			}
			
			if($($('.tablink')[i]).hasClass("active")){
				$($('.tabContent')[i]).css("display", "block");
			}else{
				$($('.tabContent')[i]).css("display", "none");
			}
			
			if(flag){
				//중복체크
				if($(e.target).attr("href") === $($('.tablink')[i]).attr('href')){//중복의경우
					$($('.tablink')[i]).addClass("active");
					$($('.tabContent')[i]).css("display", "block");
				}else{//중복아닌애들
					$($('.tabContent')[i]).css("display", "none");
					$($('.tablink')[i]).removeClass("active");//tab활성화
				}
			}
			
		}
	
	}
})


var fnIframeResize = function(p_height) {
    if(p_height != undefined) {
        $('#contents_area').css("height", p_height + "px");
        $('.tabContent').css("height", p_height + "px");
    }else{
       $('#contents_area').css("height", 99 + "%");
    }
};