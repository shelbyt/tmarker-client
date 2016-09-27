var video_url;
var video_id;
var video_time;
var video_name;

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

// Limit the number of times the function can be called to every 10000ms.
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// Based on: goo.gl/h6CllT
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

chrome.commands.onCommand.addListener(debounce(function() {

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

                chrome.tabs.executeScript(null, {
                    file: "jquery-3.1.0.min.js"
                }, function() {
                    chrome.tabs.executeScript(null, {
                            file: "inject.js"
                        },
                        function(test) {

                            var build_youtube_api = "https://www.googleapis.com/youtube/v3/videos?id=" + video_id + "&key=AIzaSyAq35uqJa3xJm2MN72bk2mSPobkMketxfk&part=snippet";
                            console.log(build_youtube_api);

			    // TODO:(shelbyt): Does this have to be synchronous?
                            $.ajax({
                                async: false,
                                dataType: "json",
                                url: build_youtube_api,
                                success: function(data) {
                                    if (typeof(data.items[0]) != "undefined") {
                                        console.log('video exists ' + data.items[0].snippet.title);
                                        video_name = data.items[0].snippet.title;
                                        console.log(video_name);
                                    } else {
                                        console.log('video not exists');
                                    }
                                }
                            });
                            time.push(test);
                            stamp = time[0][0];
                            video_time = stamp;


                            console.log("before post");
                            jQuery.ajax({
                                type: "POST",
                                dataType: "json",
                                async: true,
                                contentType: "application/json; charset=utf-8",
                                url: "http://127.0.0.1:5000/",
                                data: JSON.stringify({
                                    "time": video_time,
                                    "id": video_id
                                }),

				//TODO(shelbyt): Double check edge cases
                                complete: function(data) {


                            chrome.storage.local.get(function(cfg) {
				    /*Current Storage Structure:
				     * STORAGE:{}
				     *    \
				     *     |-> active:
				     *     |-> vid_count:
				     *     |-> vid_dir:{}
				     *            \ 
				     *             |->$vid_id:
				     *                 \
				     *                  |->notes=[]
				     *                  |->ticks=[]
				    * */

                                if (typeof(cfg["vid_count"]) === 'undefined') {
					// First instance of extension
					var initialize_vid_struct = {
                                        	video_name: video_name,
                                        	ticks: [stamp],
				       		notes: [data.responseText]
                                    }

					var initialize_vid_dir = {};
					initialize_vid_dir[video_id] = initialize_vid_struct;

					cfg["vid_dir"] = initialize_vid_dir;
					cfg["vid_count"] = 1;

                                    }

				    else {
				    if(typeof cfg["vid_dir"][video_id] === 'undefined') {
					// First instance of video
					var initialize_vid_struct = {
                                        	video_name: video_name,
                                        	ticks: [stamp],
				       		notes: [data.responseText]
                                    }
					cfg["vid_dir"][video_id] = initialize_vid_struct;
					cfg["vid_count"]++;

				    }

				    else {
					cfg["vid_dir"][video_id].ticks.push(stamp);
					cfg["vid_dir"][video_id].notes.push(data.responseText);
				    }
				    }
					cfg["active"] = video_id;

				// DONT FORGET TO SET STORAGE AFTER WRITING
                                chrome.storage.local.set(cfg);
                                console.log(cfg);
			    });
                                },

                                success: function(data) {
                                    console.log(data);
                                }
                            });

                        });
                });

                console.log("after post");

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
}, 10000, true));
