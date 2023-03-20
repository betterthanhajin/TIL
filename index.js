var cnt = 0;
var i = 0;
var index = 0;//tabindex
var widthSum = 0;
var src = null;
const titleArr = [];
const tabArr = [];
var same = true;
var msg = ''; 
var active = false;
var paramTitle = '';
var idx = 0;
var k = 0;

var fnLoadContents = function(_obj, _src , title) {
	paramTitle = title;
	var container =  document.getElementsByClassName("container");
	var tab = document.createElement('div');
	
	if(title !== undefined){
		
		$('#tabArea').css('display','block');
		$('.tabContainer').css('display', 'block');
		$('#contents_area').css('display', 'none');
		paramTitle = title;
		
		src = _src;
		tab.id = 'tab' +idx;
		//tab메뉴개수제한 10개이상 리턴
	    if($('.tablink').length >= 10){
	    	alert("더이상 탭을 추가할수 없습니다");
	    	return;
	    }

		for(var i = 0; i < titleArr.length; i++) {
			if(i < idx ){
			  	if(titleArr[i] === title){
		    		msg = 'same';
		    		same = true;
		    		active(title);
		    		return;
		    	}
			}

	    }

    	titleArr.push(title);
    	alert(JSON.stringify(titleArr));
		$(tab).addClass('tablink');
		tabArr.push(tab);
		const close = document.createElement('div');
		$(close).addClass('closed');
	    $("#tab"+idx).attr("href", _src);
	  	$(tab).text(title);
	    $(tab).append(close);
	    $('.tabContainer').append(tab);
		if(idx === 0){
			widthSum = widthSum + $("#tab"+(idx)).outerWidth();
			$("#tab"+idx).css("left", 19 + 'px');
			widthSum = widthSum + 10 + 19;
		}else {
			$("#tab"+idx).css("left", (widthSum)+ 'px');
			 widthSum = widthSum + $("#tab"+(idx)).outerWidth();
			 widthSum =  widthSum +  10;
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
		//title에따른 height길이
		switch(title){
			case '사전심의목록': { fnIframeResize(undefined); break;}
			case '심의결과': { fnIframeResize($("body").height()+100); break; }
			case '사엄장별현황': { fnIframeResize($("body").height()+100); break; }
			case '완료심의목록': { fnIframeResize($("body").height()); break; }
		}
		
	}else if(title === undefined){//dashboard only
		$('#contents_area').css('display', 'block');
		$('#tabArea').css('display','none');
		$('.tabContainer').css('display', 'none');
		$('#contents_area').attr('src', '${contextPath}/globalcj/bpms/bpms.dashboard');
		return;
	}
};

$(document).on('click','.tablink' , function(e){
	//alert(e.target.textContent);
	var href = $(e).attr("href");
	var text =  $(e.target).text();
	var flag = false;
	var closed = false;
	same = false;
    if($('.tablink').length >= 10){
    	return;
    }
	
   	
	for(var i = 0; i < titleArr.length; i++) {
	    if(titleArr[i] === e.target.textContent) {
			flag = true;//중복여부
			alert(flag);
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
		if(e.target.textContent === ''){
			return;
		}
		if(flag){
			alert(e.target.textContent);
			for(var i = 0; i < titleArr.length; i++) {
				if(titleArr[i] === e.target.textContent){//중복의경우
					$($('.tablink')[i]).addClass("active");
					$($('.tablink')[i]).removeClass("nonactive");
					$($('.tabContent')[i]).css("display", "block");
				}else{//중복아닌애들
					$($('.tabContent')[i]).css("display", "none");
					$($('.tablink')[i]).removeClass("active");//tab활성화
					$($('.tablink')[i]).addClass("nonactive");
				}
			}

		}
	
	} 
});

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

var fnIframeResize = function(height) {
    if(height != undefined) {
        $('.tabContent').css("height", height + "px");
    }else{
     	$('.tabContent').css("height", 100 + "vh");
    }
};

//tab delete
$(document).on('click','.closed' , function(e){
	alert(e.target.parentElement.textContent);
	alert(JSON.stringify(tabArr));
	for(var i = 0; i < titleArr.length; i++) {
	    if(titleArr[i] === e.target.parentElement.textContent) {
	    	$('.tablink')[i].parentNode.removeChild($('.tablink')[i]);
	    	$('.tabContent')[i].parentNode.removeChild($('.tabContent')[i]);
	    	titleArr.splice(i,1);
	    	alert(titleArr[i]);
		}	
	}
});