/*
   공통 처리 함수
*/    
    var responseHTML = document.createElement("body");

//xhr 생성및 리턴(멀티 브라우저 처리)
function createXHR() {
    var request = false;
    try{
        request = new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (err2){
        try {
            request = new ActiveXObject('Microsoft.XMLHTTP');
        }
        catch (err3) {
            try {  request = new XMLHttpRequest();}
            catch (err1) { request = false;}
        }
    }
    return request;
}

//html Contents에서 body태그 안에 내용만 추출하여 리턴
//content는 string
function getBody(content) {
    var lowContents = content.toLowerCase();    
    var x = lowContents.indexOf("<body");
    
    if(x == -1) return "";
    x = lowContents.indexOf(">", x);
    if(x == -1) return 
    var y = lowContents.lastIndexOf("</body>");
    if(y == -1) y = lowContents.lastIndexOf("</html>");
    if(y == -1) y = content.length; 
    return content.slice(x + 1, y);   
}

//페이지를 ajax통신(비동기 get방식)하여 로딩 
//fun는 callback function
function loadHTML(url, fun, storage, param){
   var siteInfo = 0;
   var xhr = createXHR();
   if(url.indexOf('/compass/') != -1){
      siteInfo = 1;
      }
    else if(url.indexOf('/insight/') != -1){
      siteInfo = 2;
   }
   //xhr.withCredentials = true;
   xhr.onreadystatechange=function(){ 
	  if(xhr.readyState == 4){
		{
			//storage.innerHTML = getBody(xhr.responseText);
			//fun(storage, param);
            //makeFrameContent(getBody(xhr.responseText));
            makeFrameContent(xhr.responseText,siteInfo);
            xhr = null;
		}
	  } 
   }; 

   xhr.open("GET", url , true);
    xhr.withCredentials = true;
   //xhr.setRequestHeader('Cookie','bbb=1');    
   xhr.send(null); 
}

//element 복사(origin -> target)     
function processHTML(origin, target)
{
	target.innerHTML = origin.innerHTML;
}

//url의 내용을 읽어들여 컨텐츠내용만 displayed 생성
//storage는 string을 넣고 DOM으로 접근하기 위한 용도 
function loadWholePage(url)
{
	var y = document.getElementById("storage");
	var x = document.getElementById("displayed");
	loadHTML(url, processHTML, x, y);
}
//바꾸기전체 적용
function replaceAll(str,searchStr,replaceStr){
    return str.split(searchStr).join(replaceStr);
}
//내려받은 컨텐츠를 노프레임에 작성
function makeFrameContent(htmlcode,site){
    var ifr = document.getElementById("mainFrame");
    //htmlcode = replaceAll(htmlcode,"../../../","https://go.adop.cc/");
    //htmlcode = replaceAll(htmlcode,"../../","https://go.adop.cc/");
    //htmlcode = replaceAll(htmlcode,"/api/auth/login_check","https://go.adop.cc/api/auth/login_check");
    //htmlcode = replaceAll(htmlcode,"<head>","<head><base href='https://one.adop.cc/insight/' />");
    //htmlcode = replaceAll(htmlcode,"<head>","<head><base href='https://one.adop.cc/compass/' />");
    //htmlcode = replaceAll(htmlcode,"/compass/","https://one.adop.cc/compass/");
    if(site == 1){
        htmlcode = replaceAll(htmlcode,"<head>","<head><base href='https://one.adop.cc/compass/' />");
        htmlcode = replaceAll(htmlcode,'menubar-inverse"','menubar-inverse" style="visibility:hidden;" ');
        htmlcode = replaceAll(htmlcode,"menubar-pin","");
        
    }
    else if(site == 2){
        htmlcode = replaceAll(htmlcode,"<head>","<head><base href='https://one.adop.cc/insight/' />");
        htmlcode = replaceAll(htmlcode,'menubar-inverse"','menubar-inverse" style="visibility:hidden;" ');
        htmlcode = replaceAll(htmlcode,"menubar-pin","");
    }
    
    //alert(htmlcode);
    if(ifr){
        var ifrd = ifr.contentWindow.document; 
        ifrd.open(); 
        ifrd.write(htmlcode); 
        ifrd.close();
    }
}
//현재 용도 없음 나중에 지울것
function processByDOM(responseHTML, target)
{
	target.innerHTML = "Extracted by id:<br />";
	var message = responseHTML.getElementsByTagName("div").item(1).innerHTML;
	
	target.innerHTML += message;

	target.innerHTML += "<br />Extracted by name:<br />";
	
	message = responseHTML.getElementsByTagName("form").item(0);
	target.innerHTML += message.dyn.value;
}

//돔으로 처리 하는 ? 나중에 지울것
function accessByDOM(url){
	var responseHTML = document.getElementById("storage");
	var y = document.getElementById("displayed");
	loadHTML(url, processByDOM, responseHTML, y);
}

//이전 형제 노드 객체 찾기
function findPrevious(elm) {
    do {
        elm = elm.previousSibling;
        } while (elm && elm.nodeType != 1);
    return elm;
}

//이전 엘리먼트와 스와핑
function swapDiv(elm) {
    var previous = findPrevious(elm);
    if (previous) {
        elm.parentNode.insertBefore(elm, previous);
    }
}

//스크립트를 생성해서 교체 로직
function insertScript($script){
    var st  = document.createElement('script');
    st.type = 'text/javascript';
    if($script.src){
        st.src = $script.src;    
    }else{
        st.textContent = $script.innerText;
    }
    
    $script.parentNode.insertBefore(st,$script);
    //$script.parentNode.removeChild($script);
    
}

//최초 시작
function startLoading(){
    var ifr = document.getElementById("mainFrame");
    if(ifr){
        //loadWholePage("http://www.test01.com/t1/sam.php");
        //loadWholePage("https://go.adop.cc/login");
        loadWholePage("https://one.adop.cc/compass/dashboard");
        //loadWholePage("https://one.adop.cc/compass/report/inventoryReport#areaReport");
        //loadWholePage("http://compasstest.adop.cc/sessionChk.php");
        //loadWholePage("http://compasstest.adop.cc/sessionchk2.php");
    }
    else{
        console.log("mainFrame이 없습니다.");
    }
}
//최초 시작
function startLoading2(num){
    var ifr = document.getElementById("mainFrame");
    if(ifr){
        if(num == 1){
          if(logined()){
                makeFrame();    
                loadWholePage("https://one.adop.cc/compass/dashboard");
             }
          else{
                login();
             }    
        }
        else if(num == 2){
          if(logined()){
                makeFrame();    
                loadWholePage("https://one.adop.cc/compass/advertise/advertiseList#first");
             }
          else{
                login();
             }    
        }
        else if(num == 3){
          if(logined()){
                makeFrame();    
                loadWholePage("https://one.adop.cc/compass/inventory/inventoryList#areaList");
             }
          else{
                login();
             }    
        }
        else if(num == 4){
          if(logined()){
                makeFrame();    
                loadWholePage("https://one.adop.cc/compass/report/dailyReport");
             }
          else{
                login();
             }    
        }
        else if(num == 5){
          if(logined()){
                makeFrame();    
                loadWholePage("https://one.adop.cc/insight/dashboard");
             }
          else{
                login();
             }    
        }
        else if(num == 6){
          if(logined()){
                makeFrame();    
                loadWholePage("https://one.adop.cc/insight/ncpi_report/dashboard");
             }
          else{
                login();
             }    
        }
        else if(num == 7){
          if(logined()){
                makeFrame();    
                loadWholePage("https://one.adop.cc/insight/contents_analytics/seo/rss_monitoring");
             }
          else{
                login();
             }    
        }
        else if(num == 8){
          if(logined()){
                makeFrame();    
                loadWholePage("https://one.adop.cc/insight/cs/notice");
             }
          else{
                login();
             }    
        }
        //loadWholePage("http://www.test01.com/t1/sam.php");
        //loadWholePage("https://go.adop.cc/login");
        //loadWholePage("https://one.adop.cc/insight/dashboard");
        //loadWholePage("https://one.adop.cc/insight/contents_analytics/seo/rss_monitoring");
        //loadWholePage("http://compasstest.adop.cc/t1/com02.php");
        //loadWholePage("http://compasstest.adop.cc/sessionChk.php");
    }
    else{
        console.log("mainFrame이 없습니다.");
    }
}

//로그인 되었을때 처리
function afterlogin(){
    var ifr = document.getElementById("mainFrame");
    var htmlcode = "";
        htmlcode += "<head>";
        htmlcode += "<scr"+"ipt src='https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></scr"+"ipt>";
        htmlcode += "<style>";
        htmlcode += "span { display: inline-block; position: absolute;}";
        htmlcode += "</style>";
        htmlcode += "</head>";        
        htmlcode += "<body>";
        htmlcode += "<div id='container'> <span id='random'><img src='https://s3.ap-northeast-2.amazonaws.com/adop-common/Image/adserver_img.jpg'></span> </div>";
        htmlcode += "<scr"+"ipt>";
        htmlcode += "function moveDiv() {";
        htmlcode += "var $span = $('#random');";
        htmlcode += "$span.fadeOut(1000, function() {";
        htmlcode += " var maxLeft = $(window).width() - $span.width();";
        htmlcode += " var maxTop = $(window).height() - $span.height();";
        htmlcode += " var leftPos = Math.floor(Math.random() * (maxLeft + 1));";
        htmlcode += " var topPos = Math.floor(Math.random() * (maxTop + 1));";
        htmlcode += " $span.css({ left: leftPos, top: topPos }).fadeIn(1000);";
        htmlcode += "});";
        htmlcode += "};";
        htmlcode += "moveDiv();";
        htmlcode += "setInterval(moveDiv, 1000);";
        htmlcode += "</scr"+"ipt>";
        htmlcode += "</body>";
    if(ifr){
        var ifrd = ifr.contentWindow.document; 
        ifrd.open(); 
        ifrd.write(htmlcode); 
        ifrd.close();
    }
    
}
function writeCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}


var getCookie = function(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
};
function logined(){
    if(getCookie('UID')){
        return true;
    }else{
        return false;
    }
}
//로그아웃
function logout(){    
     var ifr = document.getElementById("mainFrame");
     var htmlcode = "<iframe src='https://one.adop.cc/compass/auth/logout' frameborder='0' width='0' height='0' ></iframe>";
    
    if(ifr){
        var ifrd = ifr.contentWindow.document; 
        ifrd.open(); 
        ifrd.write(htmlcode); 
        ifrd.close();
    }
    //loadWholePage("https://one.adop.cc/insight/authenticate/logout"); 
    logoutChange();
}
//로그아웃 수시 체크
function logoutChange(){
    setTimeout(function(){
        if(!logined()){
            loadWholePage("https://one.adop.cc/login");  
            loginChange();             
           }
        else{
            logoutChange();       
           }
        
    },500);
}
//로그인 수시 체크
function loginChange(){
    
    setTimeout(function(){
            if(logined()){
                afterlogin();
            }
            else{
                loginChange();    
            }
    },1000);
}
//로그인 체크및 로그인 페이지 이동
function chkLogin(){
    if(!logined()){
        
    }
}
//로그인
function login(){
          makeFrame();    
          if(logined()){
            afterlogin();
          }else{
            loadWholePage("https://one.adop.cc/login");  
            loginChange();  
          }
          
}
//테스트용
function test(){
    var obj = document.querySelector("#displayed script");
    //insertScript(obj);
    //this.document.write("안녕하세요!!!!!");
    if(obj){
        eval(obj.innerHTML);    
    }
    
}
    
//프레임 만들어 생성
function makeFrame(){
    var el = document.getElementById("mainFrame");
    var f  = document.createElement("iframe");
    if(el){
        el.remove();
       }
    f.name = "mainFrame";
    f.id   = "mainFrame";
    //f.scrolling   = 'no';
    f.frameBorder = 0;    
    f.width = '100%';
    f.height = '100%';
    document.body.appendChild(f);
    //f.src = 'http://adop.cc';
}
