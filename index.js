var fnWindowReSize2 = function() {
	$("#contents_area").css("width", $(document).width());
	$("#contents_area").css("height", $(document).height());
};

var fnWindowReSize = function() {
	$("#contents_area").css("width", window.screen.width);
	$("#contents_area").css("height", window.screen.height);
};

$(window).on('resize', function(){
	//fnWindowReSize2();
});

$(document).ready(function () {
    <c:if test="${IS_LOGIN eq false}">
    fnClosePopup("You need to login", true);
    </c:if>
    fnWindowFullScreen();
    $(function(){
        $('#topMenu > li > a').mouseenter(function () {
          
            if(!$(
              $("#topMenu").find('.subtree')).is(':animated'));
            // $("#topMenu").find('.subtree').css("z-index", "100"); 
              $("#topMenu").find('.subtree').css("display", "block"); 
          }); 

       	  $('#header, #con').mouseleave(function () { 
         	$("#header").find('#topLow, .subtree').css("display", "none"); 
      	  });
      
    }); 
    $('#topMenu> li> a').mouseenter(function () { 
        $('a:hover').siblings('ul').addClass('on3');
    });
    $('#topMenu> li> a').mouseleave(function () { 
        $('a').siblings('ul').removeClass('on3');
    });
    $('.subtree').mouseenter(function () { 
        $(this).siblings('a').addClass('on3');
    });
    $('.subtree').mouseleave(function () { 
        $(this).siblings('a').removeClass('on3');
    });
    $("#topMenu").children("li").each(function(q){
        $(this).hover(function(){}, function(){}).focusin(function(){
            if(! $( $('#header').find('#topLow, .subtree')).is(':animated'))
                   ('#header').find('#topLow, .subtree').slideDown('slow'); 
            }).focusout(function(){
        });
    });
    $('#contents_area').on( 'load', function() {
        $("#header").find('#topLow, .subtree').slideUp();
    });
    $('#contents_area').load(function() {
    	//fnWindowReSize2();
    }); 
    fnLoadContents(this, '${contextPath}/globalcj/bpms/bpms.dashboard', undefined);
});

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
var dateParam2 = '';
var signal = '';

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
				 widthSum = width- 19;  
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
    	active(title);
    	height(title);
    	alert("더이상 탭을 추가할수 없습니다");
    	view(title);
   		return;
    }

	for(var i = 0; i < titleArr.length; i++) {
		if(i < idx ){
		  	if(titleArr[i] === title){
	    		msg = 'same';
	    		same = true;
	    		active(title);
	    		height(title);
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

	$($('.tabContent')[idx]).css("display", "block");	
	view(); 
	height(title);
	//adjust(title);
	srcArr.push(src);
	idx++;
};

const view = function() {
	//alert("view");
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
		case '심의결과': { fnIframeResize2($('.tabContent').contents().find("body").height() + 20);  $("body").css('overflow','scroll'); break; }
		case '사업장별현황': { fnIframeResize(1300,'사업장별현황'); $("body").css('overflow','scroll'); break; }
		case '완료심의목록': { fnIframeResize(); $("body").css('overflow','hidden'); break; }
		case '사업장별현황(완료)': { fnIframeResize(867); $("body").css('overflow','scroll'); break; }
		case '계획전용목록': { fnIframeResize(); $("body").css('overflow','hidden'); break; }
		case '부문요약': { fnIframeResize(3000,'부문요약'); $("body").css('overflow','scroll'); break; }
		case '사업장요약': {fnIframeResize(1430,'사엄장요약'); $("body").css('overflow','scroll'); break; }
		case '공사진척' : {fnIframeResize(); $("body").css('overflow','hidden'); break;}
		case '실적상세' : {fnIframeResize(900); $("body").css('overflow','scroll'); break;}
		case '실행계획' : {fnIframeResize(); $("body").css('overflow','hidden'); break;}
		case '투자품의 모니터링' : {fnIframeResize($("body").height()); $("body").css('overflow-x','scroll'); break;}
		case '부문일괄' : {fnIframeResize(); $("body").css('overflow','hidden'); break;}
		case '사후평가 목록' : {fnIframeResize($("body").height()); $("body").css('overflow-x','scroll'); break;}
		case '집계요약' : {fnIframeResize($("body").height()); $("body").css('overflow-x','scroll'); break;}
		
	} 
};


 const adjust = function(title){
 	switch(title){
		case '사전심의목록': { fnbtnResize();  break;} 
		case '심의결과': { fnbtnResize();   break; }
		case '사업장별현황': { fnbtnResize();  break; }
		case '완료심의목록': { fnbtnResize(); break; }
		case '사업장별현황(완료)': { fnbtnResize(); break; }
		case '계획전용목록': { fnbtnResize();  break; }
		case '부문요약': { fnbtnResize();  break; }
		case '사업장요약': {fnbtnResize();  break; }
		case '공사진척' : {fnbtnResize();  break;}
		case '실적상세' : {fnbtnResize();  break;}
		case '실행계획' : {fnbtnResize(); break;}
		case '투자품의 모니터링' : {fnbtnResize(); break;}
		case '부문일괄' : {fnbtnResize();  break;}
		case '사후평가 목록' : {fnbtnResize(); break;}
		case '집계요약' : {fnbtnResize(); break;}
		
	} 
}; 

 const fnbtnResize = function(param) {
		$('.allClose').css("left", '');
		$('.allClose').css("right", 54 + 'px');
}
	


$(document).on('click','.tablink' , function(e){
	//alert(e.target.textContent);
	var href = $(e).attr("href");
	var text =  $(e.target).text();
	var flag = false;
	var closed = false;
	same = false;

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
		//adjust(e.target.textContent);
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
	if(height !== null && height !== '' && height !== undefined){
		for(var i = 0; i < $('.tabContent').length; i++) {
			if($($('.tabContent')[i]).css("display") === 'block'){
				//alert("***&");
		    	if(title === '사업장별현황'){
		    		$($('.tabContent')[i]).css("min-width", 1560 + "px");
		    	}else if(title === '부문요약'){
		    		$($('.tabContent')[i]).css("min-width", 2000 + "px");
		    	}else if(title === '사엄장요약'){
		    		$($('.tabContent')[i]).css("min-width", 2000 + "px");
		    	}
				$($('.tabContent')[i]).css("width", "");
	    		$($('.tabContent')[i]).css("height", "");
		    	$($('.tabContent')[i]).css("height", 100 + '%');
		    	$($('.tabContent')[i]).css("min-height", height + 'px');
		    	$($('.tabContent')[i]).css("width", 100 + "%");
		    	//$($('.tabContent')[i]).css("min-width", window.screen.width + "px");
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


var fnIframeResize2 = function(height) {
	for(var i = 0; i < $('.tablink').length; i++) {
		//alert("height"+ height);
	    if(height != undefined) {
	    	if($($('.tabContent')[i]).css("display") === 'block'){
	    		$($('.tabContent')[i]).css("width", 100 + "%");
		    	//$($('.tabContent')[i]).css("min-width", window.screen.width + "px");
	    		$($('.tabContent')[i]).css("height", + 100 + '%');
	    		$($('.tabContent')[i]).css("min-height", + $($('.tabContent')[i]).contents().find("body").height() + 20 + 'px');
	    		
	    	}
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
		height(titleArr[i]);
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
	       		//height(titleArr[i]);
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
		el.class = 'tabContent';
		el.id = 'bpmsFrame' + index;
	});
	view();
	for(var i = 0; i < titleArr.length; i++) {
		height(titleArr[i]);
	}
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
    
 	var keys = Object.keys(p_paramMap); //키를 가져옵니다. 이때, keys 는 반복가능한 객체가 됩니다.
    for (var i=0; i<keys.length; i++) {
    	_param += keys[i] + "=" + p_paramMap[keys[i]] + "&";
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
    if(p_menuid === '사전심의목록' || p_menuid === '완료심의목록' || p_menuid === '계획전용' || p_menuid === '사후평가 목록'){
    	 //alert("parama" + _param);
    	 fnLoadContents(this, _movePage , p_menuid , true , _param , gbn);
    	 height(p_menuid);
    }else{
    	 fnLoadContents(this, _movePage,p_menuid,'');
    }
   
};