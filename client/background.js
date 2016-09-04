chrome.commands.onCommand.addListener(function(command) {

    if (command === "log-time") {

        //console.log('onCommand event received for message: ', command);

        console.log("before post");
        jQuery.ajax({
            type: "POST",
            async: false,
            //dataType: "json",
            url: "http://ec2-52-42-224-68.us-west-2.compute.amazonaws.com:8080/weedwizard",
            data: {
                "video": "https://www.youtube.com/watch?v=9DUQ7_7Pj_c"
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
        /*
        chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        });
        */


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
                        cfg["title"] = "C++";
                    } else {
                        cfg["title"] = "C++";
                        cfg["key"] = [stamp];
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

        storage.get("key", function(result) {
            console.log(result);
            console.log(result["key"][0])

            //console output = {myTestVar:'my test var'}
        })


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
