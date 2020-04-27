"use strict";
var require = require || {};
var console = console || {};
var phantom = phantom || {};
var window  = window  || {}; 
var document = document || {};
var page = require('webpage').create(),
    system = require('system'),checkUrl;


//pc,mobile 값을 넘겨 받음 없으면 기본 PC 모드
if(system.args.length != 3 ){
    
    console.log('Usage : phantomjs --web-security=no snake.js http://www.example.com/example.php [mobile|pc]');
    phantom.exit();   
}else{
    checkUrl = system.args[1];
    //모바일과 피시에 따른 유저 에이전트 세팅
    if(system.args[2] === 'mobile'){
        page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
       }
    else{
       page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';
       }
}
//페이지 에러 핸들링
page.onError = function(msg, trace) {console.log(msg+'/'+trace);};
//메시지 콜백 등록
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

//페이지 크롤링 시작
page.open('http://compasstest.adop.cc/bs.html', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
      setTimeout(function(){
         
          //page.render('github.png');
          
          page.evaluate(function(){
            //var i = document.getElementsByTagName('iframe');
            //var doc = i[0].contentWindow.document;
            
            var doc = findIframe();
              
            if(doc){
                doc.querySelector('button.close').click();
            }
                //console.log(doc);          
          });
          
          page.render('github.png');
          phantom.exit();
                           },5000);
    //page.render('github.png');
  }
  
});


console.log(system.args.length);
console.log(checkUrl);


phantom.exit(2);



