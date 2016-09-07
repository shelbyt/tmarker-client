// The FINAL line is returned. If there is a newline after
// the value that needs to be returned then IT WILL RETURN UNDEFINED
 /*
$(document).ready(function() {
  //$("button").mouseover(function() {
    var p = $("p").css("background-color", "yellow");
    p.hide(1500).show(1500);
    p.queue(function() {
      p.css("background-color", "red");
    });
 // });
});
$.notify("**********************************");
//alert(window.location.href);
*/
var tube = document.getElementById("watch-header");
var iFrame  = document.createElement ("iframe");
iFrame.src  = chrome.extension.getURL ("notify.html");
iFrame.id = "frame_notify";
//iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
//iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
iFrame.width  = "300px";
iFrame.height = "50px";

//document.body.insertBefore (iFrame, document.body.firstChild);
tube.insertBefore(iFrame, tube.childNodes[0]);

setTimeout(function(){
$('#frame_notify').remove();
},1500);

var video = document.getElementsByTagName("video")[0];
video.currentTime
