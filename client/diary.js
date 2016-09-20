document.addEventListener('DOMContentLoaded', function() {

document.getElementById("navButtonOpen").addEventListener('click',function() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";

document.getElementById("navButtonClose").addEventListener('click',function() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
});

});


