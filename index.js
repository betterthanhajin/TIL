var fnLoadContents = function(_obj, _src , title) {
	paramTitle = title;
	var container =  document.getElementsByClassName("container");
	var tab = document.createElement('div');
	if(title !== undefined){
		paramTitle = title;
		alert("title"+ paramTitle);
		src = _src;
		tab.id = 'tab' +idx;
		//tab메뉴개수제한 10개이상 리턴
	    if($('.tablink').length >= 10){
	    	alert("더이상 탭을 추가할수 없습니다");
	    	return;
	    }
	    //중복탭메뉴 추가못하게
	    alert(titleArr.size);
	   
    	if(titleArr.has(title)){
    		msg = 'same';
    		same = true;
    		active(title);
    		return;
    	}else{
    		same = true;
    	}
    	titleArr.add(title);
		$(tab).addClass('tablink');
	    $('#tabArea').append(tab);
	    $('#contents_area').attr('src', _src);
	    $("#tab"+idx).attr("href", _src);
	    $("#tab"+idx).text(title);
	//	if(idx > index){
			widthSum = 0;
			for(var i = 0; i < idx; i++){
				widthSum = widthSum + $("#tab"+(i)).outerWidth();
				alert(widthSum);
				if(i === idx){
					alert("Break");
					break;
				}else{
					alert("idx" + idx);
					if(idx === 1){
						alert("111");
						idx = 1;
						$("#tab"+idx).css("left", (widthSum) + (40 * idx) + 'px');
						continue;
					}
					$("#tab"+idx).css("left", (widthSum) + (30 * idx) + 'px');
					alert("xktda");
				}
				//$("#tab"+idx).css("margin-left", (30) + 'px');
			}
		//}
		index = idx;
 		for(var i = 0; i < $('.tablink').length; i++){
			if((i === $('.tablink').length - 1)){
				alert("뭐징");
				$($('.tablink')[i]).addClass("active");
			}else{
				$($('.tablink')[i]).removeClass("active");
			}
			
			if($($('.tablink')[i]).hasClass("active")){	
				$($('.tabContent')[i]).css("display", "block");
			}else{
				$($('.tabContent')[i]).css("display", "none");
			}
			
			}
		idx++;
	    fnIframeResize();
	}else if(title === undefined){
		$('#contents_area').attr('src', '${contextPath}/globalcj/bpms/bpms.dashboard');
		fnIframeResize();
	}
};

$(document).on('click','#tab'+ idx , function(e){
    $('#contents_area').css('display', 'none');
	alert("wpqkf");
	var href = $(e.target).attr("href");
	alert("href"+href);
	var flag = false;
	var closed = false;
    if($('.tablink').length >= 10){
    	return;
    }
	alert("반응");
	alert(same);
	//for(var i = 0; i < $('.tablink').length; i++){
		if($(e.target).attr("href") !== $($('.tablink')[i]).attr('href')){
			href = $($('.tablink')[$('.tablink').length - 1]).attr('href');
			//alert("**e" + e.target);
			fnIframeResize();
			if(!same){
				alert("afasdfsdf");
				return;
			}else{
				alert("생성");
				$($('.tablink')[i]).addClass("active");
				$('<iframe>', {
					   src: href,
					   id:  'myFrame',
					   class: 'tabContent',
					   frameborder: 0,
					   scrolling: 'no'
					   }).appendTo('.container');	
			}
		}else{
			flag = true;//중복여부
		}
	//}
	
		for(var i = 0; i < $('.tablink').length; i++){
		if((i === $('.tablink').length - 1)){
			//alert("뭐징");
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
				alert("중복");
				$($('.tablink')[i]).addClass("active");
				$($('.tabContent')[i]).css("display", "block");
			}else{//중복아닌애들
				$($('.tabContent')[i]).css("display", "none");
				$($('.tablink')[i]).removeClass("active");//tab활성화
			}
		}
		
		} 
});


	
var active = function(title) {
	alert('active');
	alert(title);
	for(var i = 0; i < $('.tablink').length; i++){
		if($($('.tablink')[i]).text() === title){//중복의경우
			alert("중복2222");
			$($('.tablink')[i]).addClass("active");
			$($('.tabContent')[i]).css("display", "block");
			same = false;
		}else{//중복아닌애들
			$($('.tabContent')[i]).css("display", "none");
			$($('.tablink')[i]).removeClass("active");//tab활성
		}
	}
}

var fnIframeResize = function(p_height) {
    if(p_height != undefined) {
        $('#contents_area').css("height", p_height + "px");
        //$('.tabContent').css("height", p_height + "px");
    }else{
       $('#contents_area').css("height", 99 + "%");
    }
};