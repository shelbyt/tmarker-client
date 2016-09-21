function populateSidebar(all_keys, storage) {
	sidebarBody = document.getElementById("sideBarContent");
	for (var i = 0; i < all_keys.length; i++) {
		sideVideoName = document.createElement("a");
		sideVideoName.href = "#";
		var link_text = document.createTextNode(storage[all_keys[i]].video_name);
		sideVideoName.appendChild(link_text);
		sidebarBody.appendChild(sideVideoName);
	}
}	

document.addEventListener('DOMContentLoaded', function() {
	var storage = chrome.storage.local;
	storage.get(null, function(result) {
		console.log(result);
		var allKeys = Object.keys(result);
		populateSidebar(allKeys, result);
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
