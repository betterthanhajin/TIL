var index = 0;//tabindex
var widthSum = 0;
var src = null;
var srcArr = [];
var titleArr = [];
var same = true;
var msg = ''; 
var active = false;
var draw = false;
var idx = 0;
var k = 0;
var paramNew = '';
var remove = false;
var width  = 0;
var lock = false;

//create + add tab
var fnLoadContents = function(_obj, _src , title, param , dateParam, gbn) {
	paramNew = param;
	if(title !== undefined){
		$('#tabArea').css('display','block');
		$('.tabContainer').css('display', 'block');
		$('#contents_area').css('display', 'none');
		paramTitle = title;
		src = _src;
		//remove = false;
		if(remove === true){
			alert("idx" + idx);
			 idx = idx - 1;
			 widthSum = width;
			 widthSum = widthSum + 115;
			 lock = true;
			 remove = false;
			 create(_obj, _src , title, param , dateParam, gbn);
		}else if(!remove){
			create(_obj, _src , title, param , dateParam, gbn);
		}
	}else if(title === undefined){//dashboard only
		$("body").css('overflow','scroll');
		$('#contents_area').css('display', 'block');
		$('#tabArea').css('display','none');
		$('.tabContainer').css('display', 'none');
		$('#contents_area').attr('src', '${contextPath}/globalcj/bpms/bpms.dashboard');
		return;
	}
};


const create = function(_obj, _src , title, param , dateParam, gbn) {
	var container =  document.getElementsByClassName("container");
	var tab = document.createElement('div');
	alert("createidx" + idx);
	tab.id = 'tab' +idx;
	//tab메뉴개수제한 10개이상 리턴
    if($('.tablink').length >= 10){
    	alert("더이상 탭을 추가할수 없습니다");
    	return;
    }
		
	 for(var i = 0; i < window.frames.length -1; i++){
			if(param === 'new'){
				alert("new");
				alert('parma' + dateParam);
	    		document.getElementById('bpmsFrame' + i).contentWindow.fnSearch(dateParam,gbn);
	    		continue;
	    	}
	    	
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
	}else if(!remove){
		widthSum =  widthSum +  10;
		$("#tab"+idx).css("left", (widthSum)+ 'px');
		alert("lockfalse");
		widthSum = widthSum + $("#tab"+(idx)).outerWidth();
		
	}
	if(remove){
		if(lock){
			$("#tab"+idx).css("left", (widthSum)+ 'px');
			widthSum =  widthSum +  10;
			alert("lock");
			lock = false;
		}else{
			$("#tab"+idx).css("left", (widthSum)+ 'px');
			widthSum = widthSum + $("#tab"+(idx)).outerWidth();
			widthSum =  widthSum +  10;
			alert("lockfalse");
		}
	}

	
	
	view();
	index = idx;
	$('<iframe>', {
		   src: _src,
		   id:  'bpmsFrame' + idx,
		   class: 'tabContent',
		   frameborder: 0,
		   scrolling: 'no'
		   }).appendTo('.container');
	
	srcArr.push(src);
	$('.container').append($('.tabContainerWrap'));
	idx++;
	var settimeCnt = 0;
	//height(title);
	setTimeout(function(){
		if (settimeCnt < 2) {
			height(title);
			settimeCnt += 1;
		}
	
	}, 200);
};

const view = function() {
	for(var i = 0; i < $('.tablink').length; i++){
		if((i === $('.tablink').length - 1)){
			alert("init");
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
};

const height = function(title){
	//title에따른 height길이 더 좋은방법이있다면 바꿀예정
	alert(title);
	switch(title){
		case '사전심의목록': { fnIframeResize(undefined); $("body").css('overflow','hidden'); break;} 
		case '심의결과': { fnIframeResize2($('.tabContent').contents().find("body").height());  $("body").css('overflow','scroll'); break; }
		case '사엄장별현황': { fnIframeResize($("body").height()+100); $("body").css('overflow-x','scroll'); break; }
		case '완료심의목록': { fnIframeResize(undefined); $("body").css('overflow','hidden'); break; }
		case '사업장별현황(완료)': { fnIframeResize($("body").height()+150); $("body").css('overflow-x','scroll'); break; }
		case '계획전용목록': { fnIframeResize(undefined); $("body").css('overflow','hidden'); break; }
		case '부문요약': { fnIframeResize(2720); $("body").css('overflow','scroll'); break; }
		case '사업장요약': {fnIframeResize(1400); $("body").css('overflow','scroll'); break; }
		case '공사진척' : {fnIframeResize($("body").height()); $("body").css('overflow-x','hidden'); break;}
		case '실적상세' : {fnIframeResize($("body").height()); $("body").css('overflow-x','scroll'); break;}
		case '실행계획' : {fnIframeResize($("body").height()); $("body").css('overflow-x','hidden'); break;}
		case '투자품의 모니터링' : {fnIframeResize($("body").height()); $("body").css('overflow-x','scroll'); break;}
		case '부문일괄' : {fnIframeResize($("body").height()); $("body").css('overflow-x','hidden'); break;}
		case '사후평가 목록' : {fnIframeResize($("body").height()); $("body").css('overflow-x','scroll'); break;}
		case '집계요약' : {fnIframeResize($("body").height()); $("body").css('overflow-x','scroll'); break;}
		
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
			   id:  'bpmsFrame' + idx,
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
		
		var settimeCnt = 0;
		setTimeout(function(){
			if (settimeCnt < 2) {
				height(e.target.textContent);
				settimeCnt += 1;
			}
		
		}, 200);
		
		if(flag){
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
	for(var i = 0; i < $('.tablink').length; i++) {
		$('.tablink')[i].parentNode.removeChild($('.tablink')[i]);
    	$('.tabContent')[i].parentNode.removeChild($('.tabContent')[i]);
    	if($('.tablink').length === 0){
    		replay = true;
    	}
    	if($('.tablink')[i] !== undefined){
       		if($('.tablink')[i].parentNode.removeChild($('.tablink')[i]) && $('.tabContent')[i].parentNode.removeChild($('.tabContent')[i])){
       			all();
       			replay = true;
       		}
    	}

   		if(replay){
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
	var settimeCnt = 0;
	height(title);
	setTimeout(function(){
		if (settimeCnt < 2) {
			height(title);
			settimeCnt += 1;
		}
	
	}, 200);
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
	    if(height != undefined) {
	    	$('.tabContent').css("height", height + "px");
	    	$('.tabContent').css("width", 1920 + "px");
	    }else{
	     	$('.tabContent').css("min-height", 100 + "vh");
	    }
};

var fnIframeResize2 = function(height) {
	for(var i = 0; i < $('.tablink').length; i++) {
		alert("height"+ height);
	    if(height != undefined) {
	    	if($($('.tabContent')[i]).css("display") === 'block'){
	    		$($('.tabContent')[i]).css("min-height", $($('.tabContent')[i]).contents().find("body").height() + 20 + 'px');
	    	}
	    }else{
	     	$('.tabContent').css("min-height", 100 + "vh");
	    }
	}
};

//tab delete
$(document).on('click','.closed' , function(e){
	delTab(e.target.parentElement.textContent);
});

var tabArr = [];
var tabConArr = [];

const delTab = function(title) {
	tabArr = [];
	tabConArr = [];
	width = 0;
	
	for(var i = 0; i < titleArr.length; i++) {
		if($('.tablink').length  === 0){
			return;
		}
		alert("iin" + i);
		alert($("#tab"+ i).text());

		if($("#tab"+ i).text() === title){
			titleArr.splice(i,1);
			$('.tablink')[i].parentNode.removeChild($('.tablink')[i]);
	       	$('.tabContent')[i].parentNode.removeChild($('.tabContent')[i]);
	       	if(i > 0) {
	       		i = i -1;
	       		//delTab();
	       	}
		}else{
			alert("i" + i);
			alert("*&&&^arr");
			tabArr.push($('.tablink')[i]);
			tabConArr.push($('.tabContent')[i]);
		}
	}
	remove = true;
	alert('tabArr' + tabArr);
	alert('tabConArr' +tabConArr);
	
	tabArr.forEach (function (el, index) {
			alert("index" + index);
			el.id = 'tab' + index;
		    if(index === 0){
		    	alert("00");
		    	alert("width" + width);
				$(el).css("left", 19 + 'px');
			}else{
				 width = width + $(el).outerWidth();
				 width =  width +  10 + 19;
				 alert("widt22h" + width);
				$(el).css("left", (width)+ 'px');
			}

		
		    
	});
	
	tabConArr.forEach (function (el, index) {
		alert("el" + el);
		alert("conindex" + index)
		el.id = 'bpmsFrame' + index;
		height(titleArr[index]);
	});
	
	
	view();
}

<%--임시사용--%>
var fnModalCloseIframeInvokeRegister = function(p_gbn) {
    fnModalPopUpClose('modalPopUpLayer');
    for(var i = 0; i < window.frames.length -1; i++){
		if($($('.tabContent')[i]).css("display") === 'block'){
    		document.getElementById('bpmsFrame' + i).contentWindow.fnSearch();
    		if(p_gbn === 'fromFileRevise'){
    			document.getElementById('bpmsFrame' + i).contentWindow.fnRegister('fromFileRevise');
    		}
    	}
    	
    }
};

var fnMovePageGetMethod = function(p_menuid, p_paramMap, gbn) {
	//alert("init");
    var _movePage = "";
    var _param = "";
    var _src = $("#topMenu li a[menu_id='"+p_menuid+"']").attr("move_src");
    if(_src == undefined || _src == null || $.trim(_src) == "") {
        return;
    }
    for(var k in p_paramMap) {
        _param += p_paramMap[k] + "&";
    }
    switch(p_menuid) {
		case '00201': { p_menuid = '사전심의목록'; break;}
		case '00301': { p_menuid = '완료심의목록'; break;}
		case '00401': { p_menuid = '계획전용'; break;}
		case '00501': { p_menuid = '부문요약'; break;}
		case '00502': { p_menuid = '사업장요약'; break;}
		case '00701': { p_menuid = '사후평가 목록'; break;}
	}
    
    _movePage = _src + "?" + _param;
    if(p_menuid === '사전심의목록' || p_menuid === '완료심의목록'){
    	 alert("dsadf");
    	 fnLoadContents(this, _movePage , p_menuid ,'new', _param , gbn);
    	 height(p_menuid);
    }else{
    	 fnLoadContents(this, _movePage,p_menuid,'');
    }
   
};