var video = document.getElementsByTagName("video")[0];
alert(window.location.href);
video.currentTime

// Save it using the Chrome extension storage API.
//chrome.storage.sync.set({'time': video.currentTime}, function() {
// Notify that we saved.
//message('Settings saved');
// });


//var storage = chrome.storage.local;

//var myTestVar = 'myVariableKeyName';

//var obj = {};

//obj[myTestVar] = 'my test var';

//storage.set(obj);
/*
storage.get(myTestVar,function(result){
  console.log(myTestVar,result);
  //console output = myVariableKeyName {myTestVar:'my test var'}
});

storage.get('myTestVar',function(result){
  console.log(result);
  //console output = {myTestVar:'my test var'}
})


        chrome.storage.local.set({'currentTime':video}, function() {
          //message('Settings saved');
        });

        chrome.storage.local.get('currentTime', function (result) {
            console.log(result)
        });

*/

//alert(window.location.href);
//console.log(video.src);
//video.currentTime

//document.body.style.backgroundColor="red";
