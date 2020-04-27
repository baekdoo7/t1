/*
* MBSHandler.js
* desc : 인라이플 매체 스크립트를 제어 한다. 배너, 아이커버등의 상품의 스크립트 로직을 여기서 처리 함.
* version : 1.1
* author : bnjjong
* license : 모든 소유권은 (주)Enliple이 가집니다. 무단 배포, 수정을 금지합니다.
*/

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        global.enlipleMBSHandler = factory();
    }
}(this, function () {

    var enlipleMBSHandler ,
        VERSION = '1.1' ,
        oldDomain = "dreamsearch.or.kr",
        newDomain = "mediacategory.com",
        scriptFileName = "MBSHandler.js",
        defaults = {
            cookieInfo : {
                isCopyCookie : true
                , domainForCopy : "dn."+oldDomain + "/cookies/sendCookie.html"// 광고주가 dreamsearch를 호출 하고 있으므로 dreamsearch -> mediacategory
                , domainForCharge : "dn."+newDomain + "/cookies/sendChargeCookie.html" // 과금시 mediacategory 전용 이므로 mediacategory -> dreamsearch
            }
            , isDebugMode : false
            , isSendingErrMsg : false
            , sendKeyParamInfo : {
                isSendingKeyParam : true
                , fromCookieDomain : "www.dreamsearch.or.kr"
            }
            , scriptDownTime : 1000
        },
        options = {
            cookieInfo : defaults.cookieInfo
            , isDebugMode : defaults.isDebugMode
            , isSendingErrMsg : defaults.isSendingErrMsg
            , sendKeyParamInfo : defaults.sendKeyParamInfo
            , scriptDownTime : defaults.scriptDownTime
        },
        productTypeValues =  {
            banner : 1 /* 일반 고정 배너 */
            , bannerScript : 2 /* 토스트, 엣지, 플로팅 */
            , sky : 3
            , ico : 4
            , contentBox : 5
            , hashTag : 6
            , bacon : 7
        },
        platformTypeValues = {
            web : 1
            , mobile : 2
        };



    (function(){
        var headNodes = document.getElementsByTagName("head")[0].children;
        var i=0, length = headNodes.length;
        for(; i<length; i++) {
            if( typeof headNodes[i].nodeName !== 'undefined' &&
                headNodes[i].nodeName.toUpperCase() === "SCRIPT" &&
                headNodes[i].src.indexOf(scriptFileName) > -1) {
                options.isDebugMode = headNodes[i].src.toLowerCase().indexOf("test") > -1;
                break;
            }
        }
        if(options.isDebugMode && console.log) {
            console.log("========================");
            console.log("!!!!it is debug mode!!!!");
            console.log("========================");
        }
    })();

    var doCookieCopy = function(fromDomain, callbackFn){
        if(options.isDebugMode && console.log) {
            console.log("cookie copy start!!!");
        }
        // var copyToDomain = document.location.host.indexOf('mediacategory.com') > -1 ? "www.dreamsearch.or.kr" :  "www.mediacategory.com";

        appendIframeToBody(setHiddenIframe(createIframe("//"+ fromDomain, "0", "0", true, callbackFn)));

        if(options.isDebugMode && console.log) {
            console.log("cookie copy end!!!");
        }
    };

    var appendIframeToBody = function(iframeObj){
        if(options.isDebugMode && console.log) {
            console.log("start append iframe!!!");
        }

        var interval = setInterval(function (){
            if(!document.body) return;
            clearInterval(interval);
            document.body.appendChild(iframeObj);

            if(options.isDebugMode && console.log) {
                console.log("end append iframe!!!");
            }
        },25);



    };

    var appendIframeToDiv = function(iframeObj, divId){
        document.getElementById(divId).appendChild(iframeObj);
    };

    var createIframe = function(src, width, height, isApplyDefaultAttr, onloadCallbackFn) {
        if(options.isDebugMode && console.log) {
            console.log("create iframe" + src);
        }
        var iframe = document.createElement("iframe");
        iframe.src = src;
        iframe.width = width;
        iframe.height = height;
        if(isApplyDefaultAttr) {
            setDefaultAttrOfIframe(iframe);
        }
        if(onloadCallbackFn && typeof onloadCallbackFn === 'function') {
            iframe.onload = onloadCallbackFn;
        }
        if(options.isDebugMode && console.dir && console.log) {
            console.log("iframe obj info >>>>>>>>>>>>>");
            console.dir(iframe);
        }

        return iframe;
    };

    var setDefaultAttrOfIframe = function(iframeObj){
        iframeObj.frameBorder = 0;
        iframeObj.marginWidth = 0;
        iframeObj.marginHeight = 0;
        iframeObj.scrolling = 'no';
    };

    var setHiddenIframe = function(iframeObj) {
        iframeObj.setAttribute('style', 'height:0;width:0;border:0;border:none;visibility:hidden;');
        return iframeObj;
    };

    var importScript = function(scriptUrl, callbackFn) {
        if(options.isDebugMode && console.log) {
            console.log("script down time>>>>" + options.scriptDownTime);
            console.log("import script>>>>" + scriptUrl);
            console.dir(callbackFn);
        }
        var isScriptDownFail = false;
        var scriptTimer = setTimeout( function(){
            if(typeof callbackFn === 'function') {
                if(options.isDebugMode && console.log) {
                    console.log("timeout!! call callback!!!");
                }
                isScriptDownFail = true;
                callbackFn();
            }
        }, options.scriptDownTime);
        var head = document.getElementsByTagName("head").item(0);
        var script = document.createElement("script");
        script.src = scriptUrl;
        script.type = "text/javascript";
        script.onload = function(){
            clearTimeout(scriptTimer);
            if(isScriptDownFail) return;
            if(typeof callbackFn === 'function' ) {
                if(options.isDebugMode && console.log) {
                    console.log("complete to import script call callback!!!");
                }
                callbackFn();
            }
        };
        head.appendChild(script);
    };

    var getKeyOfDreamsearch = function(scriptNo, callbackFn) {
        var url = "//"+options.sendKeyParamInfo.fromCookieDomain+"/script/common/media/"+scriptNo;
        importScript(url, function(){
            if(typeof callbackFn === 'function' ){
                if(typeof retrieveMobonAuidAndIpInfo === 'function') {
                    callbackFn(retrieveMobonAuidAndIpInfo());
                } else {
                    callbackFn({});
                }
            }
        });
    };

    var printParam = function(params, msg){
        if(options.isDebugMode && console.log) {
            console.log(msg);
            var i =0;
            var length = params.length;
            for (; i< length; i++) {
                console.log(params[i]);
            }
            console.log("end print param!!");
        }
    };

    var getBrowserType = function() {
        var agt = navigator.userAgent.toLowerCase();
        if (agt.indexOf("opera") !== -1 || agt.indexOf("opr") !== -1) return 'Opera';
        if (agt.indexOf("edge") !== -1) return 'Edge';
        if (agt.indexOf("staroffice") !== -1) return 'Star Office';
        if (agt.indexOf("webtv") !== -1) return 'WebTV';
        if (agt.indexOf("beonex") !== -1) return 'Beonex';
        if (agt.indexOf("chimera") !== -1) return 'Chimera';
        if (agt.indexOf("netpositive") !== -1) return 'NetPositive';
        if (agt.indexOf("phoenix") !== -1) return 'Phoenix';
        if (agt.indexOf("skipstone") !== -1) return 'SkipStone';
        if (agt.indexOf("chrome") !== -1) return 'Chrome';
        if (agt.indexOf("safari") !== -1) return 'Safari';
        if (agt.indexOf("firefox") !== -1) return 'Firefox';
        if (agt.indexOf("msie") !== -1 || (!!document.documentMode)) return 'Internet Explorer'; // document object has "documentMode" property since IE 11.
        if (agt.indexOf("netscape") !== -1) return 'Netscape';
        if (agt.indexOf("mozilla/5.0") !== -1) return 'Mozilla';
    };

    /************************************
     Constructors
     ************************************/
    function EnlipleMBSHandler(productType, platformType, scriptNo) {
        this.productType = productType;
        this.scriptNo = scriptNo;
        this.platformType = platformType;
        if(productType === productTypeValues.banner
            || productType === productTypeValues.contentBox
            || productType === productTypeValues.hashTag) {
            this.divId = "mobonDivBanner_"+ this.scriptNo;
        }
    }

    enlipleMBSHandler = function(productType, platformType, scriptNo){
        // if(scriptType == productTypeValues.banner) {
        //     document.write("<div id='"+divId+"'></div>");
        // }

        return new EnlipleMBSHandler(productType, platformType, scriptNo);
    };

    enlipleMBSHandler.getProductTypeCode = function(name){
        return productTypeValues[name];
    };

    enlipleMBSHandler.getPlatformTypeCode = function(name){
        return platformTypeValues[name];
    };

    enlipleMBSHandler.getWebCode = function(){
        return platformTypeValues.web;
    };
    enlipleMBSHandler.getMobCode = function(){
        return platformTypeValues.mobile;
    };
    enlipleMBSHandler.setDebugMode = function(isDebugMode){
        options.isDebugMode = isDebugMode;
    };

    enlipleMBSHandler.doCookieCopy = function(callbackFn){
        doCookieCopy(options.cookieInfo.domainForCopy, callbackFn);
    };

    enlipleMBSHandler.doChargeCookieCopy = function(callbackFn){
        doCookieCopy(options.cookieInfo.domainForCharge, callbackFn);
    };


    // 난중에 수정이 좀 필요 하겠다.
    enlipleMBSHandler.runMcover = function(adUrl) {
        printParam(arguments, "appendMCover params>>>");
        if(location.href.indexOf("#_enliple") === -1 || location.hash.indexOf("#_enliple") === -1) {
            history.pushState(null, document.title, location.href);
            history.replaceState(null, document.title, location.href + "#_enliple");
        }
        window.addEventListener('hashchange', function(e){
            if(document.URL.indexOf("#_enliple") !== -1){
            }else{
                setTimeout(function(){
                    location.replace(adUrl);
                },25);
            }
        });
    };


    EnlipleMBSHandler.prototype = {
        createBanner : function(src, width, height) {
            printParam(arguments, "createBanner params");
            var divId = this.divId;
            var sendCookieFn = function(){doCookieCopy(options.cookieInfo.domainForCopy);};

            if (options.sendKeyParamInfo.isSendingKeyParam) {
                getKeyOfDreamsearch(this.scriptNo, function (keyObj) {
                    if (typeof keyObj === 'object' && keyObj.hasOwnProperty('auId')) {
                        src = src + "&au_id=" + keyObj.auId;
                    }
                    if (typeof keyObj === 'object' && keyObj.hasOwnProperty('ipInfo')) {
                        src = src + "&IP_info=" + keyObj.ipInfo;
                    }
                    appendIframeToDiv(createIframe(src, width, height, true, options.cookieInfo.isCopyCookie ? sendCookieFn : undefined), divId);
                });
            } else {
                appendIframeToDiv(createIframe(src, width, height, true, options.cookieInfo.isCopyCookie ? sendCookieFn : undefined), divId);
            }
        } ,
        appendScript : function(src) {
            printParam(arguments, "appendScript params");
            var sendCookieFn = function(){doCookieCopy(options.cookieInfo.domainForCopy);};
            if(options.sendKeyParamInfo.isSendingKeyParam) {
                getKeyOfDreamsearch(this.scriptNo, function(keyObj){
                    if(typeof keyObj === 'object' && keyObj.hasOwnProperty('auId')) {
                        src = src + "&au_id="+keyObj.auId;
                    }
                    if(typeof keyObj === 'object' && keyObj.hasOwnProperty('ipInfo')) {
                        src = src + "&IP_info="+keyObj.ipInfo;
                    }
                    importScript(src, sendCookieFn);
                });
            } else {
                importScript(src, sendCookieFn);
            }
        } ,
        appendPassBackScript : function (src, callbackFn) {
            printParam(arguments, "appendPassBackScript params");
            if(options.sendKeyParamInfo.isSendingKeyParam) {
                getKeyOfDreamsearch(this.scriptNo, function(keyObj){
                    if(typeof keyObj === 'object' && keyObj.hasOwnProperty('auId')) {
                        src = src + "&au_id="+keyObj.auId;
                    }
                    if(typeof keyObj === 'object' && keyObj.hasOwnProperty('ipInfo')) {
                        src = src + "&IP_info="+keyObj.ipInfo;
                    }
                    if(options.cookieInfo.isCopyCookie) {
                        doCookieCopy(options.cookieInfo.domainForCopy, function(){
                            importScript(src, callbackFn);
                        });
                    } else {
                        importScript(src, callbackFn);
                    }
                });
            } else {
                if(options.cookieInfo.isCopyCookie) {
                    doCookieCopy(options.cookieInfo.domainForCopy, function(){
                        importScript(src, callbackFn);
                    });
                } else {
                    importScript(src, callbackFn);
                }
            }
        }
        ,
        appendICover : function(src) {
            printParam(arguments, "appendICover params");

            var sendCookieFn = function() {
                if(getBrowserType() === 'Internet Explorer') {
                    setTimeout(function(){
                        doCookieCopy(options.cookieInfo.domainForCharge);
                    }, 1000);
                } else {
                    doCookieCopy(options.cookieInfo.domainForCharge);

                }
            };

            if(options.sendKeyParamInfo.isSendingKeyParam) {
                getKeyOfDreamsearch(this.scriptNo, function(keyObj){
                    if(typeof keyObj === 'object' && keyObj.hasOwnProperty('auId')) {
                        src = src + "&au_id="+keyObj.auId;
                    }
                    if(typeof keyObj === 'object' && keyObj.hasOwnProperty('ipInfo')) {
                        src = src + "&IP_info="+keyObj.ipInfo;
                    }
                    if(options.cookieInfo.isCopyCookie) {
                        doCookieCopy(options.cookieInfo.domainForCopy, function(){
                            appendIframeToBody(createIframe(src, 0, 0, true, sendCookieFn ));
                        });
                    } else {
                        appendIframeToBody(createIframe(src, 0, 0, true ));
                    }
                });
            } else {
                if(options.cookieInfo.isCopyCookie) {
                    doCookieCopy(options.cookieInfo.domainForCopy, function(){
                        appendIframeToBody(createIframe(src, 0, 0, true, sendCookieFn ));
                    });
                } else {
                    appendIframeToBody(createIframe(src, 0, 0, true ));
                }
            }
        }

    };
    enlipleMBSHandler.version = VERSION;
    return enlipleMBSHandler;
}));