$.fn.notify = function(settings_overwrite){
    settings = {
        placement:"top",
        default_class: ".message",
        delay:0
    };
    $.extend(settings, settings_overwrite);
    
    $(settings.default_class).each(function(){$(this).hide();});
    
    $(this).show().css(settings.placement, -$(this).outerHeight());
    obj = $(this);
    
    if(settings.placement == "bottom"){
        setTimeout(function(){obj.animate({bottom:"0"}, 500)},settings.delay);
    }
    else{
        setTimeout(function(){obj.animate({top:"0"}, 500)},settings.delay);
    }
}

$(document).ready(function(){
$("#notify_success").notify();
}); 
