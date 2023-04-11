<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="com.ooservice.platform.common.util.DateUtil" %>
<%@ include file="/WEB-INF/view/globalcj/bpms/bpms.main.message.jsp" %>
<c:set var="contextPath"><%= request.getContextPath() %></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>사전심의</title>
<link type="text/css" rel="stylesheet" href="${contextPath}/css//jquery/jquery-ui-1.8.10.custom.css" />
<link type="text/css" rel="stylesheet" href="${contextPath}/css/jquery/jquery-simple-datetimepicker.css" />
<link type="text/css" rel="stylesheet" href="${contextPath}/css/officeon.bpms.css" />
<link type="text/css" rel="stylesheet" href="${contextPath}/css/officeon.bpms.sticky.css" />
<script type="text/javascript" src="${contextPath}/js/jquery/jquery-1.8.2.js"></script>
<script type="text/javascript" src="${contextPath}/js/jquery/jquery-ui.js"></script>
<script type="text/javascript" src="${contextPath}/js/jquery/jquery.blockUI.js"></script>
<script type="text/javascript" src="${contextPath}/js/jquery/jquery.simple-dtpicker.js"></script>
<script type="text/javascript" src="${contextPath}/js/jquery/jquery.multiselect.js"></script>
<script type="text/javascript" src="${contextPath}/js/jquery/jquery.inputmask.min.js"></script>
<script type="text/javascript" src="${contextPath}/js/jquery/jquery.fileDownload.js"></script>
<script type="text/javascript" src="${contextPath}/js/officeon/officeon.bpms.js"></script>
<script type="text/javascript" src="${contextPath}/js/jquery/StickyOnTable.js"></script>
<script>
var fnDayCheck = function(p_day) {
    var _day = p_day.replace(/-|_/gi, "");
    if( $.trim(_day) != "" && _day.length != 8) {
        return false;
    }
    return true;
};
$(document).ready(function() {
    $("#srchHqSuppr").keyup(function(event) {
        if (event.keyCode == 13) {
            fnSearch();
        }
    });
    $("#srchZbusUnit").on( "change", function() {
        $('#srchPlant').find('option').remove();
        fnSetSrchComboBox("", "srchPlant", "${contextPath}/globalcj/bpms/code.getBizCodeListAjax"
                , {srchZbusUnit:$(this).val()}, "zplant", "zplTxtmd", false, "");//async:false 동기로 요청
        $("#srchPlant").multiselect("refresh");
    });
    $("#srchPlant").multiselect({noneSelectedText:'ALL', menuHeight:600, header:["checkAll","uncheckAll"], buttonWidth:305}).prop("display","");
    $("#srchStatus").multiselect({noneSelectedText:'ALL', menuHeight:400, header:["checkAll","uncheckAll"], buttonWidth:230}).prop("display","");
    $( ".datepkcker").datepicker({
        dateFormat: 'yy-mm-dd',
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'], // 요일의 한글 형식.
        monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], // 월의 한글 형식.
    });
    fnSearch();
});
var fnRegister2 = function() {
    var popOption = "width=620, height=580, resizable=no, status=no, toolbar=no, menubar=no, location=no, directories=no, status=no";    
    window.open("${contextPath}/globalcj/bpms/invt.beffatDlbrReg","", popOption);
};
var fnRegister = function(p_gbn) {
    var _url = '${contextPath}/globalcj/bpms/invt.beffatDlbrReg';
    if(p_gbn === "revise" || p_gbn === 'fromFileRevise') {
        var _zproject = $("#dlbrListTable input:radio[name='zproject']:checked").val();
        var _trObj = $("#dlbrListTable input:radio[name='zproject']:checked").parent().parent();
        var _oldPrStCd = $(_trObj).find("input[name='oldPrStCd']").val();
        if(_zproject == undefined || _zproject == null || _zproject == "") {
            alert('<%=getMsg("msg.00022")%>');
            return;
        }
        if(p_gbn === "revise" && $.trim(_oldPrStCd) != "RG") {
            alert("It can be modified only in registration status."); return;
        }
        _url = '${contextPath}/globalcj/bpms/invt.beffatDlbrReg?' + 'srchZproject='+_zproject + '&actionGbn=MOD' + '&codeLang2="EN"';
    }
    parent.fnModalPopUpDefault('modalPopUpLayer', _url, 500, 580, 'Register', true);
};
var fnSearch = function() {
    var _srchYear = $("#srchYear").val();
    var _plantArray = [];
    $("#srchPlant").multiselect("getChecked").each(function(index, item) {
        _plantArray.push($(item).val());
    });
   
    var _statusArray = [];
    $("#srchStatus").multiselect("getChecked").each(function(index, item) {
        _statusArray.push($(item).val());
    });
    var _url = "${contextPath}/globalcj/bpms/invt.beffatDlbrListAjax";
    var _param = {
        srchYear:_srchYear
       ,srchZbusUnit:$("#srchZbusUnit").val()
       ,_srchStatusList:_statusArray
       ,_srchPlantList : _plantArray <%--자바스크립트 배열로 서버로 요청시, 서버측의 맵핑오버젝트에 설정시 오류가 발생하여, 언더바(_)를 붙여서 서버로 요청함. --%>
       ,srchRwrdM:$("#srchRwrdM").val()
       ,srchRwrdW:$("#srchRwrdW").val()
       ,srchHqSuppr:$("#srchHqSuppr").val()
       ,srchDayGbn:'RGT'
       ,srchMonthFrom:$("#srchMonthFrom").val()
       ,srchMonthTo:$("#srchMonthTo").val()
    };
    var _sucessFun = function(data) {
        $("#contentsAjax").html(data);
        //parent.fnIframeResize(undefined); 
    };
    parent.fnAjaxCallHtml(_url,_param,_sucessFun);
};
var fnDelete = function() {
    var _url = '${contextPath}/globalcj/bpms/invt.beffatDlbrReg.cudAjax';
    var _trObj = $("#dlbrListTable input:radio[name='zproject']:checked").parent().parent();
    var _zproject = $("#dlbrListTable input:radio[name='zproject']:checked").val();
    var _prStCd = $(_trObj).find("select[name='prStCd']").val();
    if(_zproject == undefined || _zproject == null || _zproject == "") {
        alert('<%=getMsg("msg.00022")%>');
        return;
    }
    if( _prStCd != 'RG') {
        alert("It can be deleted in registration status."); return;
    }
    if( confirm('<%=getMsg("msg.00035")%>')) {
        var _param = {zproject:_zproject, actionGbn:'DEL'};
        var _successFun = function(data) {
            if(data.IS_SUCCESS == 0) {
                alert('<%=getMsg("msg.00036")%>');
                //parent.fnIframeSearch();
                //refresh();
                location.reload(true);
            } else if(data.IS_SUCCESS == 8) {
                alert("You do not have permission");
            } else {
                alert("System error");
            }
        };
        parent.fnAjaxCall(_url, _param, _successFun, "", true, true);
    }
};
var fnOpenRemark = function(p_project) {
    var _url = '${contextPath}/globalcj/bpms/invt.beffatDlbrList.remarkPop?' + 'srchZproject='+p_project + '';
    parent.fnModalPopUp('modalPopUpLayer', _url, 200, 250, 'Remark');
};
var fnCheckAmount = function(p_project) {
    var _dlbrToAmt = parseFloat($("#toAmt_"+p_project).val().replace(/,/gi, ""));
    var _dlbrPoAmt = parseFloat($("#poAmt_"+p_project).val().replace(/,/gi, ""));
    var _dlbrPmAmt = parseFloat($("#pmAmt_"+p_project).val().replace(/,/gi, ""));
    if( $.isNumeric(_dlbrToAmt) && $.isNumeric(_dlbrPoAmt)) {
        if( _dlbrPoAmt > _dlbrToAmt) {
            return false;
        }
    }
    if( $.isNumeric(_dlbrToAmt) && $.isNumeric(_dlbrPmAmt)) {
        if( _dlbrPmAmt > _dlbrToAmt) {
            return false;
        }
    }
    return true;
};
var fnSave = function() {
    var _zproject = $("#dlbrListTable input:radio[name='zproject']:checked").val();
    if(_zproject == undefined || _zproject == null || _zproject == "") {
        alert('<%=getMsg("msg.00022")%>');
        return;
    }
    var _url = '${contextPath}/globalcj/bpms/invt.beffatDlbrList.updateFlowAjax';
    var _trObj = $("#dlbrListTable input:radio[name='zproject']:checked").parent().parent();
    var _prStCd = $(_trObj).find("select[name='prStCd']").val();
    var _oldPrStCd = $(_trObj).find("input[name='oldPrStCd']").val();
    <%--RG--%>
    var _hqSuppr = $(_trObj).find("input[name='hqSuppr']").val();
    <%--RV--%>
    var _cfrmTotAmt = $(_trObj).find("input[name='cfrmTotAmt']").val().replace(/,/gi, "");
    var _cfrmPoAmt = $(_trObj).find("input[name='cfrmPoAmt']").val().replace(/,/gi, "");
    var _cfrmPmAmt = $(_trObj).find("input[name='cfrmPmAmt']").val().replace(/,|'/gi, "");
    //var _cfrmDe = $(_trObj).find("input[name='cfrmDe']").val().replace(/-/gi, "");
    var _cfrmRwrdM = $(_trObj).find("select[name='cfrmRwrdM']").val();
    var _cfrmRwrdW = $(_trObj).find("select[name='cfrmRwrdW']").val();
    var _regId = $(_trObj).find("input[name='regId']").val();
    
    <c:if test="${BPMS_AUTH.authCd eq 'G'}">
    if( (_prStCd =='RG' && (_oldPrStCd == 'HD' || _oldPrStCd == 'RJ')) == false) {
        alert('You do not have permission'); return;
    }
    </c:if>
    if(fnCheckAmount(_zproject) == false) {
        alert('Po Amount, Pmt Amount cannot exceed the Project Amount.');
        $("#toAmt_"+_zproject).focus();
        return;
    }
    if( _oldPrStCd == 'AP') {
        if( _prStCd == "AP") {
            alert("Please check Status"); 
            return;
        } else if( _prStCd == 'RV') {
            if(confirm('If you change the status, the amount will be reset. Are you sure you want to change it?') == false) {
                return;
            }
        }
    } else if( _oldPrStCd == 'RG') {
        if($.trim(_prStCd) == "RG") {
            if($.trim(_hqSuppr) == "") {
                alert('<%=getMsg("msg.00038")%>'); 
                $(_trObj).find("input[name='hqSuppr']").focus(); 
                return;
            }
        }
    } else if( _oldPrStCd == 'RV') {
        if( $.trim(_prStCd) == "RV" || $.trim(_prStCd) == "HD" || $.trim(_prStCd) == "RJ") {
            if($.trim(_hqSuppr) == "") {
                alert('<%=getMsg("msg.00038")%>'); 
                $(_trObj).find("input[name='hqSuppr']").focus(); 
                return;
            }
            if($.trim(_cfrmRwrdM) == "") {
                alert("Please select review around"); 
                $(_trObj).find("select[name='cfrmRwrdM']").focus(); 
                return;
            }
            if($.trim(_cfrmRwrdW) == "") {
                alert("Please select review around"); 
                $(_trObj).find("select[name='cfrmRwrdW']").focus(); 
                return;
            }
        }
    } else if( _oldPrStCd == 'HD') {
        if( _prStCd == "HD") {
            alert("Please check Status"); 
            return;
        }
    } else if( _oldPrStCd == 'RJ') {
        if( _prStCd == "RJ") {
            alert("Please check Status"); 
            return;
        }
    } 
    if( _prStCd == _oldPrStCd) _prStCd = "";//공백처리
    var _param = {
         zproject: _zproject
        ,changedPrStCd: _prStCd
        ,hqSuppr: _hqSuppr
        ,cfrmTotAmt: _cfrmTotAmt
        ,cfrmPoAmt: _cfrmPoAmt
        ,cfrmPmAmt: _cfrmPmAmt
        ,cfrmRwrdM: _cfrmRwrdM
        ,cfrmRwrdW: _cfrmRwrdW
    };
    var _successFun = function(data) {
        if(data.IS_SUCCESS == 0) {
            alert("success");
            //parent.fnIframeSearch();
            //refresh();
            location.reload(true);
        } else if(data.IS_SUCCESS == 8) {
            alert("You do not have permission");
        } else {
            alert("System error");
        }
    };
    parent.fnAjaxCall(_url, _param, _successFun, "", true, true);
};
var fnOpenAttachment = function(p_zproject) {
	var _url = '${contextPath}/globalcj/bpms/bpms.attachPopup?' + 'srchZproject='+p_zproject+'&jobGbn=BEFFAT';
	parent.fnModalPopUp('modalPopUpLayer', _url, 500, 500, 'fnOpenAttachment');
};
var fnExcelDownload = function() {
    var _srchYear = $("#srchYear").val();
    var _plantArray = [];
    $("#srchPlant").multiselect("getChecked").each(function(index, item) {
        _plantArray.push($(item).val());
    });
    var _statusArray = [];
    $("#srchStatus").multiselect("getChecked").each(function(index, item) {
        _statusArray.push($(item).val());
    });
    var _url = "${contextPath}/globalcj/bpms/invt.beffatDlbrList.excel";
    var _param = {
        srchYear:_srchYear
       ,srchZbusUnit:$("#srchZbusUnit").val()
       ,_srchStatusList:_statusArray
       ,_srchPlantList : _plantArray <%--자바스크립트 배열로 서버로 요청시, 서버측의 맵핑오버젝트에 설정시 오류가 발생하여, 언더바(_)를 붙여서 서버로 요청함. --%>
       ,srchRwrdM:$("#srchRwrdM").val()
       ,srchRwrdW:$("#srchRwrdW").val()
       ,srchHqSuppr:$("#srchHqSuppr").val()
       ,srchDayGbn:'RGT'
       ,srchMonthFrom:$("#srchMonthFrom").val()
       ,srchMonthTo:$("#srchMonthTo").val()
       ,excelFileName:"Preliminary Review List"
    };
    excelDownLoadParamData(_url, _param);
};
/*검색조건 round 차수 비활성화 활성화*/
/* function selectRound(){
  var srch = document.getElementById("srchRwrdM").value;
  var srchRwrdW = document.getElementById("srchRwrdW");
  console.log("srchRwrdW", srch);
    if(srch !== null) {
        $(srchRwrdW).prop('disabled',false);
    }
    if(srch === ''){
       $(srchRwrdW).prop('disabled',true);
    }
} */

</script>
</head>
<body class="body">
<div class="fixedTop">
  <div style="padding:5px; border-bottom:0.5px solid black; margin-top:105px; width:97.5%; margin-left:1%; margin-right:1%;">
    <%--   <span style="font-size:20px; color:#333; font-weight:bold; border-left:5px solid lightblue; padding-left:6px;"><%=getMsg("submenu.001")%></span> --%>
  </div>

  <div class="invDlbrTitle top">
      <div style="margin-left:0;">
        <span class="name" ><label for="srchZbusUnit"><%=getMsg("txt.00028")%></label></span>&nbsp;&nbsp;
        <select class="text" id="srchZbusUnit" name="srchZbusUnit">
          <!-- <option value="">ALL</option> -->
          <option value="B">BIO</option>
          <!-- <option value="S">FNT</option> -->
        </select>
        </div>
 
        <div>
        <span class="name" ><label for="srchYear"><%=getMsg("txt.00152")%></label></span>&nbsp;&nbsp;
        <select class="text" id="srchYear">
          <!-- <option value="">Select</option> -->
          <c:forEach items="${yearList}" var="year">
          	<c:if test="${year.codeName >= 2021 }">
          		<option value="${year.code}" <c:if test="${srchYear eq year.code}">selected="selected"</c:if> >${year.codeName}</option>
          	</c:if>
          </c:forEach>
        </select>
        </div>
                
        <div>
        <span class="name"><%=getMsg("txt.00003")%></span>&nbsp;&nbsp;
        <select class="longtext hidden_multiselect" name="srchPlant" id="srchPlant"  multiple="multiple">
              <c:forEach items="${bizList}" var="item">
                  <option value="${item.zplant}">${item.zplTxtmd}</option>
              </c:forEach>
        </select>
        </div>
       
     
        <div>
          <span class="name" ><%=getMsg("txt.00002")%></span>&nbsp;&nbsp;
          <select class="text" id="srchStatus" name="srchStatus" multiple="multiple">
            <option value="RG" <c:if test="${srchModel.srchStatus eq 'RG'}">selected="selected"</c:if> >Register</option>
            <option value="RV" <c:if test="${srchModel.srchStatus eq 'RV'}">selected="selected"</c:if> >Review</option>
            <option value="AP" <c:if test="${srchModel.srchStatus eq 'AP'}">selected="selected"</c:if> >Approved</option>
            <option value="HD" <c:if test="${srchModel.srchStatus eq 'HD'}">selected="selected"</c:if> >Hold</option>
            <option value="RJ" <c:if test="${srchModel.srchStatus eq 'RJ'}">selected="selected"</c:if> >Rejected</option>
          </select>
        </div>
        
        <div>
          <span class="name"><%=getMsg("txt.00345")%></span>&nbsp;&nbsp;&nbsp;
          <select class="text" id="srchRwrdM" name="srchRwrdM">
            <option value="">ALL</option>
            <c:forEach items="${monthList}" var="month">
            <option value="${month.monthCd}">${month.monthText}</option>
            </c:forEach>
          </select>
          <select  class="text" id="srchRwrdW" name="srchRwrdW" value="srchRw">
            <option value="">ALL</option>
            <c:forEach items="${weekList}" var="week">
            <option value="${week.weekCd}" >${week.weekText}</option>
            </c:forEach>
          </select>  
        </div>
        
             
        <div>
          <span class="name" ><%=getMsg("txt.00346")%></span>&nbsp;&nbsp;
          <input type="text" class="text" id="srchHqSuppr" name="srchHqSuppr" maxlength="10" />
        </div>
        
        <div>
          <span class="name" ><%=getMsg("txt.00316")%></span>&nbsp;&nbsp;
          <select class="text" id="srchMonthFrom" name="srchMonthFrom">
            <c:forEach items="${monthList}" var="month">
            <option value="${month.monthCd}" <c:if test="${srchModel.srchMonthFrom eq month.monthCd}">selected="selected"</c:if> >${month.monthText}</option>
            </c:forEach>
          </select>~
          <select class="text" id="srchMonthTo" name="srchMonthTo">
            <c:forEach items="${monthList}" var="month">
            <option value="${month.monthCd}" <c:if test="${srchModel.srchMonthTo eq month.monthCd}">selected="selected"</c:if> >${month.monthText}</option>
            </c:forEach>
          </select>
        </div>
       
    <div class="searchWrap" style="margin-left:-1%;">
    	<button class="search" onclick="javascript:fnSearch();return false;"><%=getMessage("btn.0001", codeLang)%></button>
    	<button class="search" onclick="javascript:fnExcelDownload();return false;"><%=getMessage("btn.0006", codeLang)%></button>
    </div>
  </div>
  <div style="display:flex; position: fixed; left: 20px; top: 240px;">
  	<div>
  	   <img src="/officeon/images/cj/total.png">
  	</div>
  	<div id="spanTotalCount"></div>
  </div>
   <div class="btnWrap">
        <button class="btnHover" onclick="javascript:fnRegister();return false;"><%=getMessage("btn.0002", codeLang)%></button>
        <button class="btnHover" onclick="javascript:fnRegister('revise');return false;"><%=getMessage("btn.0003", codeLang)%></button>
        <button class="btnHover" onclick="javascript:fnSave();return false;"><%=getMessage("btn.0004", codeLang)%></button>
        <button class="btnHover" onclick="javascript:fnDelete();return false;"><%=getMessage("btn.0005", codeLang)%></button>
      
    </div>
<div id="contentsAjax">
   <div class="comptContent">
       &nbsp;
      </div>
</div><!-- // tab contents dssfsdf-->
<!-- <div id="black" class="black" style="height:100vh;"></div> -->
<div id="registerDialog"></div>
</body>
</html>
<style>
body {
-ms-overflow-style: none !important;  
}


.btnHover:hover {
background:rgb(0,125,195);
color:white;
}

#spanTotalCount {
border:none;
width:60px;
height:25px;
border-radius:5px;
font-size:15px;
background-color:white;
color:rgb(0,125,195);
display:flex;
justify-content: center;
margin-left:5px;
}

.fixedTop {
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
transform: none;
z-index:66; 
overflow:hidden;
-ms-overflow-style: none !important;  
height:100%;
}

#contentsAjax {
}
.ui-state-default {
background:none;
}
.ui-multiselect {
height:25px;
width:100px !important;
}
/* .ui-datepicker table {
display:grid !important;
} */

.ui-datepicker table th {
min-width:25px;
}
.sub_tab_contents {
background:none;
border:none;
}
.comptContent {
width:300px;
background-color:white;
height:2%;
margin-left:1%;

}

.searchWrap {
 position:fixed;
 right:20px;
 top:137px;
 bottom:0;
}

.btnWrap{
 position:fixed;
 right:20px;
 top:240px;
 bottom:0;
/*  width:38%; */
}

/* .btnWrap div {
margin-bottom:3%;
}
 */
.search {
width:70px;
border-radius:5px;
font-size:13px;
cursor:pointer;
background-color:rgb(0,125,195);
color:white;
height:30px;
font-weight:bold;
}

button {
border:none;
width:100px;
height:30px;
border-radius:5px;
font-size:13px;
cursor:pointer;
border:2px solid rgb(0,125,195);
background-color:white;
color:rgb(0,125,195);
}

.invDlbrTitle {
padding:10px;
height:auto;
background:white;
margin-left:1%;
margin-right:1%;
width:97%;
display:flex;
font-weight:bold;
margin-top:1%;
margin-bottom:1%;
padding-bottom:1%;
border-bottom:1px solid black;
flex-wrap:wrap;
font-size:13px !important;
}

.invDlbrTitle div {
margin-left:1%;
}

.ui-multiselect-checkboxes li:not(.ui-multiselect-optgroup) , .ui-widget  {
font-size:13px !important;
}

.invDlbrTitle div {
 justify-content:space-between; 
}

/* 
tr:nth-child(2n-1){background-color:#E7F0F9 !important;}

tr:nth-child(2n) {background-color:#D0E1F0 !important; } */
 

.invDlbrinput {
width:300%;
justify-content:left;
margin-left:-4%;
}

.invDlbrinput span {
margin-left:2%;
}

.approvalboard_srch_area th {
background-color:white;
border:none;
}

.longtext {
height:25px;
width:300px;
border:1px solid lightgray;
}

.text {
height:25px;
width:90px;
border:1px solid lightgray !important;
}

.halftext {
height:25px;
width:75px;
border:1px solid lightgray;
}

.hidden_multiselect {display:none;}
</style>