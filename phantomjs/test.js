var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';
page.onConsoleMessage = function(msg) {
  console.log('Page title is ' + msg);
};
page.open('http://compasstest.adop.cc/bs.html', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
      setTimeout(function(){
         
          //page.render('github.png');
          
          page.evaluate(function(){
            //var i = document.getElementsByTagName('iframe');
            //var doc = i[0].contentWindow.document;
            
            var doc = findIframe();
              
            if(doc){
                doc.querySelector('button.close').click();
            }
                //console.log(doc);          
          });
          
          page.render('github.png');
          phantom.exit();
                           },5000);
    //page.render('github.png');
  }
  
});


function findIframe(){
    var i = document.getElementsByTagName('iframe');
    var doc = i[0].contentWindow.document;
    if(doc){
        return doc;
    }
    return null;
}