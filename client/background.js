var video_url;

function youtubeParser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

chrome.commands.onCommand.addListener(function(command) {

    if (command === "log-time") {

        chrome.tabs.query({
                'active': true,
                'windowId': chrome.windows.WINDOW_ID_CURRENT
            },
            function(tabs) {
                video_url = tabs[0].url;
            }
        );

        //console.log('onCommand event received for message: ', command);

        console.log("before post");
        jQuery.ajax({
            type: "POST",
            async: false,
            //dataType: "json",
            url: "http://ec2-52-42-224-68.us-west-2.compute.amazonaws.com:8080/weedwizard",
            data: {
                "video": video_url 
            },
            success: function(data) {
                //console.log("inside post");
                console.log(data);
                //console.debug(data);
            }
        });
        console.log("after post");



        var time = [];
        var stamp;
        
        chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        });
        


        var storage = chrome.storage.local;


        //console.debug("before post");
        chrome.tabs.executeScript(null, {
                file: "inject.js"
            },
            function(test) {
                var variable = 10;
                time.push(test);
                console.log(variable);

                //console.log(time);
                //console.log(time[0][0]);
                stamp = time[0][0];
                //console.log(time.length);
                chrome.storage.local.get(function(cfg) {
                    if (typeof(cfg["key"]) !== 'undefined' && cfg["key"] instanceof Array) {
                        cfg["key"].push(stamp);
			cfg["videoId"]=youtubeParser(video_url);
                    } else {
                        cfg["key"] = [stamp];
			cfg["videoId"]=youtubeParser(video_url);
                    }
                    chrome.storage.local.set(cfg);
                });
                /*
                    chrome.storage.sync.set({ "data" : test }, function() {
                    if (chrome.runtime.error) {
                      console.log("Runtime error.");
                    }
                  });
                */


            });
/*
        storage.get("key", function(result) {
            console.log(result);
            console.log(result["key"][0])

        })
	*/


        function callback(bytes) {
            console.log("Total bytes in use: " + bytes);
        }
        storage.getBytesInUse(null, callback);


        Storage.showTotalBytes = function() {
            function callback(bytes) {
                console.log("Total bytes in use: " + bytes);
            }
            if (arguments.length == 0) {
                console.log("0 arguments");
                return chrome.storage.local.getBytesInUse(null, callback);
            } else {

                console.log("more arguments");
                var ary = arguments.slice();
                ary.push(callback);
                return chrome.storage.local.getBytesInUse.apply(null, ary);
            }
        };


        //storage.get('myTestVar',function(result){
        //console.log(result);
        //console output = {myTestVar:'my test var'}
        //})







    }
});
