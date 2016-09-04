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

function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}


document.addEventListener('DOMContentLoaded', function() {

    // var h = document.createElement("H1");
    // var t = document.createTextNode("Hello World");
    // h.appendChild(t);
    // document.body.appendChild(h);

    chrome.tabs.query({
            'active': true,
            'windowId': chrome.windows.WINDOW_ID_CURRENT
        },
        function(tabs) {
            console.log(youtube_parser(tabs[0].url));
        }
    );

    var storage = chrome.storage.local;
    //document.write("<p>hello</p>");
    //TODO:(shelbyt): Change to get key AND title of video
    storage.get("key", function(result) {
        /*
        chrome.storage.sync.get(null, function(items) {
            var allKeys = Object.keys(items);
            console.log(allKeys);
        });
        */

        var h = document.createElement("H1");

        //TODO:(shelbyt): Need to pass in correct key of title
        var myTable = "<table><tr><td style='width: 100px; color: red;'>" + result["title"] + "</td></tr>";
        myTable += "<tr><td style='width: 100px;                   '>---------------</td></tr>";

        for (var i = 0; i < 5; i++) {
            //result["key"][i] = myArray[i].toFixed(3);
            myTable += "<td style='width: 100px;'>" + result["key"][i] + "</td></tr>";
        }
        myTable += "</table>";
        document.write(myTable);


        //console.log(result);
        //document.getElementById('yellow').innerHTML = result["key"][0];
        //console output = {myTestVar:'my test var'}
    })
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});
