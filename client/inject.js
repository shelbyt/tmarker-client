// The FINAL line is returned. If there is a newline after
// the value that needs to be returned then IT WILL RETURN UNDEFINED
var tube = document.getElementById("watch-header");
var iFrame  = document.createElement ("iframe");
iFrame.src  = chrome.extension.getURL ("notify.html");
iFrame.id = "frame_notify";
iFrame.width  = "300px";
iFrame.height = "50px";

tube.insertBefore(iFrame, tube.childNodes[0]);

setTimeout(function(){
$('#frame_notify').fadeOut(500);
},1000)

var video = document.getElementsByTagName("video")[0];
video.currentTime
