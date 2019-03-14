<?php
header('Access-Control-Allow-Origin: http://www.test01.com');
header('Access-Control-Allow-Credentials:true');
?>


<!DOCTYPE html>
<html lang="ko">
<head>
  <title>Test</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="HTML5 website template">
  <meta name="keywords" content="global, template, html, sass, jquery">
  <meta name="author" content="baekdoo">
<script type="application/javascript">

function createXHR() {
    var request = false;
    try{
        request = new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (err2){
        try {
            request = new ActiveXObject('Microsoft.XMLHTTP');
        }
        catch (err3) {
            try {  request = new XMLHttpRequest();}
            catch (err1) { request = false;}
        }
    }
    return request;
}

function loadHTML(url){
   var xhr = createXHR();
   xhr.withCredentials = true;
   xhr.onreadystatechange=function(){ 
	  if(xhr.readyState == 4){
		{
            var obj = document.getElementById("test001");
            obj.innerHTML = xhr.responseText
            
		}
	  } 
   }; 

   xhr.open("GET", url , true);
    xhr.withCredentials = true;
   //xhr.setRequestHeader('Cookie','bbb=1');    
   xhr.send(null); 
}
    
    
</script>
</head>
<body>
    <p>결과값</p>
    <div id="test001"></div>
    <script>
        loadHTML("http://compasstest.adop.cc/sessionChk.php");
    </script>
</body>
</html>