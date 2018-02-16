// The FINAL line is returned. If there is a newline after
// the value that needs to be returned then IT WILL RETURN UNDEFINED
//

// TODO(shelbyt): Causes some cross domain error.
// Check if there is a stray iframe left from the last
// bookmark and remove it if there is.
if($('#frame_notify').length) {
$('#frame_notify').remove();
}

var tube = document.getElementById("info");
//if(tube == null){
//	tube = document.getElementById("info");
//}
var iFrame  = document.createElement ("iframe");
iFrame.src  = chrome.extension.getURL ("notify.html");
iFrame.id = "frame_notify";
iFrame.width  = "300px";
iFrame.height = "50px";

tube.insertBefore(iFrame, tube.childNodes[0]);

setTimeout(function(){
$('#frame_notify').fadeOut(500);
},500)

var video = document.getElementsByTagName("video")[0];
video.currentTime