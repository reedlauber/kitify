(function(a){a.HowItWorks=function(n){var k=a.Component({id:"howitworks",duration:3800,_times:50},n);var j,f;var c,g=0,i=0,b=0;function e(o){if(k.options.times&&k.options.times>0&&b>k.options.times){clearInterval(c);return}j.removeClass("slide-previous");if(o){$(j[i]).addClass("slide-previous").removeClass("slide-active").css("left","auto").animate({right:"100%"},"normal",function(){$(this).css("right","auto")});$(j[g]).addClass("slide-active").css("left","100%").animate({left:0},"normal")}else{$(j[i]).addClass("slide-previous").removeClass("slide-active").css("left","auto").animate({left:"100%"},"normal",function(){$(this).css("left","auto")});$(j[g]).addClass("slide-active").css("right","100%").animate({right:0},"normal")}$(f[i]).removeClass("slide-indicator-active");$(f[g]).addClass("slide-indicator-active")}function m(){i=g++;if(g>j.length-1){g=0;b++}e(true)}function d(){i=g--;if(g<0){g=j.length-1}e()}function l(){c=setInterval(function(){m()},k.options.duration)}function h(){$(".slide-next").click(function(){if(c){clearInterval(c)}m();l()});$(".slide-prev").click(function(){if(c){clearInterval(c)}d();l()})}k.oninit=function(){j=$(".slide");f=$(".slide-indicators li");h();l()};return k.pub}})(Kitify);