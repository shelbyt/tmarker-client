// Module for allowing clicks in the extension popup window
$(document).ready(function() {
    $('body').on('click', 'a', function() {
        chrome.tabs.create({
            url: $(this).attr('href')
        });
        return false;
    });
});
