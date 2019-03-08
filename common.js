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
   var xhr = createXHR();
   xhr.onreadystatechange=function(){ 
	  if(xhr.readyState == 4){
		{
			//storage.innerHTML = getBody(xhr.responseText);
			//fun(storage, param);
            makeFrameContent(getBody(xhr.responseText));
		}
	  } 
   }; 

   xhr.open("GET", url , true);
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
//내려받은 컨텐츠를 노프레임에 작성
function makeFrameContent(htmlcode){
    var ifr = document.getElementById("mainFrame");
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
        loadWholePage("https://go.adop.cc/login");
    }
    else{
        console.log("mainFrame이 없습니다.");
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
    var f = document.createElement("iframe");
    f.name = "mainFrame";
    f.id   = "mainFrame";
    //f.scrolling   = 'no';
    f.frameBorder = 0;    
    f.width = '100%';
    f.height = '100%';
    document.body.appendChild(f);
    //f.src = 'http://adop.cc';
}
