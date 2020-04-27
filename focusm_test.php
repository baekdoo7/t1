<?php
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <title>FOCUSM Test</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <script type="application/javascript">
        if(window.addEventListener){
            window.addEventListener("message",listener102,false);
        }
        else if(window.attatchEvent){
            window.attachEvent("onmessage",listener102);
        }

        function listener102(e){
            if( e.data != "adop_noad"){
                return;
            }           
            alert("광고 없음");
        }
        function test01(){
            window.top.postMessage('adop_noad','*');
        }
  </script>
  <style type="text/css">
      body {
          margin: 0;
          padding: 0;
      }
  </style>

</head>
<body>
    <script  src='http://compass.adop.cc/assets/js/adop/adopJ.js?v=14' ></script><ins class='adsbyadop' _adop_zon = 'c74cf410-8a15-4b8b-bd17-fc822e0ae457' _adop_type = 're' style='display:inline-block;width:300px;height:250px;' _page_url=''></ins>
</body>
</html>


