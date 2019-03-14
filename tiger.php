<?php
?>


<!DOCTYPE html>
<html lang="ko">
<head>
  <title>통합테스트</title>       
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="HTML5 website template">
  <meta name="keywords" content="global, template, html, sass, jquery">
  <meta name="author" content="baekdoo">
  <link rel="stylesheet" href="">
  <style type="text/css">
      html, body {height: 100%;}
  </style>
  <script src="common.js"></script>       

    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <style type="text/css">
----------------------------------------*/
@import url(http://fonts.googleapis.com/css?family=Roboto);

/* Ace Responsive Menu
----------------------------------------*/
a {
    text-shadow: none;
    color: #0d638f;
}
ul {
    margin: 0px;
    padding: 0px;
}
.ace-responsive-menu {
    list-style: none;
    margin: 0;
    padding: 0;
    background: #333;  
    float:left;
    width:100%;
    font-family: 'Roboto', sans-serif;
    border-bottom: 3px solid #FD5025;        
}
.ace-responsive-menu li{
    list-style: none;
}
.ace-responsive-menu li ul {
    display:none;
}
.ace-responsive-menu > li {
    display: block;
    margin: 0;
    padding: 0;
    border: 0px;
    float: left;
}
.ace-responsive-menu li a {
        color:#c0c0c0;
}
.ace-responsive-menu > li > a {
    display: block;
    position: relative;
    margin: 0;
    border: 0px;
    padding: 18px 20px 18px 12px;
    text-decoration: none;
    font-size: 15px;
    font-weight: 300;
    color: #c0c0c0;
}
.ace-responsive-menu li a i {
    padding-right: 5px;
    color: #FF5737;
}
.ace-responsive-menu > li > a i {
    font-size: 16px;
    text-shadow: none;
    color: #FF5737;
}
.ace-responsive-menu li ul.sub-menu li a i {
    padding-right: 10px;
}
.ace-responsive-menu li.menu-active > a {
    background: #272727 !important;
    color:#fff;
}
.ace-responsive-menu li .menu-active {
    position: relative;
}
.ace-responsive-menu > li > a > .arrow:before {  
    margin-left: 15px;
    display: inline;
    font-size: 16px;
    font-family: FontAwesome;
    height: auto;
    content: "\f107";
    font-weight: 300;
    text-shadow: none;
    width: 10px;
    display: inline-block;
}
.ace-responsive-menu li ul.sub-menu li > a > .arrow:before {
    content: "\f105" !important;
}
.ace-responsive-menu > li > ul.sub-menu {
    display: none;
    list-style: none;
    clear: both;
    margin: 0;
    position: absolute;
}
.ace-responsive-menu li ul.sub-menu {
    background: #333;
}
.ace-responsive-menu li ul.sub-menu > li {
    width: 185px;
}
.ace-responsive-menu li ul.sub-menu li a {
    display: block;
    margin: 0px 0px;
    padding: 12px 20px 12px 15px;
    text-decoration: none;
    font-size: 13px;
    font-weight: normal;
    background: none;
}
.ace-responsive-menu > li > ul.sub-menu > li {
    position: relative;
}
.ace-responsive-menu > li > ul.sub-menu > li ul.sub-menu {
    position: absolute;
    left: 185px;
    top: 0px;
    display: none;
    list-style: none;
}
.ace-responsive-menu > li > ul.sub-menu > li ul.sub-menu > li ul.sub-menu {
    position: absolute;
    left: 185px;
    top: 0px;
    display: none;
    list-style: none;
}
.ace-responsive-menu > li > ul.sub-menu li > a > .arrow:before {
    float: right;
    margin-top: 1px;
    margin-right: 0px;
    display: inline;
    font-size: 16px;
    font-family: FontAwesome;
    height: auto;
    content: "\f104";
    font-weight: 300;
    text-shadow: none;
}

/* Menu Toggle Btn
----------------------------------------*/
.menu-toggle {
    display: none;
    float: left;
    width: 100%;
    background: #333;
}
.menu-toggle h3 {
    float: left;
    color: #FFF;
    padding: 0px 10px;
    font-weight: 600;
    font-size: 16px;
}
.menu-toggle .icon-bar {
    display: block !important;
    width: 18px;
    height: 2px;
    background-color: #F5F5F5 !important;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
    margin: 3px;
}
.menu-toggle .icon-bar:hover {
    background-color: #F5F5F5 !important;
}
.menu-toggle #menu-btn {
    float: right;
    background: #202020;
    border: 1px solid #0C0C0C;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
}
.hide-menu {
    display: none;
}


/* Accordion Menu Styles
----------------------------------------*/

ul[data-menu-style="accordion"] {
    width: 250px;
}
ul[data-menu-style="accordion"] > li {    
    display: block;
    margin: 0;
    padding: 0;
    border: 0px;
    float: none !important;
}
ul[data-menu-style="accordion"] > li:first-child {
    border-top: 2px solid #FD5025;
}
ul[data-menu-style="accordion"] li ul.sub-menu > li {
    width: 100%;
}
ul[data-menu-style="accordion"] > li > a > .arrow:before {
    float: right;
    content: "\f105";
}
ul[data-menu-style="accordion"] li.menu-active > a > .arrow:before {
    content: "\f107" !important;
}
ul[data-menu-style="accordion"] > li > ul.sub-menu {
    position: static;
}
ul[data-menu-style="accordion"] > li > a i {
    padding-right: 10px;
    color: #FF5737;
}
ul[data-menu-style="accordion"] > li > ul.sub-menu > li ul.sub-menu {
    position: static;
}
ul[data-menu-style="accordion"] > li > ul.sub-menu > li ul.sub-menu > li ul.sub-menu {
    position: static;
}
ul[data-menu-style="accordion"] > li {
    border-bottom: 1px solid #242424;
}
ul[data-menu-style="accordion"] li a:hover {
    background: #272727 !important;
}
ul[data-menu-style="accordion"] ul.sub-menu li.menu-active > a > .arrow:before {
    content: "\f107" !important;
}

/* Vertical Menu Styles
----------------------------------------*/

ul[data-menu-style="vertical"] {
    width: 200px;
}
ul[data-menu-style="vertical"] > li {
    float: none;
}
ul[data-menu-style="vertical"] > li:first-child {
    border-top: 2px solid #FD5025;
}
ul[data-menu-style="vertical"] li ul.sub-menu > li {
    width: 100%;
}
ul[data-menu-style="vertical"] > li > a > .arrow:before {
    float: right;
    content: "\f105";
}
ul[data-menu-style="vertical"] > li.menu-active {
position:relative;
}
ul[data-menu-style="vertical"] > li > ul.sub-menu {
    position: absolute;
    left:200px;
    top:0px;
    width:200px;
}
ul[data-menu-style="vertical"] > li > a i {
    padding-right: 10px;
    color: #FF5737;
}
ul[data-menu-style="vertical"]> li > ul.sub-menu > li ul.sub-menu {
    position: absolute;
    width:200px;
    left: 200px;
}
ul[data-menu-style="vertical"] > li > ul.sub-menu > li ul.sub-menu > li ul.sub-menu {
    position: absolute;
    width:200px;
    left: 200px;
}
ul[data-menu-style="vertical"] > li {
    border-bottom: 1px solid #242424;
}
ul[data-menu-style="vertical"] li a:hover {
    background: #272727 !important;
}

/* Responsive Menu Styles
----------------------------------------*/
/*Note: change the max-width asper your requirment and change the same in aceResponsiveMenu({resizeWidth: "768" }) function*/

@media screen and (max-width: 768px) {
    .demo {
		width:96%;
		padding:2%;
    }
    ul[data-menu-style="vertical"] , ul[data-menu-style="accordion"],
    ul[data-menu-style="vertical"] li ul.sub-menu {
        width: 100% !important;
    } 
    .ace-responsive-menu {
        float: left;
        width:100%;
    }
    .ace-responsive-menu > li {
        border-bottom: 1px solid #242424;
       float: none;
    }   
    .ace-responsive-menu li a:hover {
        background: #272727 !important;
    }
    .ace-responsive-menu > li:first-child {
        border-top: 2px solid #FD5025;
    }    
    .ace-responsive-menu > li > a i {
        padding-right: 10px;
        color: #FF5737;
    }
    .ace-responsive-menu > li > a > .arrow:before {
        float: right;
        content: "\f105";
    }
    li.menu-active > a > .arrow:before {
        content: "\f107" !important;
    }
    .ace-responsive-menu li ul.sub-menu > li {
        width: 100%;
    }
    .ace-responsive-menu li ul.sub-menu li ul.sub-menu li a
        {
        padding-left: 30px;
    }  
    .ace-responsive-menu li ul.sub-menu li ul.sub-menu li ul.sub-menu li a 
       {
        padding-left: 50px;
    }  
    .ace-responsive-menu > li > ul.sub-menu {
        position: static;
    }
    .ace-responsive-menu > li > ul.sub-menu > li ul.sub-menu {
        position: static;
    }
    .ace-responsive-menu > li > ul.sub-menu > li ul.sub-menu > li ul.sub-menu {
        position: static;
    }
    .ace-responsive-menu li ul.sub-menu li.menu-active > a > .arrow:before {
        content: "\f107" !important;
    }
}
    
    </style>
</head>
<body>
    <!--
    <p>
        <button onclick="makeFrame();">프레임생성</button>
        <button onclick="startLoading();">컨텐츠내려받기(콤파스)</button>
        <button onclick="startLoading2();">컨텐츠내려받기(인사이트)</button>
    </p>
    -->
    <!-- Ace Responsive Menu -->
    <nav>
        <!-- Menu Toggle btn-->
        <div class="menu-toggle">
            <h3>Menu</h3>
            <button type="button" id="menu-btn">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <!-- Responsive Menu Structure-->
        <!--Note: declare the Menu style in the data-menu-style="horizontal" (options: horizontal, vertical, accordion) -->
        <ul id="respMenu" class="ace-responsive-menu" data-menu-style="horizontal">
              <li>
                <a href="javascript:location.href='https://one.adop.cc/tiger.php';">
                    <i class="fa fa-home" aria-hidden="true"></i>
                    <span class="title">Home</span>
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="fa fa-cube" aria-hidden="true"></i>
                    <span class="title">Compass</span>

                </a>
                <!-- Level Two-->
                <ul>
                    <li>
                        <a href="javascript:startLoading2(1);">DashBoard</a>
                    </li>
                    <li>
                        <a href="javascript:startLoading2(2);">광고게재(캠페인)</a>
                    </li>
                    <li>
                        <a href="javascript:startLoading2(3);">인벤토리(영역)</a>
                    </li>
                    <li>
                        <a href="javascript:startLoading2(4);">보고서(일별)</a>
                    </li>
                </ul>
            </li>

            <li>
                <a href="javascript:;">
                    <i class="fa fa-crop" aria-hidden="true"></i>
                    <span class="title">Insight</span>
                </a>
                <!-- Level Two-->
                <ul>
                    <li>
                        <a href="javascript:startLoading2(5);">
                            <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                            DashBoard						
                        </a>
                    </li>
                    <li>
                        <a href="javascript:startLoading2(6);">
                            <i class="fa fa-database" aria-hidden="true"></i>
                            에이전시(통합보고서)
                        </a>
                    </li>
                    <li>
                        <a href="javascript:startLoading2(7);">
                            <i class="fa fa-amazon" aria-hidden="true"></i>
                            컨텐츠 최적화 현황							
                        </a>

                    </li>

                    <li>
                        <a href="javascript:startLoading2(8);">
                            <i class="fa fa-database" aria-hidden="true"></i>
                            고객센타(공지사항)
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <a class="" href="javascript:;">
                    <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                    <span class="title">Atom</span>

                </a>
                <ul>
                    <li>
                        <a href="#">아톰메뉴 1
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">아톰메뉴 2					
                        </a>
                        <ul>
                            <li><a href="#">광고주정보</a></li>
                            <li><a href="#">정산</a></li>
                            <li><a href="#">보고서</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;">아톰메뉴 3						
                        </a>
                        <ul>
                            <li><a href="#">캠페인</a></li>
                            <li><a href="#">타케팅</a></li>
                            <li><a href="#">소재</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Sub Item Four
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                    <span class="title">Products</span>
                </a>
            </li>
            <li class="last ">
                <a href="javascript:;">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    <span class="title">Contact Us</span>
                </a>
            </li>
        </ul>
    </nav>
    
    <hr />
    <iframe name="mainFrame" id="mainFrame" frameborder="0" width="100%" height="100%"></iframe>

        
    	<!--Plugin Initialization-->
     <script type="text/javascript">
         $(document).ready(function () {
             $("#respMenu").aceResponsiveMenu({
                 resizeWidth: '768', // Set the same in Media query       
                 animationSpeed: 'fast', //slow, medium, fast
                 accoridonExpAll: false //Expands all the accordion menu on click
             });
         });
	</script>
    <script>
    
(function ($) {
    $.fn.aceResponsiveMenu = function (options) {

        //plugin's default options
        var defaults = {
            resizeWidth: '768',
            animationSpeed: 'fast',
            accoridonExpAll: false
        };

        //Variables
        var options = $.extend(defaults, options),
            opt = options,
            $resizeWidth = opt.resizeWidth,
            $animationSpeed = opt.animationSpeed,
            $expandAll = opt.accoridonExpAll,
            $aceMenu = $(this),
            $menuStyle = $(this).attr('data-menu-style');

        // Initilizing        
        $aceMenu.find('ul').addClass("sub-menu");
        $aceMenu.find('ul').siblings('a').append('<span class="arrow "></span>');
        if ($menuStyle == 'accordion') { $(this).addClass('collapse'); }

        // Window resize on menu breakpoint 
        if ($(window).innerWidth() <= $resizeWidth) {
            menuCollapse();
        }
        $(window).resize(function () {
            menuCollapse();
        });

        // Menu Toggle
        function menuCollapse() {
            var w = $(window).innerWidth();
            if (w <= $resizeWidth) {
                $aceMenu.find('li.menu-active').removeClass('menu-active');
                $aceMenu.find('ul.slide').removeClass('slide').removeAttr('style');
                $aceMenu.addClass('collapse hide-menu');
                $aceMenu.attr('data-menu-style', '');
                $('.menu-toggle').show();
            } else {
                $aceMenu.attr('data-menu-style', $menuStyle);
                $aceMenu.removeClass('collapse hide-menu').removeAttr('style');
                $('.menu-toggle').hide();
                if ($aceMenu.attr('data-menu-style') == 'accordion') {
                    $aceMenu.addClass('collapse');
                    return;
                }
                $aceMenu.find('li.menu-active').removeClass('menu-active');
                $aceMenu.find('ul.slide').removeClass('slide').removeAttr('style');
            }
        }

        //ToggleBtn Click
        $('#menu-btn').click(function () {
            $aceMenu.slideToggle().toggleClass('hide-menu');
        });


        // Main function 
        return this.each(function () {
            // Function for Horizontal menu on mouseenter
            $aceMenu.on('mouseover', '> li a', function () {
                if ($aceMenu.hasClass('collapse') === true) {
                    return false;
                }
                $(this).off('click', '> li a');
                $(this).parent('li').siblings().children('.sub-menu').stop(true, true).slideUp($animationSpeed).removeClass('slide').removeAttr('style').stop();
                $(this).parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                return;
            });
            $aceMenu.on('mouseleave', 'li', function () {
                if ($aceMenu.hasClass('collapse') === true) {
                    return false;
                }
                $(this).off('click', '> li a');
                $(this).removeClass('menu-active');
                $(this).children('ul.sub-menu').stop(true, true).slideUp($animationSpeed).removeClass('slide').removeAttr('style');
                return;
            });
            //End of Horizontal menu function

            // Function for Vertical/Responsive Menu on mouse click
            $aceMenu.on('click', '> li a', function () {
                if ($aceMenu.hasClass('collapse') === false) {
                    //return false;
                }
                $(this).off('mouseover', '> li a');
                if ($(this).parent().hasClass('menu-active')) {
                    $(this).parent().children('.sub-menu').slideUp().removeClass('slide');
                    $(this).parent().removeClass('menu-active');
                } else {
                    if ($expandAll == true) {
                        $(this).parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                        return;
                    }
                    $(this).parent().siblings().removeClass('menu-active');
                    $(this).parent('li').siblings().children('.sub-menu').slideUp().removeClass('slide');
                    $(this).parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                }
            });
            //End of responsive menu function

        });
        //End of Main function
    }
})(jQuery);

    </script>
</body>
</html>