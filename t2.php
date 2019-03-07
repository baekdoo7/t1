<?php
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
  <link rel="stylesheet" href="">
<script type="application/javascript">
    var responseHTML = document.createElement("body");
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
    
    function getBody(content) {
        var lowContents = content.toLowerCase();    
        var x = lowContents.indexOf("<body");
        
        if(x == -1) return "";
        x = lowContents.indexOf(">", x);
        if(x == -1) return "";

        var y = lowContents.lastIndexOf("</body>");

        if(y == -1) y = lowContents.lastIndexOf("</html>");
        if(y == -1) y = content.length;    

        return content.slice(x + 1, y);   
    }
    
    function loadHTML(url, fun, storage, param){
	   var xhr = createXHR();
	   xhr.onreadystatechange=function(){ 
		  if(xhr.readyState == 4){
			{
				storage.innerHTML = getBody(xhr.responseText);
				fun(storage, param);
			}
		  } 
	   }; 

	   xhr.open("GET", url , true);
	   xhr.send(null); 
    }
    
    function processHTML(temp, target)
	{
		target.innerHTML = temp.innerHTML;
	}
    
    function loadWholePage(url)
	{
		var y = document.getElementById("storage");
		var x = document.getElementById("displayed");
		loadHTML(url, processHTML, x, y);
	}
    
    function processByDOM(responseHTML, target)
	{
		target.innerHTML = "Extracted by id:<br />";
		var message = responseHTML.getElementsByTagName("div").item(1).innerHTML;
		
		target.innerHTML += message;

		target.innerHTML += "<br />Extracted by name:<br />";
		
		message = responseHTML.getElementsByTagName("form").item(0);
		target.innerHTML += message.dyn.value;
	}
    
    function accessByDOM(url){
		var responseHTML = document.getElementById("storage");
		var y = document.getElementById("displayed");
		loadHTML(url, processByDOM, responseHTML, y);
	}
    
    function startLoading(){
        loadWholePage("http://www.test01.com/t1/sam.php");
    }
    
</script>
</head>
<body>
    <p><button onclick="startLoading();">페이지 가져오기</button></p>
    <hr />
    <div id="storage" style="display:none;"> </div>
    <div id="displayed"> </div>
 
    
   
</body>
</html>