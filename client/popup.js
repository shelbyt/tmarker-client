function click(e) {
    chrome.tabs.executeScript(null, {
        file: "inject.js"
    });
    //document.getElementById('yellow').innerHTML = 'Hello JavaScript!';

    window.close();
}
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('clearStorageButton');
    link.addEventListener('click', function() {
        $("#main").remove();
        chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        });
    });
});



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

function insertTableTitle(all_keys, storage) {
    tabBody = document.getElementById("main");
    row = document.createElement("tr");
    for (var i = 0; i < all_keys.length; i++) {
        cell1 = document.createElement("th");
        textnode1 = document.createTextNode(storage[all_keys[i]].video_name);
        cell1.appendChild(textnode1);
        row.appendChild(cell1);
    }
    tabBody.appendChild(row);
}

function insertTableRow(row_counter, all_keys, storage) {

    tabBody = document.getElementById("main");
    row = document.createElement("tr");

    var no_print_counter = 0;
    var youtube_url_builder = "https://youtu.be/";
    var youtube_url_time;

    for (var i = 0; i < all_keys.length; i++) {
        if (typeof storage[all_keys[i]].ticks[row_counter] !== 'undefined') {
            youtube_url_builder += (all_keys[i]).toString() + "?t=" +
                (storage[all_keys[i]].ticks[row_counter].toFixed(0)).toString();

            //TODO:(shelbyt): Check other times when this toFixed is needed
            youtube_url_time = (secToHrMin(storage[all_keys[i]].ticks[row_counter].toFixed(2))).toString();

            cell1 = document.createElement("td");
            var a = document.createElement('a');
            var link_text = document.createTextNode(youtube_url_time);
            a.appendChild(link_text);
            a.href = youtube_url_builder;

            cell1.appendChild(a);
            row.appendChild(cell1);

            youtube_url_builder = "https://youtu.be/";
            no_print_counter = 0;

        } else {
            cell1 = document.createElement("td");
            textnode1 = document.createTextNode("");
            cell1.appendChild(textnode1);
            row.appendChild(cell1);
            no_print_counter++;
        }
    }

    tabBody.appendChild(row);
    return no_print_counter;
}

function insertTableData(all_keys, storage) {

    var row_counter = 0;
    while (insertTableRow(row_counter, all_keys, storage) < all_keys.length) {
        row_counter++;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var storage = chrome.storage.local;
    storage.get(null, function(result) {
        console.log(result);
        console.log(result);
        var allKeys = Object.keys(result);
        console.log(allKeys);

        insertTableTitle(allKeys, result);
        insertTableData(allKeys, result);
    });

    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});
