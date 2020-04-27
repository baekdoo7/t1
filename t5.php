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
</head>
<body>

  
    
  
<div id="digitalchosun_v_out_inr_700x405-my-div"></div>    
<script>
    
window.impactifyTag = window.impactifyTag || [];
impactifyTag.push({
    "appId": "digitalchosun.dizzo.com",
    "format": "screen",
    "style": "static",
    "container": "#digitalchosun_v_out_inr_700x405-my-div",
    "onNoAd": function(){
// insert your passback code here
var passbackCode = '<iframe src="http://tracker.adbinead.com/other/dizzo_P_a_innerV__300x250.html" width="300" height="250" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" vspace="0" hspace="0" allowtransparency="true" style="margin: 0px 0px 30px 0px; padding: 0px; border: currentColor; border-image: none; width: 300px; height: 250px; visibility: visible; position: relative; background-color: transparent;"></'+'iframe>';
// a DOM Element, jQuery object, or id selector
var passbackContainer = document.getElementById('digitalchosun_v_out_inr_700x405-my-div');
var head= document.getElementsByTagName('head')[0];
var scrpt = document.createElement('script');
scrpt.type = 'text/javascript';
scrpt.src ='https://cdnjs.cloudflare.com/ajax/libs/postscribe/2.0.8/postscribe.min.js';
scrpt.onload = function () {
postscribe(passbackContainer, passbackCode, {
done: function() { console.log('Passback has been added'); }
});
};
head.appendChild(scrpt);
}
});
(function(d, s, id) {
    var js, ijs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://ad.impactify.io/static/ad/tag.js';
    ijs.parentNode.insertBefore(js, ijs);
}(document, 'script', 'impactify-sdk'));
(function() {var implog_tag = document.createElement("script");implog_tag.src = "//data.adop.cc/collect.php?log=com_imp&dt=20190710075145&aid=0e05884d-f908-415b-840f-ef327b948d69&zid=89f90081-b752-42a1-ba32-cad452365078&r=o1kf";document.getElementsByTagName("body")[0].appendChild(implog_tag);})();

</script>  
        <script src="tjs5.php"></script>
</body>
</html>