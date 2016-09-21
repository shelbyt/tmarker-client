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
			note.appendChild(note_text);
			title.appendChild(note);

			var embed_video = document.createElement("iframe");
			youtube_base = "https://www.youtube.com/embed/"
			youtube_time = "?start="
			embed_video.width = "560";
			embed_video.height = "315";
			embed_video.frameBorder = "0";
			embed_video.src = youtube_base + all_keys[i].toString() +
				youtube_time + 
				storage[all_keys[i]].ticks[j].toFixed(0).toString();
			title.appendChild(embed_video);
		}
		frontBody.appendChild(title);
	}
}


document.addEventListener('DOMContentLoaded', function() {
	var storage = chrome.storage.local;
	storage.get(null, function(result) {
		console.log(result);
		var allKeys = Object.keys(result);
		populateSidebar(allKeys, result);
		populatePage(allKeys, result);
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
