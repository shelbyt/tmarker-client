function populateSidebar(all_keys, storage) {
	sidebarBody = document.getElementById("sideBarContent");
	for (var i = 0; i < all_keys.length; i++) {
		sideVideoName = document.createElement("a");
		sideVideoName.href = "#" + all_keys[i].toString();
		var link_text = document.createTextNode(storage[all_keys[i]].video_name);
		sideVideoName.appendChild(link_text);
		sidebarBody.appendChild(sideVideoName); }
}	

function populatePage(all_keys, storage) {
	frontBody = document.getElementById("main");
	for(var i = 0; i < all_keys.length; i++) {
		var title = document.createElement("h1");
		title.id = all_keys[i].toString();
		title_text = document.createTextNode(storage[all_keys[i]].video_name);
		title.appendChild(title_text);

		for(var j = 0; j < storage[all_keys[i]].ticks.length; j++) {

			var note = document.createElement("p");
			if(storage[all_keys[i]].notes[j]) {
				note_text = document.createTextNode(
					storage[all_keys[i]].notes[j]);
			}
			else {
				note_text = document.createTextNode("Notes unavailable");
			}

            var hide_button = document.createElement("button");
            hide_button.className = "expander";

            // If there is some bug and the time stamp for a video
            // is null. Should NOT happen.
            if(storage[all_keys[i]].ticks[j] == null){
                bookmarked_time = 0;
            }
            else {
                bookmarked_time = storage[all_keys[i]].ticks[j].toFixed(0).toString();
            }
            hide_button.id = all_keys[i] + bookmarked_time;

			note.appendChild(note_text);
			title.appendChild(note);
            title.appendChild(hide_button);

			var embed_video = document.createElement("iframe");
			youtube_base = "https://www.youtube.com/embed/"
			youtube_time = "?start="
            embed_video.className = "hiddenVid"
            // id of the video is "v"+id+currenttime
            embed_video.id = "v"+all_keys[i]+bookmarked_time
			embed_video.width = "560";
			embed_video.height = "315";
			embed_video.frameBorder = "0";
			embed_video.src = youtube_base + all_keys[i].toString() +
				youtube_time + 
				bookmarked_time;

            var vid_div = document.createElement("div");
            vid_div.appendChild(embed_video);
			title.appendChild(vid_div);
		}
		frontBody.appendChild(title);
	}
}


document.addEventListener('DOMContentLoaded', function() {
	var storage = chrome.storage.local;
	storage.get(null, function(result) {
		console.log(result);
		var allKeys = Object.keys(result.vid_dir);
		populateSidebar(allKeys, result.vid_dir);
		populatePage(allKeys, result.vid_dir);
	});

        $('.mainnav').on('click','button', function () {
            var selector = $(this).attr('id');  // get corresponding element
            console.log(selector);
            $("#v"+selector).slideToggle();
        });


	document.getElementById("navButtonOpen").addEventListener('click',function() {
		document.getElementById("mySidenav").style.width = "250px";
		document.getElementById("main").style.marginLeft = "250px";

		document.getElementById("navButtonClose").addEventListener('click',function() {
			document.getElementById("mySidenav").style.width = "0";
			document.getElementById("main").style.marginLeft= "0";
		});

	});
});
