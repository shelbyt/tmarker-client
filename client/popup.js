// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
    chrome.tabs.executeScript(null, {
        file: "inject.js"
    });
    //document.getElementById('yellow').innerHTML = 'Hello JavaScript!';

    window.close();
}


function secToHrMin(time) {
// Minutes and seconds
var mins = ~~(time / 60);
var secs = time % 60;

// Hours, minutes and seconds
var hrs = ~~(time / 3600);
var mins = ~~((time % 3600) / 60);
//TODO:(shelbyt): Check other times when this toFixed is needed
var secs = (time % 60).toFixed(0);

// Output "1:01" or "4:03:59" or "123:03:59"
var ret = "";

if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
}

ret += "" + mins + ":" + (secs < 10 ? "0" : "");
ret += "" + secs;
return ret;
}



document.addEventListener('DOMContentLoaded', function() {

    // var h = document.createElement("H1");
    // var t = document.createTextNode("Hello World");
    // h.appendChild(t);
    // document.body.appendChild(h);
    /*
        chrome.tabs.query({
                'active': true,
                'windowId': chrome.windows.WINDOW_ID_CURRENT
            },
            function(tabs) {
                console.log(youtube_parser(tabs[0].url));
            }
        );
        */
    /*
        chrome.storage.local.get(null, function(items) {

            console.log(items);
            var allKeys = Object.keys(items);
            console.log(allKeys);
        });
        */


    var storage = chrome.storage.local;
    //document.write("<p>hello</p>");
    //TODO:(shelbyt): Change to get key AND title of video
    storage.get(null, function(result) {
        console.log(result);
        console.log(result);
        var allKeys = Object.keys(result);
        console.log(allKeys);
        /*
        chrome.storage.sync.get(null, function(items) {
            var allKeys = Object.keys(items);
            console.log(allKeys);
        });
        */

        var myTable;


        for (var i = 0; i < allKeys.length; i++) {
            if (i == 0) {
                myTable = "<table><tr><td style='width: 100px; color: red;'>" +
                    allKeys[i] + "</td>";
            } else {
                if (i == allKeys.length - 1) {
                    myTable += "<td style='width: 100px; color: red; text-align: right;'>" +
                        allKeys[i] + "</td></tr>";
                } else {
                    myTable += "<td style='width: 100px; color: red; text-align: right;'>" +
                        allKeys[i] + "</td>";
                }
            }
        }

        for (var i = 0; i < allKeys.length; i++) {
            if (i == 0) {
                myTable += "<tr><td style='width: 100px;                   '>---------------</td>";
            } else {
                if (i == allKeys.length - 1) {
                    myTable += "<td     style='width: 100px; text-align: right;'>---------------</td></tr>";
                } else {
                    myTable += "<td     style='width: 100px; text-align: right;'>---------------</td>";

                }

            }

        }


        for (var i = 0; i < allKeys.length; i++) {
            for (var j = 0; j < result[allKeys[i]].length; j++) {

                if (i == 0) {

                    myTable += "<tr><td style='width: 100px;'>" + secToHrMin(result[allKeys[i]][j].toFixed(2)) + "</td>";
                } else {
                    if (i == allKeys.length - 1) {

                        myTable += "<td style='width: 100px; text-align: right;'>" +  secToHrMin(result[allKeys[i]][j].toFixed(2)) + "</td></tr>";
                    } else {

                        myTable += "<td style='width: 100px; text-align: right;'>" + secToHrMin(result[allKeys[i]][j].toFixed(2)) + "</td>";
                    }

                }


            }
        }

        /*
         */

        myTable += "</table>";
        document.write(myTable);

    });

    /*
                                                var h = document.createElement("H1");

                                                //TODO:(shelbyt): Need to pass in correct key of title
                                                var myTable = "<table><tr><td style='width: 100px; color: red;'>" + result["videoId"] + "</td></tr>"; myTable += "<tr><td style='width: 100px;                   '>---------------</td></tr>";

                                                for (var i = 0; i < 5; i++) {
                                                    //result["key"][i] = myArray[i].toFixed(3);
                                                    myTable += "<td style='width: 100px;'>" + result["key"][i] + "</td></tr>";
                                                }
                        			
                                                myTable += "</table>"; document.write(myTable);

                        //console.log(result);
                        //document.getElementById('yellow').innerHTML = result["key"][0];
                        //console output = {myTestVar:'my test var'}
		    */
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});
