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
var delIndex = 0;

//create + add tab
var fnLoadContents = function(_obj, _src , title, param , dateParam, gbn) {
	if(title !== undefined){
		$('#tabArea').css('display','block');
		$('.tabContainer').css('display', 'block');
		$('#contents_area').css('display', 'none');
		paramTitle = title;
		src = _src;
		//remove = false;
		if(remove === true){
			//alert("removetrue");
			//alert("idx" + idx);
			 //lock = true;
			if(delIndex === 0){
				 widthSum = width - 115- 49;  
			}else{
				widthSum = width - 16;
			}
			
			 idx = delIndex + 1;
			 //alert('wid'+ width);
			
			 create(_obj, _src , title, param , dateParam, gbn);
		}else {
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
	//alert("createidx" + idx);
	tab.id = 'tab' +idx;
	//tab메뉴개수제한 10개이상 리턴
    if($('.tablink').length >= 10){
    	alert("더이상 탭을 추가할수 없습니다");
    	return;
    }
	
    if(param) {
		 for(var a = 0; a < window.frames.length -1; a++){				
			if($($('.tabContent')[i]).css("display") === 'block'){
				//alert("date" + dateParam);
				document.getElementById('bpmsFrame' + i).contentWindow.fnSearch(dateParam,gbn);
				continue;
			}
		 }  	
	}

	for(var i = 0; i < titleArr.length; i++) {
		if(i < idx ){
		  	if(titleArr[i] === title){
	    		msg = 'same';
	    		same = true;
	    		active(title);
	    		//idx = idx + 1;
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

	if(remove){
		remove = false;
		lock = true;
		if(idx === 0){
			//widthSum = widthSum + $("#tab"+(idx)).outerWidth();
			$("#tab"+idx).css("left", 19 + 'px');
			widthSum = $("#tab"+(idx)).outerWidth();
		}else if(idx === 1) {
			widthSum =  widthSum + 10 + 19;
			//widthSum = widthSum + $("#tab"+(idx)).outerWidth();
			$("#tab"+idx).css("left", (widthSum)+ 'px');
			//alert("idx > 0");
			//alert("widthSum" + widthSum);
			
		}else{
			if(lock){
				//alert("true");
				widthSum = widthSum + $("#tab"+(idx)).outerWidth();
				widthSum =  widthSum +  10 + 19;
				$("#tab"+idx).css("left", (widthSum)+ 'px');
				//alert("widthSumq43" + widthSum);
				lock = false;
			}else{
				widthSum =  widthSum + 10;
				widthSum = widthSum + $("#tab"+(idx)).outerWidth();
				$("#tab"+idx).css("left", (widthSum)+ 'px');
				//alert("idx > 1");
				//alert("widthSum" + widthSum);	
			}

		}
	}else{
		if(idx === 0){
			//widthSum = widthSum + $("#tab"+(idx)).outerWidth();
			$("#tab"+idx).css("left", 19 + 'px');
			widthSum = $("#tab"+(idx)).outerWidth();
			//widthSum = widthSum;
		}else if(idx === 1) {
			widthSum =  widthSum + 10 + 19;
			//widthSum = widthSum + $("#tab"+(idx)).outerWidth();
			$("#tab"+idx).css("left", (widthSum)+ 'px');
			//alert("idx > 0");
			//alert("widthSum" + widthSum);
			
		}else{
			if(lock){
				//alert("true");
				widthSum = widthSum + $("#tab"+(idx)).outerWidth();
				widthSum =  widthSum +  10;
				$("#tab"+idx).css("left", (widthSum)+ 'px');
				//alert("widthSumq43" + widthSum);
				lock = false;
			}else{
				widthSum =  widthSum + 10;
				widthSum = widthSum + $("#tab"+(idx)).outerWidth();
				$("#tab"+idx).css("left", (widthSum)+ 'px');
				//alert("idx > 1");
				//alert("widthSum" + widthSum);	
			}

		}
	}
	

	
	index = idx;
	$('<iframe>', {
		   src: _src,
		   id:  'bpmsFrame' + idx,
		   class: 'tabContent',
		   frameborder: 0,
		   scrolling: 'no'
		   }).appendTo('.container');

	//$($('.tabContent')[idx]).css("display", "block");
	view();
	height(title);
	srcArr.push(src);
	idx++;
};

const view = function() {
	for(var i = 0; i < $('.tablink').length; i++){
		if((i === $('.tablink').length - 1)){
			$($('.tablink')[i]).addClass("active");
			$($('.tablink')[i]).removeClass("nonactive");
			$($('.tabContent')[i]).css("display", "block");
		}else{
			$($('.tablink')[i]).removeClass("active");
			$($('.tablink')[i]).addClass("nonactive");
			$($('.closed:after')[i]).css("color", '#0088FE important');
			$($('.tabContent')[i]).css("display", "none");
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
	//alert("heighttitle" + title);
 	switch(title){
		case '사전심의목록': { fnIframeResize(); $("body").css('overflow','hidden'); break;} 
		case '심의결과': { fnIframeResize2($('.tabContent').contents().find("body").height());  $("body").css('overflow','scroll'); break; }
		case '사업장별현황': { fnIframeResize(1300); $("body").css('overflow','scroll'); break; }
		case '완료심의목록': { fnIframeResize(); $("body").css('overflow','hidden'); break; }
		case '사업장별현황(완료)': { fnIframeResize($("body").height()+150); $("body").css('overflow-x','scroll'); break; }
		case '계획전용목록': { fnIframeResize(); $("body").css('overflow','hidden'); break; }
		case '부문요약': { fnIframeResize(2720); $("body").css('overflow','scroll'); break; }
		case '사업장요약': {fnIframeResize(1400); $("body").css('overflow','scroll'); break; }
		case '공사진척' : {fnIframeResize(); $("body").css('overflow-x','hidden'); break;}
		case '실적상세' : {fnIframeResize($("body").height()); $("body").css('overflow-x','scroll'); break;}
		case '실행계획' : {fnIframeResize(); $("body").css('overflow-x','hidden'); break;}
		case '투자품의 모니터링' : {fnIframeResize($("body").height()); $("body").css('overflow-x','scroll'); break;}
		case '부문일괄' : {fnIframeResize(); $("body").css('overflow-x','hidden'); break;}
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
    	height(e.target.textContent);
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
		height(e.target.textContent);
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
  	   		delIndex = 0;
  	   		width = 0;
  		}
	}

});

var active = function(title) {

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


var fnIframeResize = function(height,title) {
	//alert('height' + height);
	if(height !== null && height !== '' && height !== undefined){
		for(var i = 0; i < $('.tabContent').length; i++) {
			if($($('.tabContent')[i]).css("display") === 'block'){
				//alert("***");
				$($('.tabContent')[i]).css("width", "");
	    		$($('.tabContent')[i]).css("height", "");
		    	$($('.tabContent')[i]).css("height", 100 + '%');
		    	$($('.tabContent')[i]).css("min-height", height + 'px');
		    	$($('.tabContent')[i]).css("width", 100 + "%");
		    	$($('.tabContent')[i]).css("min-width", window.screen.width + "px");
		    	break;
			}else{
				$($('.tabContent')[i]).css("display",'none');
				$($('.tabContent')[i]).css("width", "");
	    		$($('.tabContent')[i]).css("height", "");
	    		$($('.tabContent')[i]).css("min-width", "");
		    	$($('.tabContent')[i]).css("min-height", "");
			}
		}
	
	}else{
		for(var i = 0; i < $('.tabContent').length; i++) {
			if($($('.tabContent')[i]).css("display") === 'block'){
				//alert("&&&");
				$($('.tabContent')[i]).css("width", "");
	    		$($('.tabContent')[i]).css("height", "");
				$($('.tabContent')[i]).css("min-width", 0);
		    	$($('.tabContent')[i]).css("min-height", 0);
		    	$($('.tabContent')[i]).css("width", 100 + "%");
		    	$($('.tabContent')[i]).css("height", 99 + "%");
		    	break;
			}else{
				$($('.tabContent')[i]).css("display",'none');
				$($('.tabContent')[i]).css("width", "");
	    		$($('.tabContent')[i]).css("height", "");
	    		$($('.tabContent')[i]).css("min-width", "");
		    	$($('.tabContent')[i]).css("min-height", "");
			}
		}
	}
};

const fnIframeResize3 = function() {
	for(var i = 0; i < $('.tabContent').length; i++) {
		if($($('.tabContent')[i]).css("display") === 'block'){
			$($('.tabContent')[i]).css("width", "");
    		$($('.tabContent')[i]).css("height", "");
			$($('.tabContent')[i]).css("min-width", 0);
	    	$($('.tabContent')[i]).css("min-height", 0);
	    	$($('.tabContent')[i]).css("width", 100 + "%");
	    	$($('.tabContent')[i]).css("height", 99 + "%");
		}else{
			$($('.tabContent')[i]).css("display",'none');
			$($('.tabContent')[i]).css("width", "");
    		$($('.tabContent')[i]).css("height", "");
    		$($('.tabContent')[i]).css("min-width", "");
	    	$($('.tabContent')[i]).css("min-height", "");
		}
	}
};

var fnIframeResize2 = function(height) {
	for(var i = 0; i < $('.tablink').length; i++) {
		//alert("height"+ height);
	    if(height != undefined) {
	    	if($($('.tabContent')[i]).css("display") === 'block'){
	    		$($('.tabContent')[i]).css("height", $($('.tabContent')[i]).contents().find("body").height() + 20 + 'px');
	    	}
	    }else{
	     	$('.tabContent').css("height", 100 + "vh");
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
		if(tabArr.length  === titleArr.length){
			return;
		}
		//alert("tab***&&");
		if($('.tablink').length  === 0){
			return;
		}
		if($("#tab"+ i).text() === title){
			titleArr.splice(i,1);
			$('.tablink')[i].parentNode.removeChild($('.tablink')[i]);
	       	$('.tabContent')[i].parentNode.removeChild($('.tabContent')[i]);
	       	if(i > 0) {
	       		i = i - 1;
	       	}else{
	       		//alert(i);
	       		//alert(titleArr.length);
	       		delTab(title);
	       	}
		}else{
			tabArr.push($('.tablink')[i]);
			tabConArr.push($('.tabContent')[i]);
		}
	}
	if(tabArr.length > 0 ) {
		remove = true;
	}else{
		//alert("elseinit");
		$("body").css('overflow','scroll');
		$('#contents_area').css('display', 'block');
		$('#tabArea').css('display','none');
		$('.tabContainer').css('display', 'none');
		$('#contents_area').attr('src', '${contextPath}/globalcj/bpms/bpms.dashboard');
   		titleArr = [];
   		srcArr = [];
   		width = 0;
   		idx = 0;
   		delIndex = 0;
   		remove = false;
		return;
	}
	
 	//alert('tabArr' + tabArr);
	//alert('tabConArr' +tabConArr);
	
	tabArr.forEach (function (el, index) {
			//alert("index****" + index);
			//alert("el" + el);
			if(el !== null){
				el.id = 'tab' + index;
				if(index === 0){
					width = width + $(el).outerWidth();
					$(el).css("left", 19 + 'px');
					width = width + 19;
				}else if(index === 1) {
					width =  width +  10;
					//widthSum = widthSum + $("#tab"+(idx)).outerWidth();
					$(el).css("left", (width)+ 'px');
	/* 				alert("idx > 0");
					alert("widthSum" + width); */
					
				}else{
					width =  width +  10;
					width = width + $(el).outerWidth();
					$(el).css("left", (width)+ 'px');
		/* 			alert("idx > 1");
					alert("widthSum" + width);	 */
				}
			
			    delIndex =  index;
			}

	});
	
	tabConArr.forEach (function (el, index) {
/* 		alert("el" + el);
		alert("conindex" + index) */
		el.id = 'bpmsFrame' + index;
		height(titleArr[index]);
	});

	view();
}

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
    	 fnLoadContents(this, _movePage , p_menuid , true , _param , gbn);
    	 height(p_menuid);
    }else{
    	 fnLoadContents(this, _movePage,p_menuid,'');
    }
   
};