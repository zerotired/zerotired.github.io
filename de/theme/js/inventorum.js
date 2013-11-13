var userLanguage = window.navigator.userLanguage || window.navigator.language;
function redirectUserWithLanguage(lang) {
	var path = window.location.pathname;
	if(path.substr(0, 3)=='/de' || path.substr(0, 3)=='/en') {
		path = path.substr(3);
	}
	
	if(lang == 'en') {
		lang = '';
	} else {
		lang = '/'+lang;
	}
	window.location.href = window.location.origin + lang + path;	
}
$(document).ready(function() {
	if(!window.localStorage.getItem('selectedLanguage')) {
		var path = window.location.pathname;
		if(userLanguage.substr(0, 2) == 'de' && path.substr(path.length-3, path.length-2)!='de') {
			redirectUserWithLanguage('de');	
		}
	}
	// Home slider
	$("#slider").echoSlider({
		effect: "slide", // Default effect to use, supports: "slide" or "fade"
		easing: true, // Easing effect for animations
		pauseTime: 4000, // How long each slide will appear
		animSpeed: 500, // Speed of slide animation 
		manualAdvance: false, // Force manual transitions
		pauseOnHover: true, // Pause on mouse hover
		controlNav: true, // Show slider navigation
		swipeNav: true // Enable touch gestures to control slider
	});
	
	// Drop down menus
	$("header nav ul li").hover(function() {
		if($(this).find("ul").size != 0) {
			$(this).find("ul:first").stop(true, true).fadeIn("fast");
		}
	}, function() {
		$(this).find("ul:first").stop(true, true).fadeOut("fast");
	});
	
	$("header nav ul li").each(function() {
		$("ul li:last a", this).css({ 'border' : 'none' });
	});
	
	// Enable mobile drop down navigation
	$("header nav ul:first").mobileMenu();
	
	// Form hints	
	$("label").inFieldLabels({ fadeOpacity: 0.4 });

	/*
$("nav select").change(function() {
		if(this.options[this.selectedIndex].value != "#") {
			var page = this.options[this.selectedIndex].value.split("#")[1];
	 		FluidNav.goTo(page);
			$("html,body").animate({ scrollTop:$('#'+page).offset().top }, 700);
		}
	});
*/
		
	// Gallery hover
	$(".screenshot_grid div").each(function() {
		$("a", this).append('<span class="hover"></span>');
	});
	
	$(".screenshot_grid div").hover(function() {
		$("a", this).find(".hover").stop(true, true).fadeIn(400);
	}, function() {
		$("a", this).find(".hover").stop(true, true).fadeOut(400);
	});
	
	$("a.fancybox").fancybox({
		"transitionIn":			"elastic",
		"transitionOut":		"elastic",
		"easingIn":					"easeOutBack",
		"easingOut":				"easeInBack",
		"titlePosition":		"over",
		"padding":					0,
		"speedIn":      		500,
		"speedOut": 				500,
		"hideOnContentClick":	false,
		"overlayShow":        false
	});
		
	// Custom jQuery Tabs
	$(".tabs").find(".pane:first").show().end().find("ul.nav li:first").addClass("current");
	$(".tabs ul.nav li a").click(function() {
		var tab_container = $(this).parent().parent().parent();
		$(this).parent().parent().find("li").removeClass("current");
		$(this).parent().addClass("current");
		$(".pane", tab_container).hide();
		$("#"+$(this).attr("class")+".pane", tab_container).show();
	});	
		
	// Toggle lists
	$(".toggle_list ul li .title").click(function() {
		var content_container = $(this).parent().find(".content");
		if(content_container.is(":visible")) {
			var page_height = $(".page.current").height() - content_container.height();
/* 			FluidNav.resizePage(page_height, true); */
			content_container.slideUp();
			$(this).find("a.toggle_link").text($(this).find("a.toggle_link").data("open_text"));
		} else {
			var page_height = $(".page.current").height() + content_container.height() + 40;
/* 			FluidNav.resizePage(page_height, true); */
			content_container.slideDown();
			$(this).find("a.toggle_link").text($(this).find("a.toggle_link").data("close_text"));
		}
	});
	
	$(".toggle_list ul li .title").each(function() {
		$(this).find("a.toggle_link").text($(this).find("a.toggle_link").data("open_text"));
		if($(this).parent().hasClass("opened")) {
			$(this).parent().find(".content").show();
		}
	});
		
	// Tooltips
	$("a[rel=tipsy]").tipsy({fade: true, gravity: 's', offset: 5, html: true});
	
	$("ul.social li a").each(function() {
		if($(this).attr("title")) {
			var title_text = $(this).attr("title");
		} else {
			var title_text = $(this).text();
		}
		$(this).tipsy({
				fade: true, 
				gravity: 'n', 
				offset: 5,
				title: function() {
					return title_text;
				}
		});
	});
	
	// Contact form
	$("div#contact_form form").submit(function() {
  	var this_form = $(this);
  	$.ajax({
  		type: 'post',
  		data: this_form.serialize(),
  		url: 'send_email.php',
  		success: function(res) {
  			if(res == "true") {
  				this_form.fadeOut("fast");
					$(".success").fadeIn("fast");
/* 					FluidNav.resizePage('', true); */
  			} else {
  				$(".validation").fadeIn("fast");
/* 					FluidNav.resizePage('', true); */
  				this_form.find(".text").removeClass("error");
  				$.each(res.split(","), function() {
						if(this.length != 0) {
  						this_form.find("#"+this).addClass("error");
						}
  				});
  			}
  		}
  	});
  });
	
});