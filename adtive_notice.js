var adtive_notice_ad = {
    zcode: '',
    mcode: '',
    log_url: '//log.adtive.com/noticead',
    show_num: 0,
    start: function(h, i) {
        if (h == 'DB444448' && (window.innerWidth < 1600 || window.innerHeight < 600)) return;
        var j = window.navigator.userAgent;
        var k = j.indexOf('Chrome');
        var l = j.indexOf('CriOS');
        var m = j.indexOf('inapp');
        var n = j.indexOf('SamsungBrowser');
        var o = j.indexOf('DaumApps');
        var p = j.indexOf('Edge');
        var q = j.indexOf('Whale');
        if (h == 'UW444448' && i == 'O8LLLLLF' && (k > -1 || l > -1) && m < 0 && n < 0 && o < 0 && p < 0 && q < 0) return;
        adtive_notice_ad.mcode = h;
        adtive_notice_ad.zcode = i;
        var r = new XMLHttpRequest();
        var s = "paramVal";
        var t = adtive_notice_ad.log_url + "/maker.php";
        r.open("GET", t + "?zcode=" + i + "&mcode=" + h + "&paramName=" + s, true);
        r.send();
        r.onreadystatechange = function() {
            if (r.readyState === XMLHttpRequest.DONE) {
                if (r.status == 200 && adtive_notice_ad.show_num == 0) {
                    var a = JSON.parse(r.responseText);
                    adtive_notice_ad.jdata = a;
                    if (adtive_notice_ad.jdata.zone.adpx_code) {
                        var b = adtive_notice_ad.jdata.zone.adpx_code.replace(/'/gi, '').split(',');
                        if (!b[0] || !b[1]) {
                            console.log('code error');
                            return
                        }
                        var c = b[0].replace(/^\s+|\s+$/g, "");
                        var d = b[1].replace(/^\s+|\s+$/g, "");
                        if (c && d) {
                            var e = '<div id="_2BEON' + d + '"></div>';
                            document.body.insertAdjacentHTML('beforeend', e);
                            var f = adtive_notice_ad.script('js', adtive_notice_ad.log_url + '/adinfo/js/notice_new.js?ver=20190328');
                            adtive_notice_ad.show_num++;
                            if (typeof adtiveDrawAD === 'undefined') {
                                var g = adtive_notice_ad.script('js', '//plugin.adplex.co.kr/script/2beonAdScript.js');
                                g.onload = function() {
                                    adtiveDrawAD(c, d, {
                                        jsDoc: function() {
                                            adtive_notice_pc.start(h, i)
                                        }
                                    })
                                }
                            } else {
                                adtiveDrawAD(c, d, {
                                    jsDoc: function() {
                                        adtive_notice_pc.start(h, i)
                                    }
                                })
                            }
                        } else {
                            console.log('code error');
                            return
                        }
                    } else {
                        var f = adtive_notice_ad.script('js', adtive_notice_ad.log_url + '/adinfo/js/notice_new.js?ver=20190328');
                        f.onload = function() {
                            adtive_notice_pc.start(h, i)
                        }
                    }
                } else {
                    console.log("fail to load")
                }
            }
        }
    },
    script: function(a, b) {
        if (a == 'js') {
            var c = document.createElement('script');
            c.setAttribute('src', b);
            document.head.appendChild(c);
            return c
        }
    }
};


 (function(){adtive_notice_ad.start('NW444448','18LLLLLF')}(document)) 