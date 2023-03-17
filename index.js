
var cnt = 0;
var i = 0;
var index = 0;//tabindex
var widthSum = 0;
var src = null;
const titleArr = new Set();
var same = true;
var msg = ''; 
var active = false;
var paramTitle = '';
var idx = 0;

var fnLoadContents = function(_obj, _src , title) {
	paramTitle = title;
	var container =  document.getElementsByClassName("container");
	var tab = document.createElement('div');
	
	if(title !== undefined){
		$('#tabArea').css('display','block');
		$('#contents_area').css('display', 'none');
		paramTitle = title;
		//alert("title"+ paramTitle);
		src = _src;
		tab.id = 'tab' +idx;
		//tab메뉴개수제한 10개이상 리턴
	    if($('.tablink').length >= 10){
	    	alert("더이상 탭을 추가할수 없습니다");
	    	return;
	    }
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
		const close = document.createElement('div');
		$(close).addClass('closed');
		$(close).text("Xsafdsfsadfs");
		//alert("X");
		$(tab).appendTo(close);
	    $('#tabArea').append(tab);
	    $("#tab"+idx).attr("href", _src);
	    $("#tab"+idx).text(title);
		var first = false;
		if(idx === 0){
			widthSum = widthSum + $("#tab"+(idx)).outerWidth();
			alert("idx 0");
			$("#tab"+idx).css("left", 19 + 'px');
			first = true;
			widthSum = 0;
		}
		else{
			widthSum = widthSum + $("#tab"+(idx)).outerWidth();
			alert("for" + widthSum);
			first = false;
		}

		if(!first){
			alert("false");
			alert(widthSum);
			$("#tab"+idx).css("left", (widthSum) + (30 * idx) + 'px');
		}
		index = idx;
		
		$('<iframe>', {
			   src: _src,
			   id:  'myFrame',
			   class: 'tabContent',
			   frameborder: 0,
			   scrolling: 'no'
			   }).appendTo('.container');
		
 		for(var i = 0; i < $('.tablink').length; i++){
			if((i === $('.tablink').length - 1)){
				$($('.tablink')[i]).addClass("active");
				$($('.tablink')[i]).removeClass("nonactive");
			}else{
				$($('.tablink')[i]).removeClass("active");
				$($('.tablink')[i]).addClass("nonactive");
			}
			
			if($($('.tablink')[i]).hasClass("active")){	
				$($('.tabContent')[i]).css("display", "block");
			}else{
				$($('.tabContent')[i]).css("display", "none");
			}
			
			}
		idx++;
	    fnIframeResize();
	}else if(title === undefined){//dashboard only
		$('#contents_area').css('display', 'block');
		$('#tabArea').css('display','none');
		$('#contents_area').attr('src', '${contextPath}/globalcj/bpms/bpms.dashboard');
		fnIframeResize();
		return;
	}
};

$(document).on('click','.tablink' , function(e){
	var href = $(e.target).attr("href");
	var text =  $(e.target).text();
	var flag = false;
	var closed = false;
	same = false;
    if($('.tablink').length >= 10){
    	return;
    }

	for(var i = 0; i < $('.tablink').length; i++){
		if($(e.target).attr("href") === $($('.tablink')[i]).attr('href')){
			flag = true;//중복여부
		}else{
			flag = false;
		}
	}

	if(!same){
		flag = true;
	}
		
	if(!flag){
		$('<iframe>', {
			   src: href,
			   id:  'myFrame',
			   class: 'tabContent',
			   frameborder: 0,
			   scrolling: 'no'
			   }).appendTo('.container');	
	}

		

	for(var i = 0; i < $('.tablink').length; i++){
		if((i === $('.tablink').length - 1)){
			$($('.tablink')[i]).addClass("active");
			$($('.tablink')[i]).removeClass("nonactive");
		}else{
			$($('.tablink')[i]).removeClass("active");
			$($('.tablink')[i]).addClass("nonactive");
		}
		
		if($($('.tablink')[i]).hasClass("active")){	
			$($('.tabContent')[i]).css("display", "block");
		}else{
			$($('.tabContent')[i]).css("display", "none");
		}
		
		if(flag){
			//중복체크
			if($(e.target).attr("href") === $($('.tablink')[i]).attr('href')){//중복의경우
				//alert("중복");
				$($('.tablink')[i]).addClass("active");
				$($('.tablink')[i]).removeClass("nonactive");
				fnIframeResize();
				$($('.tabContent')[i]).css("display", "block");
			}else{//중복아닌애들
				$($('.tabContent')[i]).css("display", "none");
				$($('.tablink')[i]).removeClass("active");//tab활성화
				$($('.tablink')[i]).addClass("nonactive");
			}
		}
	
	} 
});

const closedFunc = function(text) {
	alert(text);
	if(titleArr.has(text)){
		for(var i = 0; i < $('.tablink').length; i++){
			if($($('.tablink')[i]).text() === title){
				$($('.tablink')[i]).css("display",'none');
				$($('.tabContent')[i]).css("display", "none");
				break;
			}
		}
	}
}

var active = function(title) {
	alert('active');
	alert(title);
	for(var i = 0; i < $('.tablink').length; i++){
		if($($('.tablink')[i]).text() === title){//중복의경우
			$($('.tablink')[i]).addClass("active");
			$($('.tablink')[i]).removeClass("nonactive");
			$($('.tabContent')[i]).css("display", "block");
			same = false;
		}else{//중복아닌애들
			$($('.tabContent')[i]).css("display", "none");
			$($('.tablink')[i]).removeClass("active");//tab활성
			$($('.tablink')[i]).addClass("nonactive");
		}
	}
}

var fnIframeResize = function(p_height) {
    if(p_height != undefined) {
        $('#contents_area').css("height", p_height + "px");
    }else{
       $('#contents_area').css("height", 99 + "%");
    }
};