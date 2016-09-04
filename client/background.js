chrome.commands.onCommand.addListener(function(command) {

  if (command === "log-time") {

  console.log('onCommand event received for message: ', command);
  var kek = "kekkles";
  console.log(kek);
/*
    jQuery.ajax({
    type: "POST",
    async: false,
    url: "http://ec2-52-41-253-245.us-west-2.compute.amazonaws.com",
    data: {"video":"https://www.youtube.com/watch?v=9DUQ7_7Pj_c"},
    success: function(data) {
        console.log(data);
    }
});
*/

  console.debug("before post");
  chrome.tabs.executeScript(null,
      {file:"inject.js"});

  console.log("after post");






  }
});

