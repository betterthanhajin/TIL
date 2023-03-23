var cnt = 0;
var i = 0;
var index = 0;//tabindex
var widthSum = 0;
var src = null;
var srcArr = [];
var titleArr = [];
var same = true;
var msg = ''; 
var active = false;
var draw = false;
var paramTitle = '';
var idx = 0;
var k = 0;

//create + add tab
var fnLoadContents = function(_obj, _src , title) {
	//alert(title);
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
		$(tab).addClass('tablink');
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
				$($('.closed:after')[i]).css("color", '#0088FE important');
			}
			
			if($($('.tablink')[i]).hasClass("active")){	
				$($('.tabContent')[i]).css("display", "block");
			}else{
				$($('.tabContent')[i]).css("display", "none");
			}
			}
		//alert("src" + src);
		srcArr.push(src);
		idx++;
		height(title);

		
	}else if(title === undefined){//dashboard only
		$('#contents_area').css('display', 'block');
		$('#tabArea').css('display','none');
		$('.tabContainer').css('display', 'none');
		$('#contents_area').attr('src', '${contextPath}/globalcj/bpms/bpms.dashboard');
		return;
	}
};

const height = function(title){
	//title에따른 height길이 더 좋은방법이있다면 바꿀예정
	//alert(title);
	switch(title){
		case '사전심의목록': { fnIframeResize($("body").height()); break;}
		case '심의결과': { fnIframeResize($("body").height()+300); break; }
		case '사엄장별현황': { fnIframeResize($("body").height()+100); break; }
		case '완료심의목록': { fnIframeResize($("body").height()); break; }
		case '사업장별현황(완료)': { fnIframeResize($("body").height()+150); break; }
		case '계획전용목록': { fnIframeResize(undefined); break; }
		case '부문요약': { fnIframeResize(2800); break; }
		case '사업장요약': {fnIframeResize(2000); break; }
		case '공사진척' : {fnIframeResize($("body").height()); break;}
		case '실적상세' : {fnIframeResize($("body").height()); break;}
		case '실행계획' : {fnIframeResize($("body").height()); break;}
		case '투자품의 모니터링' : {fnIframeResize($("body").height()); break;}
		case '부문일괄' : {fnIframeResize($("body").height()); break;}
		case '사후평가 목록' : {fnIframeResize($("body").height()); break;}
		case '집계요약' : {fnIframeResize($("body").height()); break;}
	}
}

$(document).on('click','.tablink' , function(e){
	//alert(e.target.textContent);
	var href = $(e).attr("href");
	var text =  $(e.target).text();
	var flag = false;
	var closed = false;
	same = false;
    if($('.tablink').length >= 10){
    	active(e.target.textContent);
    	return;
    }

	for(var i = 0; i < titleArr.length; i++) {
	    if(titleArr[i] === e.target.textContent) {
			flag = true;//중복여부
			//alert(flag);
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
			$($('.closed:after')[i]).css("color", '#0088FE important');
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
			height(e.target.textContent);
			for(var i = 0; i < titleArr.length; i++) {
				if(titleArr[i] === e.target.textContent){//중복의경우
					$($('.tablink')[i]).addClass("active");
					$($('.tablink')[i]).removeClass("nonactive");
					$($('.tabContent')[i]).css("display", "block");
				}else{//중복아닌애들
					$($('.tabContent')[i]).css("display", "none");
					$($('.tablink')[i]).removeClass("active");//tab활성화
					$($('.tablink')[i]).addClass("nonactive");
					$($('.closed:after')[i]).css("color", '#0088FE important');
				}
			}

		}
	
	} 
});

var replay = false;
$(document).on('click','.allClose' , function all(e){
	//alert("init");
	//alert($('.tablink').length)
	for(var i = 0; i < $('.tablink').length; i++) {
		$('.tablink')[i].parentNode.removeChild($('.tablink')[i]);
    	$('.tabContent')[i].parentNode.removeChild($('.tabContent')[i]);
    	//alert($('.tablink')[i]);
    	if($('.tablink').length === 0){
    		replay = true;
    	}
    	if($('.tablink')[i] !== undefined){
       		if($('.tablink')[i].parentNode.removeChild($('.tablink')[i]) && $('.tabContent')[i].parentNode.removeChild($('.tabContent')[i])){
       			//alert("init2222");
       			all();
       			replay = true;
       			
       		}
    	}

   		if(replay){
			//alert("true");
  	   		$('#contents_area').css('display', 'block');
  	   		$('#tabArea').css('display','none');
  	   		$('.tabContainer').css('display', 'none');
  	   		$('#contents_area').attr('src', '${contextPath}/globalcj/bpms/bpms.dashboard');
  	   		titleArr = [];
  	   		srcArr = [];
  	   		widthSum = 0;
  	   		idx = 0;
  		}
	}

});

var active = function(title) {
	//alert('active');
	//alert(title);
	height(title);
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
			$($('.closed:after')[i]).css("color", '#0088FE !important');
		}
	}
}

var fnIframeResize = function(height) {
	//alert(height);
    if(height != undefined) {
        $('.tabContent').css("height", height + "px");
    }else{
     	$('.tabContent').css("height", 100 + "vh");
    }
};

//tab delete

$(document).on('click','.closed' , function(e){
	del = false;
	delTab(e.target.parentElement.textContent);
	//redraw
});
var cnt = 0;
var reset = false;
const redraw = function(title) {
	//alert("title"+ title);
	//alert("len" + titleArr.length);
	var newTitle = [];
	var newSrc = [];

	for(var j = 0; j < titleArr.length; j++){
		if(titleArr[j] !== title){
			//alert("?#@$@#$" + titleArr[j]);
			//alert("SDAF#$%#$" + srcArr[j]);
			newTitle.push(titleArr[j]);
			newSrc.push(srcArr[j]);
		}
	}
	
	for(var i = 0; i < newTitle.length; i++){
		if(cnt === 0){
			reset = true;
			draw = true;
			drawing(newTitle[i], newSrc[i]);
		}else{
			reset = false;
			draw = true;
			drawing(newTitle[i], newSrc[i]);
		}
		cnt++;
		//alert("cnt" + cnt);
	}

	if(newTitle.length === 0){
		widthSum = 0;
    	idx = 0;
    	titleArr = [];
    	srcArr = [];
		$('#contents_area').css('display', 'block');
		$('#tabArea').css('display','none');
		$('.tabContainer').css('display', 'none');
		$('#contents_area').attr('src', '${contextPath}/globalcj/bpms/bpms.dashboard');
		return;
	}
	
};



const drawing = function(title,src) {
	//alert("drawing");
	height(title);
	var tab = document.createElement('div');
    if(reset){
    	widthSum = 0;
    	idx = 0;
    	titleArr = [];
    	srcArr = [];
    }
    //alert("i" + idx);
	tab.id = 'tab' +idx;
	$(tab).addClass('tablink');
	const close = document.createElement('div');
	$(close).addClass('closed');
    $("#tab"+idx).attr("href", src);
  	$(tab).text(title);
	titleArr.push(title);
	//alert("redratitle" + titleArr.length);
	srcArr.push(src);
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
		   src: src,
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
			$($('.closed:after')[i]).css("color", '#0088FE important');
		}
		
		if($($('.tablink')[i]).hasClass("active")){	
			$($('.tabContent')[i]).css("display", "block");
		}else{
			$($('.tabContent')[i]).css("display", "none");
		}
		}
	//alert("src" + src);
	idx++;
	//title에따른 height길이 더 좋은방법이있다면 바꿀예정
	height(title);
};

var del = false;
var remove = false;

const delTab = function(title) {
	cnt = 0
	draw = false;
	if($('.tablink').length === 0){
		//alert("redraw");
		redraw(title);
		remove = false;
		return;
	}else{
		for(var i = 0; i < $('.tablink').length; i++) {
			if(draw && !remove){
				//alert(draw);
				return;
			}
	   		$('.tablink')[i].parentNode.removeChild($('.tablink')[i]);
	       	$('.tabContent')[i].parentNode.removeChild($('.tabContent')[i]);
	       	remove = true;
	   		if(remove){
	   			delTab(title);
	   		}
		}
	}
}
