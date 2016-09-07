var video_url;
var video_id;
var video_time;

function youtubeParser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function clearStorage() {

    chrome.storage.local.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}

chrome.commands.onCommand.addListener(function(command) {

    chrome.tabs.query({
            'active': true,
            'windowId': chrome.windows.WINDOW_ID_CURRENT
        },
        function(tabs) {
            // TODO:(shelbyt): Do we have to  cover an edge case
            // in case someone tries to use the hotkey on the chome
            // developer page or some other page like chrome-extension
            // for which we explictly do NOT have permissions for? Right now
            // this just throws an exception and nothing happens which is OK.
            video_url = tabs[0].url;
            video_id = youtubeParser(video_url);
            if (typeof(video_id) !== 'undefined' && video_id !== false) {

                var time = [];
                var stamp;

                var storage = chrome.storage.local;


                //console.debug("before post");
		chrome.tabs.executeScript(null, {file: "jquery-3.1.0.min.js"}, function() {
                chrome.tabs.executeScript(null, {
                        file: "inject.js"
                    },
                    function(test) {
                        //var variable = 10;
			//test = 999;
                        time.push(test);
                        //console.log(variable);

                       // console.log(test);
                       // console.log(time[0][0]);
                        stamp = time[0][0];
                        video_time = stamp;
                        //console.log(time.length);
                        chrome.storage.local.get(function(cfg) {
                            /*
			var tick_key = cfg[video_id];
                    if (typeof(tick_key) !== 'undefined' &&
                        tick_key["ticks"] instanceof Array) {

                        tick_key["ticks"].push(stamp);
                    } else {
                        tick_key["ticks"] = [stamp];
                    }
		    */


                            if (typeof(cfg[video_id]) !== 'undefined' && cfg[video_id] instanceof Array) {
                                cfg[video_id].push(stamp);
                            } else {
                                cfg[video_id] = [stamp];
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
		});

                console.log("before post");
                jQuery.ajax({
                    type: "POST",
                    async: false,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    url: "http://ec2-52-42-224-68.us-west-2.compute.amazonaws.com:8080/weedwizard",

                    data: JSON.stringify({
                        "tickedAt": video_time,
                        "videoId": video_id
                    }),
                    success: function(data) {
                        //console.log("inside post");
                        console.log(data);
                        //console.debug(data);
                    }
                });
                console.log("after post");
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
            }
        });
});
