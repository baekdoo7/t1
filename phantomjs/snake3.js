"use strict";
var require = require || {};
var console = console || {};
var phantom = phantom || {};
var window  = window  || {}; 
var document = document || {};
var adUnits = {};

    adUnits.areacds = [];
    adUnits.b = 202;

var curTime = Date.now();
var page = require('webpage').create(),system = require('system'),checkUrl;
var v_tmp = "abc121212";
////////////////////////////////////////////////////////////////
//////////////////////////함 수 정 의 ////////////////////////////
////////////////////////////////////////////////////////////////
//open핸들러 
function openHandler(status){
  //console.log("Status: " + status);
  if(status === "success") {    
    var adops = getAdopInven();
    var output = "";
    //console.log(adops.length);
      
    if(adops.length > 0){
        
        output = "{'cnt':'" + adops.length + "','areaid':{";
        for(var i=0; i < adops.length; i++){
            output = output + "'" + adops[i].zoneId + "':'" + adops[i].displayed + "'";
            if(i < adops.length - 1){
                output = output + ",";   
            }
            //console.log(adops[i].zoneId + ' / ' + adops[i].displayed );
        }
        output = output + "}}";
        
    }
    else{
        output = "{'cnt':'0','areaid':{}}";
    }
    console.log(output);
    
      
    //console.log('정상적으로 종료 하였습니다...'); 
    page.render('site.png');
    phantom.exit();  
     
      
    for(var i in args){
        console.log(args[i].zoneId + ' / ' + args[i].displayed);    
      }
    //console.log(JSON.stringify(objTmp));
    //msg(JSON.stringify(objTmp[0]));
    page.render('github.png');
    phantom.exit();
          
  }
  else{
    console.log('crawling is fail....');    
    phantom.exit();
  }
      
}

//adop광고 영역만 찾아서 리턴
function getAdopInven(){
    var retValue = page.evaluate(function(){
        var adops = [];
        
        //Document 에서 ADOP 광고 영역 찾기
        function findAdopInven(doc1){
            //ADOP INS태그용 코드 영역 찾기
            var insTags = doc1.getElementsByTagName('ins');
            for(var i = 0 ; i < insTags.length ; i++){
                if(insTags[i].getAttribute('_adop_zon')){
                    var ifrTmp = insTags[i].getElementsByTagName('iframe');
                    if(ifrTmp[0]){
                       var obj = {};
                           obj.zoneId = insTags[i].getAttribute('_adop_zon');
                           obj.iframe = ifrTmp[0];
                        var ifrw = obj.iframe.contentDocument;
                           if(isDisplayAd(ifrw)){
                                obj.displayed = true;
                              }
                              else{
                                obj.displayed = false;
                              }    
                           adops.push(obj);
                           return true;
                    }
                }
            }
            
            //ADOP 아이프레임용 코드 영역 찾기
            var ifrTag =doc1.getElementsByTagName('iframe');
            for(var j = 0 ; j < ifrTag.length ; j++){
                if(ifrTag[j].getAttribute('id') && ifrTag[j].getAttribute('src') && ifrTag[j].getAttribute('id').length == 36 &&        ifrTag[j].getAttribute('src').indexOf('adop.cc') !== -1){
                        var obj = {};
                            obj.zoneId = ifrTag[j].getAttribute('id');
                            obj.iframe = ifrTag[j];
                        var ifrw = obj.iframe.contentDocument;
                           if(isDisplayAd(ifrw)){
                                obj.displayed = true;
                              }
                              else{
                                obj.displayed = false;
                              }    
                            adops.push(obj);
                            return true;
                }
                else{
                    //요기부터 다시 2019.04.10
                    var ifrw = ifrTag[j].contentDocument;
                    if(findAdopInven(ifrw)){
                        return true;    
                    }
                }
            }
            
            return false;
        }
        //Document 에서 이미지 있는지 찾아 사이즈값에 true / false return
        function isDisplayAd(ele){   
            
            var imgs = ele.getElementsByTagName('img');
            //console.log('img count : '+imgs.length);
            for(var i = 0;i < imgs.length ; i++){
                if(imgs[i].width && imgs[i].height && imgs[i].width > 50 && imgs[i].height > 50){
                    return true;
                }
            }
            var ifrs = ele.getElementsByTagName('iframe');
            for(var j = 0; j < ifrs.length ; j++){
                if(ifrs[j].contentDocument){
                    var ifrEle = ifrs[j].contentDocument;
                    if(isDisplayAd(ifrEle)){
                        return true;
                    }    
                }
            }
            return false;
        }        
        
        
        //ADOP INS태그용 코드 영역 찾기
        var insTags = document.getElementsByTagName('ins');
        for(var i = 0 ; i < insTags.length ; i++){
            if(insTags[i].getAttribute('_adop_zon')){
                var ifrTmp = insTags[i].getElementsByTagName('iframe');
                //if(i==0){
                //    console.log(ifrTmp[0].contentWindow.document.getElementsByTagName('img').length);
                //}
                if(ifrTmp[0]){
                   var obj = {};
                       obj.zoneId = insTags[i].getAttribute('_adop_zon');
                       obj.iframe = ifrTmp[0];
                        var ifrw = obj.iframe.contentDocument;
                           if(isDisplayAd(ifrw)){
                                obj.displayed = true;
                              }
                              else{
                                obj.displayed = false;
                              }    
                       adops.push(obj);
                }
            }
        }
        
        //ADOP 아이프레임용 코드 영역 찾기
        var ifrTag =document.getElementsByTagName('iframe');
        for(var j = 0 ; j < ifrTag.length ; j++){
            if(ifrTag[j].getAttribute('id') && ifrTag[j].getAttribute('src') && ifrTag[j].getAttribute('id').length == 36 &&        ifrTag[j].getAttribute('src').indexOf('adop.cc') !== -1){
                    var obj = {};
                        obj.zoneId = ifrTag[j].getAttribute('id');
                        obj.iframe = ifrTag[j];
                        var ifrw = obj.iframe.contentDocument;
                           if(isDisplayAd(ifrw)){
                                obj.displayed = true;
                              }
                              else{
                                obj.displayed = false;
                              }    
                        adops.push(obj);
            }
            else{
                    var ifrw = ifrTag[j].contentDocument;
                    findAdopInven(ifrw);
            }
        }
        
        //광고영역 확인
        //console.log('광고 영역 : ' + adops.length);
        
        //광고 노출 체크
        //for(var k = 0 ;k < adops.length ; k++){
        //}

        
        
        return adops;
        
    });
    return retValue;
}
///////////////////////////////////////////////////////////////////////////////////


//pc,mobile 값을 넘겨 받음 없으면 기본 PC 모드
if(system.args.length != 3 ){
    console.log('Usage : phantomjs --web-security=no snake.js http://www.example.com/example.php [mobile|pc]');
    phantom.exit();   
}
else{
    checkUrl = system.args[1];
    //모바일과 피시에 따른 유저 에이전트 세팅
    if(system.args[2] === 'mobile'){
        page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
       }
    else{
       page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';
       }
}

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

//page.open(checkUrl, openHandler);
page.open(checkUrl,function(status){
    setTimeout(function(){openHandler(status)},10000);
});

