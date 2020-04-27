<!DOCTYPE html>
<html lang="ko">
<head>
  <title><?=$_GET['title']?></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="HTML5 website template">
  <meta name="keywords" content="global, template, html, sass, jquery">
  <meta name="author" content="baekdoo">
  <link rel="stylesheet" href="">
    <script type="application/javascript">
        var setCookie = function(name, value, exp) {
                            var date = new Date();
                            date.setTime(date.getTime() + exp*24*60*60*1000);
                            document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
                        };
        var getCookie = function(name) {
                            var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
                            return value? value[2] : null;
                        };
        var deleteCookie = function(name) {
                            setCookie(name,'','-1');
                        };
        var imageSet = function(){
                            var t1 = getCookie('id');
                            var obj = document.getElementById(img);
                            img.src = t1 + '.png';            
        }

//deleteCookie('name');
    </script>
    <style type="text/css">
        body {
            margin: 0;
            background-color: #f0f0f0;
        }
        .title_txt {
            color : white;  
            margin-left: 10px;
        }
        .title_bar{
            background-color: black;
            width: 100%;
            height: 30px;
            
        }
        .title_bar2{
            display: table-cell;
            vertical-align: middle;            
            background-color: black;
            width: 100%;
            height: 30px;
            
        }
        #img{
            width: 300px;
            height : 250px;
        }
        .close_btn{
            width: 280px;
            height: 40px;
            text-align: center;
            margin-left: 10px;
        }
        .chk {
            margin-left: 10px;
        }
        .btn_delete{
            position: absolute;
            top: 6px;
            right: 4px;
        }
    </style>
</head>
<body>
    <div class="title_bar"><div class="title_bar2"><span class="title_txt"> 알약 알리미</span></div></div>
    <img src="" id="img" />
    <br />
    <div class="chk"> <input type="checkbox" ></input><font color="gray">zum으로 시작페이지 설정</font></div>
    <button class="close_btn" onclick="window.postMessage('102','*');">확인 후 닫기</button>
    <button class="btn_delete" onclick="deleteCookie('id');imageSet();">쿠키삭제</button>
    <script type="application/javascript">
        imageSet();
    </script>
</body>
</html>