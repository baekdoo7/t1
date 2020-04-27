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

page.open(checkUrl, function(status) {
  console.log("Status: " + status);
  if(status === "success") {    
      setTimeout(function(adUnitsParam){
          var objTmp =page.evaluate(function(v_tmp){
            //var i = document.getElementsByTagName('iframe');
            //var doc = i[0].contentWindow.document;            
            //var doc = findIframe();
            var adopInvens = [];
            //아이프레임 찾아 리턴
            function findIframe(){
                var tmp = document.getElementsByTagName("ins");
                    
                return tmp[0].getElementsByTagName("iframe");
            }
            function imgSizeCheck(img){
                if(img.width && img.height && img.width > 100 && img.height ){
                    return true;
                   }
            }  
            function isAdDisplay(ele){
                var doc = ele.contentWindow.document;
                var imgs,ifrs;
                if(!doc){
                    return false;
                }
                
                imgs = doc.getElementsByTagName("image");
                if(imgs.length > 0){
                    for(var i in imgs){
                        if(imgSizeCheck(imgs[i]) == true){
                            return true;
                        }
                    }
                }
                ifrs = doc.getElementsByTagName("iframe");
                if(ifrs.length == 0){
                   return false;
                }
                for(var j in ifrs){
                    if(isAdDisplay(ifrs[j]) == true){
                       return true;
                    }
                }
                return false;                        
            }
            function msg(str){
                console.log(str);
            }
            //페이지에서 adop영역 찾고 광고 노출 확인
            function getAdopInven(){
                var adopInvens = [];
                var instags = document.getElementsByTagName("ins");
                var instmp = instags[0].getElementsByTagName("iframe");
                
                console.log(instmp[0].parentNode['class']);
                //for (var k in instmp){
                //    if (instmp.hasOwnProperty(k)) {
                //        console.log("Key is " + k + ", value is " + instmp[k]);
                //    }
                //}
return 'testing...';                
                for(var i in instags){
                    console.log(instags[i]._adop_zon);
                    if(instags[i].getAttribute('_adop_zon') !== null){
                        
                        var ifrTmps = instags[i].getElementsByTagName("iframe");
                        if(ifrTmps.length > 0){
                            var obj = {};
                            obj.cd = instags[i].getAttribute('_adop_zon');
                            obj.type = 'script'
                            obj.iframe = ifrTmps[0];
                            adopInvens.push(obj);
                        }
                        
                    }
                }
                return adopInvens;
            }
              
            function findInven(ele,areaCD){
                var instags = ele.getElementsByTagName("ins");
                var obj = {};
                for(var i in instags){
                    //msg(instags[i].getAttribute('_adop_zon'));
                    if(instags[i].getAttribute('_adop_zon') == areaCD){
                        msg('찾은값 : '+instags[i].getAttribute('_adop_zon'));
                        var ifrTmps = instags[i].getElementsByTagName("iframe");
                            obj.areacd = areaCD;
                            obj.type   = 'script';
                            obj.find   = true;
                            obj.iframe = ifrTmps[0];
                            return obj;
                    }
                }
                var ifrTags = ele.getElementsByTagName("iframe");
                if(ifrTags.length < 1){
                    obj.areacd = areaCD;
                    obj.type   = '';
                    obj.find   = false;
                    obj.iframe = {};
                    return obj;
                }
                for(var k in ifrTags){
                    if(ifrTags[k].getAttribute('id') == areaCD){
                            obj.areacd = areaCD;
                            obj.type   = 'iframe';
                            obj.find   = true;
                            obj.iframe = ifrTmps[k];
                            return obj;                       
                    }
                    var findEle = findInven(ifrTags[k].contentWindow.document,areaCD);
                    if(findEle.find == true){
                        return findEle;
                    }
                }
                    obj.areacd = areaCD;
                    obj.type   = '';
                    obj.find   = false;
                    obj.iframe = {};
                    return obj;                
                    //return '찾지 못했음....';
                 
            }  
            msg(getAdopInven());
return 0;
            return findIframe();  
              
          },adUnitsParam);
          
          function msg(str){
              console.log(str);
          }
          msg(objTmp.length);
          msg(objTmp[0].id);
          //console.log(JSON.stringify(objTmp));
          //msg(JSON.stringify(objTmp[0]));
          page.render('github.png');
          phantom.exit();
                           }(adUnits),100);
          
  }
    else{
        console.log('crawling is fail....');    
        phantom.exit();
    }
  
});

