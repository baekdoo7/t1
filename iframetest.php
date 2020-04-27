<?php
?>


<!DOCTYPE html>
<html lang="ko">
<head>
  <title>Test</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script type="application/javascript">
      var ifr;
      function k01(){
          alert("로딩이 완료 되었음.....");
          //<iframe src="http://www.adop.cc" width="500px" height="500px" onload="k01();"></iframe>
      }
      function k02(){
              ifr = document.createElement("iframe");
              ifr.style  = "width:400px;height:400px;background:#ff0000;";
              //ifr.onload = "k01();";
              ifr.addEventListener("load",function(event){k01();});
              ifr.id = "sam02";
              ifr.src = "http://daum.net";
      }
      function k03(){
          var obj = document.getElementById("sam01");
          
          if(obj){
              obj.appendChild(ifr);
          }          
      }
      function k04(){
          var obj = document.getElementById("sam02");
          if(obj){
             var ifrd = obj.contentDocument;
                 ifrd.open();
                 ifrd.write("<html><head></head><body>오징어!!! <br /> <h1>오징어!!!</h1></body></html>");
                 ifrd.close();
          }
      }
  </script>
</head>
<body>
    test...
<hr />
    <div id="sam01" style="width:500px;height:500px;background:#fffff0;">...</div>
    <button onclick="k02();">눌러2</button>
    <button onclick="k03();">눌러3</button>
    <button onclick="k04();">눌러4</button>
    
    
</body>
</html>