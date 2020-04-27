<?php
?>


<!DOCTYPE html>
<html lang="ko">
<head>
  <title>Vew.js Test</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="HTML5 website template">
  <meta name="keywords" content="global, template, html, sass, jquery">
  <meta name="author" content="baekdoo">
  <link rel="stylesheet" href="">   
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>     
</head>
<body>

<div id="app">
  <p>{{ message }}</p>
</div>

    <script>
        var app = new Vue({
            el: '#app',
            data: {
            message: '안녕하세요? Vue.js!'
            }
        })

    </script>   
</body>
</html>