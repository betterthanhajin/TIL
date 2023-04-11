<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/globalcj/bpms/bpms.main.message.jsp" %>
<c:set var="contextPath"><%= request.getContextPath() %></c:set>
<style>
  /*프로그램관련 CSS*/
  .cssEdit_default {
      background:#e7e7e7;
      width:100px;
      height:25px;
      z-index:15;
  }
  .cssEdit_yes {
      border:1px solid red !important;
      width:100px;
      height:25px;
     /*  position:relative; */
      z-index:1;
  }
</style>
<script>
<c:if test="${IS_LOGIN eq false}">
parent.fnClosePopup("You need to login", true);
</c:if>
$(document).ready(function() {
    $('.cssEdit_default:input').prop('readonly', true);
    $('.cssEdit_default').prop('disabled', true);
    $('.comptWrap table tbody tr').click(function () {
        $('.comptWrap table tr input[type=radio]').attr('checked', false);
        $('input[type=radio]', this).attr('checked', 'checked');
    });
    $(".clsMoney").inputmask("numeric", {
        autoGroup: true, // default: false, 정수 부분 그룹화 사용 여부
        groupSeparator: ",", // default: "", 그룹 구분자 정의
        digits: 2, // default: "*", 소수 크기 정의
        allowMinus: false, // default: true, 음수 사용 여부
        repeat: 12 // 자리수..
    });
    $(".clsMoneyKRW").inputmask("numeric", {
        autoGroup: true, // default: false, 정수 부분 그룹화 사용 여부
        groupSeparator: ",", // default: "", 그룹 구분자 정의
        digits: 0, // default: "*", 소수 크기 정의
        allowMinus: false, // default: true, 음수 사용 여부
        repeat: 12 // 자리수..
    });
    
    $('#dlbrListTable th').dblclick(function(){
        fnTableSort.sorting(this, 1);
    }); 
    
    $("select[name='cfrmRwrdM'],select[name='cfrmRwrdW']").on( "change", function() {
        var _zproject = $(this).attr("id").split("_")[1];
        var _valueMonth = $("#cfrmRwrdM_"+_zproject).val();
        var _valueWeek = $("#cfrmRwrdW_"+_zproject).val();
        $("#sortCfrmRwrd_"+_zproject).val(_valueMonth + "-" + _valueWeek);
    });
    
    StickyOnTable.apply(document.querySelector("#divInvtTable"));
    $("#spanTotalCount").text("Total:${fn:length(beffatDlbrList)}");
});
</script>
  <div class="comptArea">
    <div class="comptWrap" id="divInvtTable" data-sot-top="1" data-sot-left="8"  height="250px;">
      <table class="invtTable" id="dlbrListTable">
        <caption><span>approval list</span></caption>
        <colgroup>
          <col style="width:70px;min-width:70px;"><!-- check !!-->
          <col style="width:80px;min-width:80px;"><!-- 승인여부 -->
          <col style="width:80px; min-width:80px;"><!-- 비고 2023.02.16 승인여부옆으로 이동  -->
          <col style="width:70px;min-width:70px;"><!-- 사업부문 -->
          <col style="width:120px;min-width:120px;"><!-- 사업장 -->
          <col style="width:120px;min-width:120px;"><!-- 프로젝트코드 -->
          <col style="width:200px;min-width:200px;"><!-- 투자명 -->
          <col style="width:120px;min-width:120px;"><!-- 유형 -->
          <col style="width:60px;min-width:60px;"><!-- Currency -->
          <col style="width:80px;min-width:80px;"><!-- 계획투자/총투자 -->
          <col style="width:80px;min-width:80px;"><!-- 계획투자/공사 -->
          <col style="width:80px;min-width:80px;"><!-- 계획투자/자금 -->
          <col style="width:80px;min-width:80px;"><!-- 요청금액/총투자 -->
          <col style="width:80px;min-width:80px;"><!-- 요청금액/공사 -->
          <col style="width:80px;min-width:80px;"><!-- 요청금액/자금 -->
          <col style="width:80px;min-width:80px;"><!-- 첨부파일 -->
          <col style="width:80px;min-width:80px;"><!-- 등록자 -->
          <col style="width:80px;min-width:80px;"><!-- 등록일 -->
          <col style="width:100px;min-width:100px;"><!-- 심의담당자 -->
          <col style="width:250px;min-width:250px;"><!-- 심의회차 review round 2022.12.04 위치 변경 -->
          <col style="width:120px;min-width:120px;"><!-- 접수날짜, Received Date 2022.12.04 위치 변경 -->
          <col style="width:100px;min-width:100px;"><!-- 승인금액/총투자 confirm amount -->
          <col style="width:80px;min-width:80px;"><!-- 승인금액/공사 -->
          <col style="width:80px;min-width:80px;"><!-- 승인금액/자금 -->
          <col style="width:80px;min-width:80px;"><!-- 승인날짜 -->
        </colgroup>
        <thead>
          <tr class="selected" style="white-spce:nowrap;">
            <th  rowspan="2" sort-index="0"><%=getMsg("txt.00288")%></th><!-- check -->
            <th  rowspan="2" sort-index="1"><%=getMsg("txt.00083")%></th><!-- 승인여부 -->
            <th  rowspan="2" sort-index="2"><%=getMsg("txt.00027")%></th><!-- 비고  -->
            <th  rowspan="2" sort-index="3"><%=getMsg("txt.00028")%></th><!-- 사업부문 -->
            <th  rowspan="2" sort-index="4"><%=getMsg("txt.00080")%></th><!-- 사업장 -->
            <th  rowspan="2" sort-index="5"><%=getMsg("txt.00098")%></th><!-- 프로젝트코드 -->
            <th  rowspan="2" sort-index="6"><%=getMsg("txt.00005")%></th><!-- 투자명 -->
            <th  rowspan="2" sort-index="7"><%=getMsg("txt.00074")%></th><!-- 유형 -->
            <th  rowspan="2" sort-index="8"><%=getMsg("txt.00007")%></th><!-- 통화 -->
            <th  colspan="3" sort-index="9"><%=getMsg("txt.00287")%></th><!-- 계획금액 sort-index를 계획투자/총투자 번호로 설정 -->
            <th  colspan="3" sort-index="12"><%=getMsg("txt.00012")%></th><!-- 요청금액 sort-index를 요청금액/총투자 번호로 설정 --><!-- 요청금액 sort-index를 요청금액/총투자 번호로 설정 -->
            <th  rowspan="2" sort-index="15"><%=getMsg("txt.00014")%></th><!-- 첨부파일 -->
            <th  rowspan="2" sort-index="16"><%=getMsg("txt.00015")%></th><!-- 등록자 -->
            <th  rowspan="2" sort-index="17"><%=getMsg("txt.00016")%></th><!-- 등록일 -->
            <th  rowspan="2" sort-index="18"><%=getMsg("txt.00017")%></th><!-- 심의담당자 -->
            <th  rowspan="2" sort-index="19"><%=getMsg("txt.00019")%></th><!-- 심의회차 -->
            <th  rowspan="2" sort-index="20"><%=getMsg("txt.00018")%></th><!-- 접수날짜 -->
            <th  colspan="3" sort-index="21"><%=getMsg("txt.00013")%></th><!-- 승인금액 sort-index를 승인금액/총투자 번호로 설정 -->
            <th  rowspan="2" sort-index="24"><%=getMsg("txt.00020")%></th><!-- 승인날짜 -->
        </tr>
         <tr class="thAmount">
          <th stlye=" background: rgb(0,110,205); color:white;" sort-index="9" style="position:sticky; top:33px;"><%=getMsg("txt.00009")%></th><!-- 계획투자/총투자 -->
          <th stlye=" background: rgb(0,110,205); color:white;" sort-index="10" style="position:sticky; top:33px;"><%=getMsg("txt.00010")%></th><!-- 계획투자/공사 -->
          <th stlye=" background: rgb(0,110,205); color:white;" sort-index="11" style="position:sticky; top:33px;"><%=getMsg("txt.00011")%></th><!-- 계획투자/자금 -->
          <th stlye=" background: rgb(0,110,205); color:white;" sort-index="12" style="position:sticky; top:33px;"><%=getMsg("txt.00009")%></th><!-- 요청금액/총투자 -->
          <th stlye=" background: rgb(0,110,205); color:white;" sort-index="13" style="position:sticky; top:33px;"><%=getMsg("txt.00010")%></th><!-- 요청금액/공사 -->
          <th stlye=" background: rgb(0,110,205); color:white;" sort-index="14" style="position:sticky; top:33px;"><%=getMsg("txt.00011")%></th><!-- 요청금액/자금 -->
          <th stlye=" background: rgb(0,110,205); color:white;" sort-index="21" style="position:sticky; top:33px;"><%=getMsg("txt.00009")%></th><!-- 승인금액/총투자 -->
          <th stlye=" background: rgb(0,110,205); color:white;" sort-index="22" style="position:sticky; top:33px;"><%=getMsg("txt.00010")%></th><!-- 승인금액/공사 -->
          <th stlye=" background: rgb(0,110,205); color:white;" sort-index="23" style="position:sticky; top:33px;"><%=getMsg("txt.00011")%></th><!-- 승인금액/자금 -->
         </tr>
        </thead>
        <tbody class="scrollbar">
        <c:forEach var="item" items="${beffatDlbrList}" varStatus="status">
          <c:set var="cssEdit_cfrmTotAmt" value="cssEdit_default"/>
          <c:set var="cssEdit_cfrmPoAmt" value="cssEdit_default"/>
          <c:set var="cssEdit_cfrmPmAmt" value="cssEdit_default"/>
          <c:set var="cssEdit_hqSuppr" value="cssEdit_default"/>
          <c:set var="cssEdit_cfrmRwrdM" value="cssEdit_default"/>
          <c:set var="cssEdit_cfrmRwrdW" value="cssEdit_default"/>
          <c:set var="currcyPattern" value="#,##0.00"/>
          <c:set var="cssMoney" value="clsMoney"/>
          <c:choose>
            <c:when test="${item.prStCd eq 'RG'}">
              <c:set var="cssEdit_hqSuppr" value="cssEdit_yes"/>
              <c:set var="cssEdit_cfrmRwrdM" value="cssEdit_yes"/>
              <c:set var="cssEdit_cfrmRwrdW" value="cssEdit_yes"/>
            </c:when>
            <c:when test="${item.prStCd eq 'RV'}">
              <c:set var="cssEdit_hqSuppr" value="cssEdit_yes"/>
              <c:set var="cssEdit_cfrmTotAmt" value="cssEdit_yes"/>
              <c:set var="cssEdit_cfrmPoAmt" value="cssEdit_yes"/>
              <c:set var="cssEdit_cfrmPmAmt" value="cssEdit_yes"/>
              <c:set var="cssEdit_cfrmRwrdM" value="cssEdit_yes"/>
              <c:set var="cssEdit_cfrmRwrdW" value="cssEdit_yes"/>
            </c:when>
          </c:choose>
          <c:if test="${item.currcyGbn eq 'KRW'}">
            <c:set var="currcyPattern" value="#,##0"/>
            <c:set var="cssMoney" value="clsMoneyKRW"/>
          </c:if>
          <tr>
            <td class="AC"  style="background-color: rgb(248, 249, 250);">
                <input type="radio" name="zproject" value="${item.zproject}"/>
                <input type="hidden" name="oldPrStCd" value="${item.prStCd}"/>
                <input type="hidden" name="regId" value="${item.regId}"/>
            </td>
            <td class="AC" style="background-color: rgb(248, 249, 250);">
              <select id="prStCd" name="prStCd" style="background:#e7e7e7;width:90px;">
              <c:choose>
                <c:when test="${item.prStCd eq 'RG'}">
                  <option value="RG" <c:if test="${item.prStCd eq 'RG'}">selected</c:if> sort-value="Register">Register</option>
                </c:when>
                <c:when test="${item.prStCd eq 'RV'}">
                  <option value="RV" <c:if test="${item.prStCd eq 'RV'}">selected</c:if> sort-value="Review">Review</option>
                  <option value="HD" <c:if test="${item.prStCd eq 'HD'}">selected</c:if> sort-value="Hold">Hold</option>
                  <option value="RJ" <c:if test="${item.prStCd eq 'RJ'}">selected</c:if> sort-value="Rejected">Rejected</option>
                </c:when>
                <c:when test="${item.prStCd eq 'AP'}">
                  <option value="RV" <c:if test="${item.prStCd eq 'RV'}">selected</c:if> sort-value="Review">Review</option>
                  <option value="AP" <c:if test="${item.prStCd eq 'AP'}">selected</c:if> sort-value="Approved">Approved</option>
                </c:when>
                <c:when test="${item.prStCd eq 'HD'}">
                  <c:choose>
                    <c:when test="${BPMS_AUTH.authCd eq 'A' or BPMS_AUTH.authCd eq 'R'}">
                      <option value="RG" <c:if test="${item.prStCd eq 'RG'}">selected</c:if> sort-value="Register">Register</option>
                      <option value="HD" <c:if test="${item.prStCd eq 'HD'}">selected</c:if> sort-value="Hold">Hold</option>
                    </c:when>
                    <c:when test="${BPMS_AUTH.authCd eq 'G' and ( BPMS_AUTH.userId eq item.regId )}">
                      <option value="RG" <c:if test="${item.prStCd eq 'RG'}">selected</c:if> sort-value="Register">Register</option>
                      <option value="HD" <c:if test="${item.prStCd eq 'HD'}">selected</c:if> sort-value="Hold">Hold</option>
                    </c:when>
                    <c:otherwise>
                      <option value="HD" <c:if test="${item.prStCd eq 'HD'}">selected</c:if> sort-value="Hold">Hold</option>
                    </c:otherwise>
                  </c:choose>
                </c:when>
                <c:when test="${item.prStCd eq 'RJ'}">
                  <c:choose>
                    <c:when test="${BPMS_AUTH.authCd eq 'A' or BPMS_AUTH.authCd eq 'R'}">
                      <option value="RG" <c:if test="${item.prStCd eq 'RG'}">selected</c:if> sort-value="Register">Register</option>
                      <option value="RJ" <c:if test="${item.prStCd eq 'RJ'}">selected</c:if> sort-value="Rejected">Rejected</option>
                    </c:when>
                    <c:when test="${BPMS_AUTH.authCd eq 'G' and ( BPMS_AUTH.userId eq item.regId )}">
                      <option value="RG" <c:if test="${item.prStCd eq 'RG'}">selected</c:if> sort-value="Register">Register</option>
                      <option value="RJ" <c:if test="${item.prStCd eq 'RJ'}">selected</c:if> sort-value="Rejected">Rejected</option>
                    </c:when>
                    <c:otherwise>
                      <option value="RJ" <c:if test="${item.prStCd eq 'RJ'}">selected</c:if> sort-value="Rejected">>Rejected</option>
                    </c:otherwise>
                  </c:choose>
                </c:when>
              </c:choose>
              </select>
            </td>
            <td class="AC" style="background-color: rgb(248, 249, 250);">
                <a href="#" onclick="javascript:fnOpenRemark('${item.zproject}');return false;" >
                    <c:choose>
                      <c:when test="${!empty item.remk}">
                        <img id="remkimg_${item.zproject}" src="/officeon/images/cj/comment.png" style="width:25px; height:25px;"/>
                      </c:when>
                      <c:otherwise>
                        <img id="remkimg_${item.zproject}" src="/officeon/images/cj/nocomment.png" style="width:25px; height:25px;"/>
                      </c:otherwise>
                    </c:choose>
                </a>
            </td>
            <td style="background-color: rgb(248, 249, 250);">
                <c:choose>
                  <c:when test="${item.zbusUnit eq 'B'}">BIO</c:when>
                  <c:when test="${item.zbusUnit eq 'S'}">FNT</c:when>
                  <c:otherwise>-</c:otherwise>
                </c:choose>
            </td><!-- business unit -->
            <td style="background-color: rgb(248, 249, 250);"><c:out value="${item.zplTxtmd}"/><!-- 심양 --></td>
            <td class="AC" style="background-color: rgb(248, 249, 250);">
                <c:out value="${item.zproject}"/>
                <c:if test="${item.isPlan eq 'N'}">
                <br/>
                    <c:choose>
                        <c:when test="${item.nplanGbn eq 'A'}">(Add)</c:when>
                        <c:when test="${item.nplanGbn eq 'T'}">(Transfer)</c:when>
                        <c:otherwise>-</c:otherwise>
                    </c:choose>
                </c:if>
            </td>
            <td class="textLeft AL" style="background-color: rgb(248, 249, 250);"><div class="textLine AL" title="${item.zpjtxtmd}"><c:out value="${item.zpjtxtmd}"/></div><!-- HSB 능숙관 카렌데리아 교체 --></td>
            <td style="background-color: rgb(248, 249, 250);">${item.ziTxtmd3}</td>
            <td class="AC">${item.currcyGbn }</td><!-- Currency -->
            <td style="text-align:right !important;">
                <span sort-value="${item.zpjRq}" sort-number><fmt:formatNumber type="number" pattern="${currcyPattern}" value="${item.zpjRq}" /></span>
            </td>
            <td style="text-align:right !important;">
                <span sort-value="${item.zpjPo}" sort-number><fmt:formatNumber type="number" pattern="${currcyPattern}" value="${item.zpjPo}" /></span>
            </td>
            <td style="text-align:right !important;" >
                <span sort-value="${item.zpjPm}" sort-number><fmt:formatNumber type="number" pattern="${currcyPattern}" value="${item.zpjPm}" /></span>
            </td>
            <td style="text-align:right !important;">
                <span sort-value="${item.dlbrTotAmt}" sort-number><fmt:formatNumber type="number" pattern="${currcyPattern}" value="${item.dlbrTotAmt }" /></span>
            </td>
            <td style="text-align:right !important;">
                <span sort-value="${item.dlbrPoAmt}" sort-number><fmt:formatNumber type="number" pattern="${currcyPattern}" value="${item.dlbrPoAmt }" /></span>
            </td>
            <td style="text-align:right !important;">
                <span sort-value="${item.dlbrPmAmt}" sort-number><fmt:formatNumber type="number" pattern="${currcyPattern}" value="${item.dlbrPmAmt }" /></span>
            </td>
            <td class="AC" >
                <c:if test="${item.mFileKey != null and item.mFileKey != '0'}">
                <a href="#" onclick="javascript:fnOpenAttachment('${item.zproject}');return false;"><img src="/officeon/images/cj/filedisk_single.png" style="width:20px; height:20px;"/></a>
                </c:if>
            </td>
            <td class="AC" >${item.regNm}</td>
            <td class="AC" style="min-width:100px !important;">${item.utcRegDateStr}</td>
            <td style="background:#ffff49;">
                <input type="text" sort-value name="hqSuppr" value="${item.hqSuppr}" maxlength="40" class="AC ${cssEdit_hqSuppr}" style="width:80px !important;"/>
            </td><!-- hq supporter -->
            <td class="AC" style="min-width:235px !important; background:#ffff49;"><!-- review round -->
                <select name="cfrmRwrdM" class="${cssEdit_cfrmRwrdM}" id="cfrmRwrdM_${item.zproject}">
                  <option value="">Select</option>
                  <c:forEach items="${monthList}" var="month">
                  <option value="${month.monthCd}" <c:if test="${item.cfrmRwrdM eq month.monthCd}">selected="selected"</c:if>>${month.monthText}</option>
                  </c:forEach>
                </select>
                <select name="cfrmRwrdW" class="${cssEdit_cfrmRwrdW}" id="cfrmRwrdW_${item.zproject}">
                  <option value="">Select</option>
                  <c:forEach items="${weekList}" var="week">
                  <option value="${week.weekCd}" <c:if test="${item.cfrmRwrdW eq week.weekCd}">selected="selected"</c:if>>${week.weekText}</option>
                  </c:forEach>
                </select>
                <input type="hidden" sort-value name="sortCfrmRwrd" id="sortCfrmRwrd_${item.zproject}" value="${item.cfrmRwrdM}-${item.cfrmRwrdW}" />
            </td>
            <td style="min-width:80px !important; background:#ffff49;">
                <fmt:parseDate value="${item.recvDe}" pattern="yyyyMMdd" var="parseRecvDe"/>
                <fmt:formatDate value="${parseRecvDe}" pattern="yyyy-MM-dd" var="_recvDe"/>
                <c:out value="${_recvDe}"/>
            </td>
            <td style="text-align:right !important; background:#E7F0F9;">
                <fmt:formatNumber type="number" pattern="${currcyPattern}" value="${item.cfrmTotAmt }" var="_cfrmTotAmt"/>
                <input type="text" sort-value sort-number id="toAmt_${item.zproject}" name="cfrmTotAmt" value="${_cfrmTotAmt}" maxlength="18" class="clsCfrmTotAmt ${cssMoney} AR ${cssEdit_cfrmTotAmt}" style="width:100px !important; height:25px;"/>
            </td>
            <td style="text-align:right !important; background:#E7F0F9;">
                <fmt:formatNumber type="number" pattern="${currcyPattern}" value="${item.cfrmPoAmt }" var="_cfrmPoAmt"/>
                <input type="text" sort-value sort-number id="poAmt_${item.zproject}" name="cfrmPoAmt" value="${_cfrmPoAmt}" maxlength="18" class="clsCfrmPoAmt ${cssMoney} AR ${cssEdit_cfrmPoAmt}" style="width:100px !important;  height:25px;"/>
            </td>
            <td style="text-align:right !important; background:#E7F0F9;">
                <fmt:formatNumber type="number" pattern="${currcyPattern}" value="${item.cfrmPmAmt }" var="_cfrmPmAmt"/>
                <input type="text" sort-value sort-number id="pmAmt_${item.zproject}" name="cfrmPmAmt" value="${_cfrmPmAmt}" maxlength="18" class="clsCfrmPmAmt ${cssMoney} AR ${cssEdit_cfrmPmAmt}" style="width:100px !important;  height:25px;"/>
            </td>
             <td style="min-width:100px !important;  background:#E7F0F9;">
                <fmt:parseDate value="${item.cfrmDe}" pattern="yyyyMMdd" var="parseCfrmDe"/>
                <fmt:formatDate value="${parseCfrmDe}" pattern="yyyy-MM-dd" var="_cfrmDe"/>
               <c:out value="${_cfrmDe}"/>
            </td>
          </tr>
        </c:forEach>
        <c:if test="${empty beffatDlbrList}">
          <tr>
            <td colspan="25" class="AC"><%=getMsg("txt.00309")%></td>
          </tr>
        </c:if>
        </tbody>
      </table>
    </div>
  </div><!-- //approval area -->
  <style>
.textLine {
 display: -webkit-box;
 -webkit-line-clamp: 2;
 -webkit-box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
  word-break:break-word;
}

.zindexAdjust {
z-index:0 !important;
}

 .comptWrap {
width:98%;
margin-left:1%;
margin-right:1%;
margin-top: 35px;
position: fixed;   
top:250px;
bottom:0;
left:0;
right:0;
z-index:66;
overflow:scroll;
/* display:flex; */
}
.invtTable {
width:100%;
font-size:13px !important;
border-collapse: collapse; 
border-top:2px solid lightgray;
border-right:1px solid lightgray;
white-space: normal;
}
.invtTable thead {
background-color: rgb(0,110,205);
}

.invtTable tr {
height:10px;
}

.invtTable td {
font-size:12px;
/* min-width:15px; */
height: 20px;
padding:10px;
border-bottom:1px solid lightgray; 
text-align:center !important;
}

.invtTable th {
padding:8px;
color:white;
border:1px solid lightgray;
  background-color: rgb(0,110,205) !important;
}

.invtTable input[type=text] {
border:none;
}
  
</style>