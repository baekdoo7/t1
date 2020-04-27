/**
*@desc cdn https 프로토콜이 없는 관계로 https매체사 송출스크립트 파일 경로 분류하여 관리
*@desc cdn = 'data/js'경로 ssl 미적용매체 , log.svr = 'data/adinfo/js'경로 ssl 적용 매체 스트립트(스케쥴러 자동 배포) 
*@수정(20181029): img경로 adplex cdn 으로 변경 
*@date 2018.10.10
*/

var adtive_notice_pc = {	
	cdn_img: "//plugin.adplex.co.kr/noticeadw",
	//cdn_img: "http://cdn.adtive.com",
	// 노출 비율 
	weight_arr : new Array(),	
	// 배너타입 b - black  ,y-yellow
	btype : [ "y" ],
	campaign_arr: new Array(),
	// 중복 노출하기 위해 스크롤 닫았을 때 위치 저장. 
	close_num :0 ,
	close_pos :0 ,
	close_check : true,
	// 통계용 코드 값.
	code : {
		idx : "t0",
		mcode : "t1",
		zcode : "t2",
		ad_type : "t3",
		cpno : "t4",
		banner_type : "t5",
		matno: "t6",
		cpkind: "t7",
		close_yn : "n"		
	},
	//배너 토출 체크
	banner_check : false,
	// 마우스 오버 한번만 되게 체크
	noticeAd_pc_cnt : 0,	
	//매체코드 
	zcode : '',
	//영역코드 
	mcode : '',
	getRandomItem : function(list, weight) {
		var total_weight = weight.reduce(function(prev, cur, i, arr) {
			return Number(prev) + Number(cur);
		});
		var random_num = adtive_notice_pc.rand(0, total_weight);
		var weight_sub = total_weight;
		for (var i = 0; i < list.length; i++) {
			if (random_num <= weight_sub && random_num > weight_sub - weight[i]) {				
				return i;
			} else if(i == list.length-1) {
				return i;
			}
			weight_sub -= weight[i];
		}
		// end of function
	},
	set_ad_type : function () {
		var data=[];
		var camp_idx = 0;
		for (var i = 0; i < 10; i++) {			
			camp_idx = adtive_notice_pc.getRandomItem(adtive_notice_pc.campaign_arr, adtive_notice_pc.weight_arr);			
			if (camp_idx != adtive_notice_pc.code.idx)
				break;
		}
		data['idx']=camp_idx;
		data['camp'] = adtive_notice_pc.campaign_arr[camp_idx];
		data['banner_idx'] = Math.floor(Math.random() * adtive_notice_pc.btype.length);
		return data;

	},
	check_url : function(url) {
		var t_code = adtive_notice_pc.code;
		var url2='';
		if (url.indexOf('=') > -1) {
			url2=url+'&';
		} else if (url.indexOf('?') > -1) {
			url2=url;
		} else {
			url2=url+'?';
		}

		//파라미터 붙이기
		var code_param = "mcode=" + t_code.mcode
				+ "&zcode=" + t_code.zcode + "&btype="
				+ t_code.ad_type + "&cpno=" + t_code.cpno + "&matno=" + t_code.matno+ "&cpkind=" + t_code.cpkind;
				
		var adpx_be_cd='noticeW_'+t_code.mcode+'-'+t_code.zcode+'_'+t_code.cpno+'_'+t_code.matno;
		url2=url2.replace('{be_cd}',adpx_be_cd);//자동변환

		return url2+code_param;
	},
	rand : function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	//광고 노출 시작 
	start : function(mcode, zcode) {
		adtive_notice_pc.sheet();

		var zone = adtive_notice_ad.jdata.zone;
		if(zone.status != 'y' && zone.status != '' && zone.status != undefined) {
			return false;
		}
		// 브라우저당 한시간 한번 노출. 
		if (zone.user_vlimit == 'y') {
			//쿠키 있는지 확인
			var cookie_name = 'adtive_' + mcode + '_' + zcode;
			var cookie_ck = adtive_notice_pc.getCookie(cookie_name);
			//설정된 쿠키가 없으면,
			if (cookie_ck == null) {
				adtive_notice_pc.setCookie(cookie_name, 'y', 1);
			} else {
				return false;
			}
		}
		//노출할지말지..
		var show_opt=['y','n'];
		var show_yn=show_opt[adtive_notice_pc.getRandomItem(show_opt, [zone.view_per, 100-zone.view_per])];
		if(show_yn == 'n') return;

		adtive_notice_pc.campaign_arr = adtive_notice_ad.jdata.campaign;
		if(adtive_notice_pc.campaign_arr.length == 0) return;
		for (var i = 0; i < adtive_notice_ad.jdata.campaign.length; i++) {
			adtive_notice_pc.weight_arr[i] = adtive_notice_ad.jdata.campaign[i].cpn_rate;
		}
		
		adtive_notice_pc.show_banner();
		var agent = adtive_notice_pc.get_browser();
		var show_flag=false;
		var bannerObj=document.getElementById("noticeAd_banner_wrap");
		var exc_mcode=['9G444448','WG444448','LG444448','XG444448','NG444448'];
		var limit_top=0;
		var limitClassName='';
		var limit_obj='';
		if(mcode == 'DB444448' || mcode == '18444448' || mcode == 'LW444448') {
			limitClassName='left_ad';
			if(mcode == 'LW444448') limitClassName='inner_banner';
			limit_obj = document.getElementsByClassName(limitClassName)[0];
//			if(limit_obj) limit_top = limit_obj.offsetTop+limit_obj.offsetHeight;
			//var window_height=window.innerHeight;
			if(limit_obj) {
				limit_top = limit_obj.getBoundingClientRect().height+limit_obj.offsetTop-300;
				if(mcode == 'LW444448') limit_top+=450;
				/**				
				if(window_height>760) {
					limit_top = limit_obj.offsetTop+350;
				} else if(window_height>600) {
					limit_top = limit_obj.offsetTop+500;
				}
				*/
			}
		}
		// 아시아 경제는 브라우저 별로 노출
		if(zcode == 'C8LLLLLF') {
//			console.log('아시아경제 ');
			if(window.innerWidth<1857 ||  window.innerHeight < 910) {
//				console.log('해상도 낮음 ');
				return false;
			}
		}
		if(zone.view_trem == 1) {
			if(adtive_notice_pc.banner_check != true) {
			   setTimeout(function(){ 
				    adtive_notice_pc.ad_start();
				    var mcode=adtive_notice_pc.code.mcode;
					var isScrolling;
					window.addEventListener('scroll', function() {
						if(limit_obj && (limit_top>=this.scrollY || limit_top>=document.documentElement.scrollTop)) {
							show_flag=true;
							bannerObj.className="banner_wrap animate-down";
						} else {

						  if (limit_obj && agent=='IE') {
							bannerObj.className="banner_wrap animate-up";
							show_flag=false;
						  } else {
							  var zone = adtive_notice_ad.jdata.zone;
							  if (zone.device == "w") {
							  if(this.oldScroll > this.scrollY) {
//									console.log("up");
									if(show_flag == false) {
										if(exc_mcode.indexOf(mcode) > -1) {
											bannerObj.className="banner_wrap";
										} else {
											bannerObj.className="banner_wrap animate-down";
										}
										show_flag=true;
									}
							  } else {
//									console.log("down");
									if(show_flag == true) {
										if(exc_mcode.indexOf(mcode) > -1) {
											bannerObj.className="banner_wrap";
										} else {
											bannerObj.className="banner_wrap animate-up";
										}
										show_flag=false;
									}
							  }
							  this.oldScroll = this.scrollY;
							  } else
							  {
								  if(zone.scrollHide_banner == "1" ) { 
									  bannerObj.style.display = "none"; 

									// Clear our timeout throughout the scroll
									window.clearTimeout( isScrolling );

									// Set a timeout to run after scrolling ends
									isScrolling = setTimeout(function() {
										bannerObj.style.display = "block"; 
									}, 66);

								  }
							  }
						  }
						}
					});
			   }, 2000);
			}
		} else {
			//var open_top_position = (zone.scroll_px) ? zone.scroll_px : 0;
			var open_top_position = (zone.scroll_px > 0) ? zone.scroll_px : window.innerHeight;
			if(zone.view_trem == 3 && zone.selector.indexOf('.') > -1) {
				var className=zone.selector.replace(".","");
				if(document.getElementsByClassName(className)[0]) open_top_position = document.getElementsByClassName(className)[0].offsetTop;
			}
			if(mcode == 'DB444448' || mcode == '18444448' || mcode == 'LW444448') open_top_position = limit_top;
			// Setup isScrolling variable
			var isScrolling;
			window.addEventListener('scroll', function() {
				if ((document.body.scrollTop > open_top_position || document.documentElement.scrollTop > open_top_position || window.pageYOffset > open_top_position)
						&& adtive_notice_pc.banner_check != true) {
					adtive_notice_pc.ad_start();
				}
				if(limit_obj && (limit_top>=this.scrollY || limit_top>=document.documentElement.scrollTop)) {
					//document.getElementsByClassName("banner_wrap")[0].offsetTop = limit_top;
					show_flag=true;
					bannerObj.className="banner_wrap animate-down";
				} else {
				  // print "false" if direction is down and "true" if up
				  if (limit_obj && agent=='IE') {
					bannerObj.className="banner_wrap animate-up";
					show_flag=false;
				  } else {
					  var zone = adtive_notice_ad.jdata.zone;
					  if (zone.device == "w") {
						  if(this.oldScroll > this.scrollY) {
								if(show_flag == false) {
									if(exc_mcode.indexOf(mcode) > -1) {
										bannerObj.className="banner_wrap";
									} else {
										bannerObj.className="banner_wrap animate-down";
									}
									show_flag=true;
								}
						  } else {
								if(show_flag == true) {
									if(exc_mcode.indexOf(mcode) > -1) {
										bannerObj.className="banner_wrap";
									} else {
										bannerObj.className="banner_wrap animate-up";
									}
									show_flag=false;
								}
						  }
						  this.oldScroll = this.scrollY;
					  } else
					  {
						  if(zone.scrollHide_banner == "1" ) {

							  bannerObj.style.display = "none";



								// Clear our timeout throughout the scroll
								window.clearTimeout( isScrolling );

								// Set a timeout to run after scrolling ends
								isScrolling = setTimeout(function() {
									bannerObj.style.display = "block"; 
								}, 66);

							  /**
							  setTimeout(function(){ 
								  bannerObj.style.display = "block"; 
							  },1000)
							  */
						  }
					  }
					}
				}
			});
		}
	},
	get_browser : function() {
		if ( navigator.userAgent.indexOf("Edge") > -1 && navigator.appVersion.indexOf('Edge') > -1 ) {
			return 'Edge';
		}
		else if( navigator.userAgent.indexOf("Opera") != -1 || navigator.userAgent.indexOf('OPR') != -1 )
		{
			return 'Opera';
		}
		else if( navigator.userAgent.indexOf("Chrome") != -1 )
		{
			return 'Chrome';
		}
		else if( navigator.userAgent.indexOf("Safari") != -1)
		{
			return 'Safari';
		}
		else if( navigator.userAgent.indexOf("Firefox") != -1 ) 
		{
			return 'Firefox';
		}
		else if( ( navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true ) ) //IF IE > 10
		{
			return 'IE';
		}  
		else 
		{
			return 'unknown';
		}
	},
	show_banner : function() {
		adtive_notice_pc.close_num ++;
		var banner_type = adtive_notice_pc.set_ad_type();
		var camp_idx=banner_type['idx'];
		var camp=banner_type['camp'];
		var banner_idx=banner_type['banner_idx'];

		var banner_img = '';
		var matno = 0;
		var b_img1 = camp.cpn_mat1;
		var b_img2 = camp.cpn_mat2;
		var b_img_arr = (b_img2) ? [b_img1, b_img2] : [b_img1];
		var b_matno_arr = (camp.cpn_matno2) ? [camp.cpn_matno1, camp.cpn_matno2] : [camp.cpn_matno1];
		var b_img_idx = Math.floor(Math.random() * b_img_arr.length);
		if(b_img_idx == 1)
			var ad_type = 'B';
		else
			var ad_type = 'A';
		banner_img = b_img_arr[b_img_idx];
		matno = b_matno_arr[b_img_idx];
		banner_img = adtive_notice_pc.cdn_img+banner_img;
		adtive_notice_pc.code = {
			idx : camp_idx,
			mcode : adtive_notice_ad.mcode,
			zcode : adtive_notice_ad.zcode,
			ad_type : ad_type,
			matno : matno,
			cpno : camp.cpno,
			cpkind : camp.cpn_kind,
			close_yn : adtive_notice_pc.code.close_yn
		};
		adtive_notice_pc.banner_view('type' + banner_idx,banner_img, camp);
	},
	
	show_pop : function () {
		adtive_notice_pc.noticeAd_pc_cnt = 1;

		var t_code = adtive_notice_pc.code;
		var ifrm_obj = document.getElementById("noticeAd_pc_iframe");

		var pc_h = window.innerHeight;
		var pc_w = window.innerWidth;
		var camp = adtive_notice_pc.campaign_arr[t_code.idx];
		
		var noticeAd_pc_iframe_w = (camp.cpn_popup_w > 0) ? Number(camp.cpn_popup_w) : 400;
		var noticeAd_pc_iframe_h = (camp.cpn_popup_h > 0) ? Number(camp.cpn_popup_h) : pc_w - 44;
		
		if(noticeAd_pc_iframe_w > pc_w - 40)
			noticeAd_pc_iframe_w = pc_w - 40;

		if(noticeAd_pc_iframe_h > pc_h - 40)
			noticeAd_pc_iframe_h = pc_h - 40;

		var noticeAd_pc_iframe_mt = (pc_h - (noticeAd_pc_iframe_h+30)) / 2 ;
		ifrm_obj.style.marginTop=noticeAd_pc_iframe_mt+'px';
		ifrm_obj.style.display = "inline-block";
		var bg_noticeAd_pc_iframe = document.getElementById("bg_noticeAd_pc_iframe");
		bg_noticeAd_pc_iframe.style.display = "block";

		var url = adtive_notice_pc.check_url(camp.cpn_url);
		if (location.protocol == 'https:')
		{
			url=url.replace('http://','https://');
		}
		var addStyle = "";
		var ifm_html = "<div class='noticeAd_pc_iframe_box' id='noticeAd_pc_iframe_box'><iframe src='"
				+ url
				+ "' width='"
				+ noticeAd_pc_iframe_w
				+ "' height='"
				+ noticeAd_pc_iframe_h
				+ "' frameborder='0' scrolling='yes' style='"
				+ addStyle
				+ "'></iframe><div class='close' onclick='adtive_notice_pc.noticeAd_pc_close();'>닫기</div></div>";
		ifrm_obj.innerHTML = ifm_html;

		var div_obj = document.getElementById("noticeAd_pc_wrap");
		div_obj.style.display = "none";
		adtive_notice_pc.log(t_code.mcode, t_code.zcode,t_code.ad_type, t_code.cpno, t_code.matno, 'clk', t_code.cpkind);
	},
	show_guage : function() {
		var noticeAd_pc_gauge = document.getElementById("noticeAd_pc_gauge");
		var name = "bar";
		var arr = noticeAd_pc_gauge.className.split(" ");
		if (arr.indexOf(name) == -1) {
			noticeAd_pc_gauge.className += " " + name;
		}
	},
	remove_guage : function() {
		var noticeAd_pc_gauge = document.getElementById("noticeAd_pc_gauge");
		var name = "bar";
		var arr = noticeAd_pc_gauge.className.split(" ");
		if (arr.indexOf(name) >= -1) {
			noticeAd_pc_gauge.className = noticeAd_pc_gauge.className.replace(" " + name, "");
		}
	},
	//start banner
	ad_start : function() {
		adtive_notice_pc.banner_check = true;
		var t_code = adtive_notice_pc.code;
		if (t_code.close_yn == "n") {
			adtive_notice_pc.log(t_code.mcode, t_code.zcode, t_code.ad_type, t_code.cpno, t_code.matno, 'v', t_code.cpkind);
		}
		var ad_obj = document.getElementById("noticeAd_pc_wrap");
		var name = "run";
		var arr = ad_obj.className.split(" ");
		if (arr.indexOf(name) == -1) {
			ad_obj.className += " " + name;
		}
		
		
		// 배너 슬라이드 
		var zone = adtive_notice_ad.jdata.zone;
		if(  zone.device == "m") {
			var ad_obj = document.getElementById("noticeAd_banner_wrap");
//			console.log(zone);
			if (zone.position=='T') {
				var name = "notice_slideInDown";
			} else {
				var name = "notice_slideInUp";
			}
			var arr = ad_obj.className.split(" ");
			if (arr.indexOf(name) == -1) {
				ad_obj.className += " " + name;
			}
		}
		

		var ad_obj = document.getElementById("noticeAd_pc_wrap_img");
		var timer;
		var close_obj = document.getElementById("noticeAd_pc_wrap_close");
		var close_obj_2 = document.getElementById("noticeAd_pc_wrap_close_2");
		var zone=adtive_notice_ad.jdata.zone;
		if (zone.device == "w") {
		ad_obj.onmouseover = function() {
			close_obj.style.display="block";
			close_obj_2.style.display="block";
		};
		
		ad_obj.onmouseout = function() {
			close_obj.style.display="none";
			close_obj.onmouseover = function() {
			close_obj.style.display="block";
			}
			
			close_obj_2.style.display="none";
			close_obj_2.onmouseover = function() {
			close_obj_2.style.display="block";
			}
			
		};
		}	
	},	
	// 방문 ,배너 노출, 클릭 통계 (매체, 영역,배너타입, 캠페인번호,소재번호, 노출구분, 캠페인구분)
	log : function(mcode, zcode, type, cpno, matno, kind, cpkind) {
		if(!mcode || !zcode) return;
		//			return false;
		var dt = new Date();
		var dtt = dt.getTime();
		var _Img = new Image();
		var r_num = Math.floor(Math.random() * 1000000000);
		_Img.src = adtive_notice_ad.log_url + "/wlog.php?mcode=" + mcode
				+ "&zcode=" + zcode + "&type=" + type + "&cpno="
				+ cpno + "&kind=" + kind + "&matno=" + matno +"&cpkind=" + cpkind + "&time=" + r_num;
	},	
	// css 
	sheet : function() {
		 var zone=adtive_notice_ad.jdata.zone;
		// Create the <style> tag
		var css = document.createElement("style");
		// Add a media (and/or media query) here if you'd like!
		// css.setAttribute("keyframes", "screen")
		// css.setAttribute("media", "only screen and (max-width : 1024px)")
		var styles = '.noticeAd_pc_wrap {margin:0;padding:0;-webkit-tap-highlight-color:rgba(0,0,0,0);z-index:999999998;}';
		styles += '.noticeAd_pc_wrap div, .noticeAd_pc_wrap dl, .noticeAd_pc_wrap dt, .noticeAd_pc_wrap dd, .noticeAd_pc_wrap ul, .noticeAd_pc_wrap ol, .noticeAd_pc_wrap li, .noticeAd_pc_wrap h1, .noticeAd_pc_wrap h2, .noticeAd_pc_wrap h3, .noticeAd_pc_wrap h4, .noticeAd_pc_wrap h5, .noticeAd_pc_wrap h6, .noticeAd_pc_wrap pre, .noticeAd_pc_wrap form, .noticeAd_pc_wrap fieldset, .noticeAd_pc_wrap input, .noticeAd_pc_wrap p, .noticeAd_pc_wrap blockquote, .noticeAd_pc_wrap table, .noticeAd_pc_wrap th, .noticeAd_pc_wrap td, .noticeAd_pc_wrap embed, .noticeAd_pc_wrap object, .noticeAd_pc_wrap textarea, .noticeAd_pc_wrap a, .noticeAd_pc_wrap img{padding:0;margin:0;}';
		styles += '.noticeAd_pc_wrap ol, .noticeAd_pc_wrap ul, .noticeAd_pc_wrap li{list-style:none;display:block;}';
		styles += '.noticeAd_pc_wrap div{display:block;}';
		styles += '.noticeAd_pc_wrap img{border:0;vertical-align:top;}';
		styles += '.noticeAd_pc_wrap{display:none;}';		
		styles += '.noticeAd_pc_wrap.run{display:block;}';
		styles += '.noticeAd_pc_wrap.run ul{list-style-type:none;margin:0;padding:0;}';		
		styles += '.noticeAd_pc_wrap.run .banner_wrap{width:320px;position:fixed;z-index:999999998;height:auto;}';		
		if (zone.device == "w") {
			styles += '.noticeAd_pc_wrap.run .banner_wrap img{width:100%;}';
		} else {
			styles += '.noticeAd_pc_wrap.run .banner_wrap img{width:338px;margin:auto;}';
		}
		
		if (zone.device == "w") {
			styles += '.noticeAd_pc_wrap.run .banner_wrap .btn_close{display:none;position:absolute;top:25px;right:22px;width:18px;height:18px;text-indent:-9999em;background:#FFF url('+adtive_notice_pc.cdn_img+'/upload/images/x_bt.png) center center no-repeat;}';
		} else
		{
			styles += '.noticeAd_pc_wrap.run .banner_wrap .btn_close{position:absolute; top:2px; right:2px; width:28px; height:28px; border:0; text-indent:-9999em; background:transparent url(//news.targetview.com/bnrBand_m/images/topBnr_close.png) center center no-repeat / 11px;background-size:14px 14px;background-position: 7px 7px }';
		}
		styles += '.noticeAd_pc_wrap.run .banner_wrap .btn_close_2{display:none;position:absolute;top:1px;right:1px;width:19px;height:19px;text-indent:-9999em;background:#FFF url('+adtive_notice_pc.cdn_img+'/upload/images/infor_ad_icon.png) center center no-repeat;}';
		
		styles += '.noticeAd_pc_wrap.run .banner_wrap,.noticeAd_pc_wrap.run .banner_wrap a,.noticeAd_pc_wrap.run .banner_wrap a:after{box-sizing:initial;}';
		styles += '.noticeAd_pc_wrap .banner_wrap{bottom:0;}';
		styles += '.noticeAd_pc_wrap_a{display:block;}';
		styles += '.noticeAd_pc_wrap .banner_wrap:hover{cursor:pointer;}';
		styles += '.noticeAd_pc_wrap.type1.run .banner_wrap{animation:type1 0.5s ease-in-out;}';
		styles += '.noticeAd_pc_wrap.type2.run .banner_wrap{animation:type2 0.5s ease-in-out;}';
		styles += '@keyframes type1 {0%{bottom:-120px;}100%{bottom:0;}}';
		styles += '@keyframes type2 {0%{bottom:-132px;}100%{bottom:0;}}';

		styles += '#noticeAd_pc_iframe{background:#FFF;border:2px solid #000;border-radius:3px;z-index:9999999999 !important;display:inline-block;}';
		styles += '#noticeAd_pc_iframe .noticeAd_pc_iframe_box{position:relative;margin:0;padding:13px 13px 9px 13px;}';
		styles += '#noticeAd_pc_iframe .close{position:absolute;right:-39px;top:7px;width:28px;height:28px;background:url('+adtive_notice_pc.cdn_img+'/upload/images/notice_close2.png) center center no-repeat;cursor:pointer;text-indent:-9999em;}';
		styles += '.bg_noticeAd_pc_iframe{width:100%;height:200%;position:fixed;top:0;left:0;background:rgba(255,255,255,0.75);z-index:9999999999 !important;display:none;text-align:center;}';
		styles += '.noticeAd_pc_wrap.run .banner_wrap .gauge{position:absolute;top:0px;left:10px;width:0;height:4px;display:block;text-indent:-9999em;background:#00eaff;}';
		styles += '.noticeAd_pc_wrap.run .banner_wrap .gauge.bar{animation:gauge 0.5s ease-in-out;}';

		if (zone.device == "w") {
			styles += '.animate-up{position:relative;animation:animateup 1s}@keyframes animateup{from{bottom:-300px;opacity:0} to{bottom:0;opacity:1}}';
		} else
		{
			styles += '.animate-up{ animation-name: noticeAd_animation; animation-duration: 1s; animation-timing-function: linear; animation-direction: alternate; }';
		}
		
		
		styles += '@keyframes gauge {0%{width:0;}100%{width:300px;}}';
		if (zone.device == "w") {
			styles += '.animate-down{bottom:-300px !important;position:relative;animation:animatedown 1s}@keyframes animatedown{from{bottom:0;opacity:1} to{bottom:-300px;opacity:0}}';
		} else
		{
			styles += '.animate-down{animation:animatedown 1s}@keyframes animatedown{from{opacity:1} to{opacity:0}}';
//			styles += '.animate-down{!important;position:relative;animation:animatedown 1s}@keyframes animatedown{from{opacity:1} to{opacity:0}}';
		}
		styles += " .noticeAd_pc_wrap.wrap_new .noticeAd_pc_wrap.wrap_new .banner_wrap, .noticeAd_pc_wrap.wrap_new .banner_wrap a, .noticeAd_pc_wrap.wrap_new .banner_wrap a:after, .noticeAd_pc_wrap.wrap_new .banner_header, .noticeAd_pc_wrap.wrap_new .banner_content, .noticeAd_pc_wrap.wrap_new .ico_wrap_new {box-sizing:border-box;}.noticeAd_pc_wrap.wrap_new .banner_wrap {position:fixed;   z-index:999999998; ";
		
//		console.log(zone);
		if (zone.device == "w") {
			styles += " width:328px; height:246px; right:50px; border-radius:17px; ";
		} else
		{
			styles += " width:100%; height:90px; text-align:center;background:#fff;";
		}
		styles += "font-family: 'Noto Sans KR', sans-serif;} ";
		
		styles += " .notice_slideInDown { animation-duration: 1s; animation-name: notice_slideInDown;} @keyframes notice_slideInDown {  from { top:-150px; }  to { top:0px; }} ";
		styles += " .notice_slideInUp { animation-duration: 1s; animation-name: notice_slideInUp; } @keyframes notice_slideInUp { from { bottom:-150px; }  to { bottom:0px; }} ";
		
		css.appendChild(document.createTextNode(styles));

		// Add the <style> element to the page
		document.head.appendChild(css);

	},
	//show banner
	banner_view : function(type, image, camp) {
		 var zone=adtive_notice_ad.jdata.zone;
		 var t_code=adtive_notice_pc.code;
		 var style = 'height:auto;';
		 if(t_code.mcode=='DB444448') style+='left:0px;';
		 else if(zone.direction=='L') style+='left:50px;';
		 if(zone.margin_position=='T') style+='margin-top:'+zone.margin+'px;';
		 if(zone.margin_position=='B') style+='margin-bottom:'+zone.margin+'px;';
		 //특정매체 z-index값
		 if(zone.z_index>0 || zone.z_index<0 || t_code.mcode=='MO444448') style+='z-index:'+zone.z_index+';';
		 if(zone.device =="m") {
			 if (zone.position=="T") style+='top:0px; height: 90px; border-bottom:2px solid #303030;';
			 if (zone.position=="B") style+='bottom:0px; height: 90px; border-top:2px solid #303030;';
		 }
         var target="javascript:;";
			var script="";
//         if(camp.cpn_landing_open=='W') {
             target=adtive_notice_pc.check_url(camp.cpn_url);
				script=' target="_blank" onclick="adtive_notice_pc.log(\''+t_code.mcode+'\',\''+t_code.zcode+'\',\''+t_code.ad_type+'\',\''+t_code.cpno+'\',\''+t_code.matno+'\',\'clk\',\''+t_code.cpkind+'\');"';
//         }
		 var str = '';
            str +='<div class="noticeAd_pc_wrap wrap_new '+type+'"  id="noticeAd_pc_wrap">';
            str +='<div class="banner_wrap animate-up" id="noticeAd_banner_wrap" style="display: block;'+style+'" ';
            str +='>';

            if(zone.device !="m") { str +='<a href="'+target+'" id="noticeAd_pc_wrap_a"'+script+'>'; }
            else { 
               	str +='<div onclick=" window.open(\'about:blank\').location.href=\''+target+'\';  adtive_notice_pc.log(\''+t_code.mcode+'\',\''+t_code.zcode+'\',\''+t_code.ad_type+'\',\''+t_code.cpno+'\',\''+t_code.matno+'\',\'clk\',\''+t_code.cpkind+'\');" >';
               	
            }
            
			str +='<img src="'+image+'" alt="광고 영역" id="noticeAd_pc_wrap_img" /> ';
			
			 if(zone.device !="m") {
				 str +='</a>';
			 } 
			 else
			{
				 str +='</div>';
			}

            str +='<a href="javascript:adtive_notice_pc.noticeAd_banner_close();" class="btn_close" id="noticeAd_pc_wrap_close">닫기</a>';
            if(zone.device =="w") {
            str +='<a href="http://www.adtive.com/customer/inquire_write.html" target="_blank" class="btn_close_2" id="noticeAd_pc_wrap_close_2">닫기</a>';
			}
            str +='<span class="gauge" id="noticeAd_pc_gauge"></span>';
            str +='</div></div>';
            str +='<div class="bg_noticeAd_pc_iframe" id="bg_noticeAd_pc_iframe">';
            str +='<div id="noticeAd_pc_iframe">';
            str +='</div></a></div>';
//          console.log(camp); 
//            document.body.innerHTML+=str;
            document.body.insertAdjacentHTML('beforeend', str);
            
//            if(zone.device =="m") {
//				var ad_link_obj = document.getElementById("noticeAd_banner_wrap");
////				ad_link_obj.href=adtive_notice_pc.check_url(camp.cpn_url);
////				ad_link_obj.target='_blank';
//				ad_link_obj.onclick = function() {
//					console.log('click');
//					window.open('about:blank').location.href=''test.html"; +
//						
////					adtive_notice_pc.log(t_code.mcode, t_code.zcode,ad_type, t_code.cpno, t_code.matno, 'clk', t_code.cpkind);
////					adtive_notice_pc.noticeAd_pc_cnt =1;
//				};
//            }
			
	},
	// noticead popup close
	noticeAd_pc_close : function() {
		var ifrm_obj = document.getElementById("noticeAd_pc_iframe");
		ifrm_obj.style.display = "none";

		var bg_noticeAd_pc_iframe = document.getElementById("bg_noticeAd_pc_iframe");
		bg_noticeAd_pc_iframe.style.display = "none";

		//  배너 다시 나타나게 ,
		adtive_notice_pc.noticeAd_pc_cnt = 0;
		adtive_notice_pc.code.close_yn = 'y';
		var noticeAd_pc_gauge = document.getElementById("noticeAd_pc_gauge");
		noticeAd_pc_gauge.className = "gauge";

		var notice_obj = document.getElementById("noticeAd_pc_wrap");
		var t_code = adtive_notice_pc.code;
		
		var banner_type = adtive_notice_pc.set_ad_type();
		var camp_idx=banner_type['idx'];
		var camp=banner_type['camp'];
		var banner_idx=banner_type['banner_idx'];
		
		var ad_obj = document.getElementById("noticeAd_pc_wrap_img");

		var banner_img = '';
		var matno = 0;
		var b_img1 = camp.cpn_mat1;
		var b_img2 = camp.cpn_mat2;
		var b_img_arr = (b_img2) ? [b_img1, b_img2] : [b_img1];
		var b_matno_arr = (camp.cpn_matno2) ? [camp.cpn_matno1, camp.cpn_matno2] : [camp.cpn_matno1];
		var b_img_idx = Math.floor(Math.random() * b_img_arr.length);
		if(b_img_idx == 1)
			var ad_type = 'B';
		else
			var ad_type = 'A';

		banner_img = b_img_arr[b_img_idx];
		matno = b_matno_arr[b_img_idx];

		adtive_notice_pc.code.idx = camp_idx;
		adtive_notice_pc.code.cpno = camp.cpno;
		adtive_notice_pc.code.banner_type = banner_type;
		adtive_notice_pc.code.ad_type = ad_type;
		adtive_notice_pc.code.matno = matno;
		adtive_notice_pc.code.cpkind = camp.cpn_kind;
		banner_img = adtive_notice_pc.cdn_img+banner_img;

		ad_obj.src = banner_img;
		
		if(camp.cpn_landing_open == 'W') {
			var ad_link_obj = document.getElementById("noticeAd_pc_wrap_a");
			ad_link_obj.href=adtive_notice_pc.check_url(camp.cpn_url);
			ad_link_obj.target='_blank';
			// or use an anonymous function:+

			ad_link_obj.onclick = function() {
				adtive_notice_pc.log(t_code.mcode, t_code.zcode,ad_type, t_code.cpno, t_code.matno, 'clk', t_code.cpkind);
				adtive_notice_pc.noticeAd_pc_cnt =1;
			};
		}
		adtive_notice_pc.ad_start();
		notice_obj.style.display = "inline-block";

	},

	// noticead banner close
	noticeAd_banner_close : function() {
		var notice_obj = document.getElementById("noticeAd_pc_wrap");
		notice_obj.outerHTML='';
		
		var bg_noticeAd_pc_iframe = document.getElementById("bg_noticeAd_pc_iframe");
		bg_noticeAd_pc_iframe.outerHTML='';
		
//		adtive_notice_pc.close_num ++;
		adtive_notice_pc.close_pos = document.documentElement.scrollTop;
		
		var zone = adtive_notice_ad.jdata.zone;
		if(adtive_notice_pc.close_num  <= zone.redo_num && zone.device == "m") {
			adtive_notice_pc.show_banner();			
			window.addEventListener('scroll', function() {
				var ss_xx = Math.abs(adtive_notice_pc.close_pos- document.documentElement.scrollTop);
				if(zone.redo_px < ss_xx &&  adtive_notice_pc.close_num  <= zone.redo_num && zone.device == "m"  ) {
//					console.log("재노출");
					var notice_obj = document.getElementById("noticeAd_pc_wrap");
					var cls_str = notice_obj.getAttribute("class");
					if(cls_str.search("run") == -1)  { 
						notice_obj.classList.add("run");
						//console.log("재노출");
					}
					
					var ad_obj = document.getElementById("noticeAd_banner_wrap");
//					console.log(zone);
					if (zone.position=='T') {
						var name = "notice_slideInDown";
					} else {
						var name = "notice_slideInUp";
					}
					var arr = ad_obj.className.split(" ");
					if (arr.indexOf(name) == -1) {
						ad_obj.className += " " + name;
					}
					
				  if(zone.scrollHide_banner == "1" ) { 
					  notice_obj.style.display = "none"; 
					  setTimeout(function(){ 
						  notice_obj.style.display = "block"; 
					  },1000)
				  }
				}
			});
		}
		
//		console.log()
	},

	// cookie set
	setCookie : function(name, value, hour) {
		var date = new Date();
		date.setTime(date.getTime() + hour * 60 * 60 * 1000);
		document.cookie = name + '=' + value + ';expires=' + date.toUTCString()+ ';path=/';
	},
	// get cookie 
	getCookie : function(name) {
		var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		return value ? value[2] : null;
	},
	// del cookie
	deleteCookie : function(name) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
};