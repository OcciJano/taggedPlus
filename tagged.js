/* tagged.js © 2011 Alex de Moure */

if (window.top == window && window.location.host == "www.tagged.com") {

	function key(theKey) {
		if (theKey.target.nodeName == "BODY") {
			var thePath = window.location.pathname;
			if (theKey.keyCode === 37) {
				if (thePath == "/photo_view.html") {$('#prev_photo').click()}
				else {$('#browse_bar_left').click()}
			} else if (theKey.keyCode === 39) {
				if (thePath == "/photo_view.html") {$('#next_photo').click()}
				else {$('#browse_bar_right').click()}
			}
		}
	}

	var handleMessage = function(event) {
		var Setting = event.message;
		var thePath = window.location.pathname;
		if (Setting.Navi == true) {
			$("#ad_unit_0_div").hide();
			$("#ad_unit_1_div").hide();
			$("#ad_unit_2_div").hide();
			$("#topad").hide();
			$("#inner_container").addClass("menu");
			$("#navheader").addClass("flota");
			if (thePath == "/home.html") {
				if (document.getElementById("column1") == null) {$('div.column1').wrapInner('<div id="column1" class="column1" />')}
				if (document.getElementById("column3") == null) {$('div.column3').wrapInner('<div id="column3" class="column3" />')}
				$(".column2").addClass("gris");
				$("#column1").addClass("fija");
				$("#column3").addClass("fija")
			}
		} else {
			$("#ad_unit_0_div").show();
			$("#ad_unit_1_div").show();
			$("#ad_unit_2_div").show();
			$("#topad").show();
			$("#navheader").removeClass("flota");
			$("#inner_container").removeClass("menu");
			if (thePath == "/home.html") {
				$(".column2").removeClass("gris");
				$("#column1").removeClass("fija");
				$("#column3").removeClass("fija")
			}
		}//generar updt
		if (document.getElementById("browse_bar") == null) {
		} else {
			var Barra = document.getElementById("browse_bar_hc");
			if (Setting.Brow == true) {
				$("#browse_bar_hc").removeClass('menuOn menuOff').addClass("flota");
				Barra.setAttribute('onmouseover','document.getElementById("browse_bar_hc").style.bottom = "-2px"');
				Barra.setAttribute('onmouseout' ,'document.getElementById("browse_bar_hc").style.bottom = "-46px"');
				document.getElementById("browse_bar_actions").style.display = "none";
				document.getElementById("browse_bar_title").style.display = "none"
			} else {
				$("#browse_bar_hc").removeClass("flota");
				if (Setting.Navi == true) {
					$("#browse_bar_hc").removeClass("menuOff").addClass("menuOn")
				} else {
					$("#browse_bar_hc").removeClass("menuOn").addClass("menuOff")
				};
				Barra.setAttribute('onmouseover','document.getElementById("browse_bar_hc").style.top = "65px"');
				Barra.setAttribute('onmouseout' ,'document.getElementById("browse_bar_hc").style.top = "26px"');
				document.getElementById("browse_bar_actions").style.display = "block";
				document.getElementById("browse_bar_title").style.display = "block"
			}
		}//Setting.Brow generar updt
		if (thePath == "/home.html") {
			if (Setting.Foot == true) {
				document.getElementById("page_content").style.paddingBottom = "0px";
				$("#footer").removeClass("fijo").addClass("fondo")
			} else {
				document.getElementById("page_content").style.paddingBottom = "35px";
				$("#footer").removeClass("fondo").addClass("fijo")
			}
		}//Setting.Foot
		if (Setting.Keys == true) {
			$(document).keydown(function(theKey) { key(theKey) })
		}
		if (document.location.pathname == "/profile.html") {//Setting.Skin
			eli = $(document).height() - 6 - $('#navheader').innerHeight() - $('#profile_banner').innerHeight() - $('#footer').innerHeight();
			document.getElementById("page_content").style.minHeight = eli + "px !important;"
		}
	}; // fin handleMessage

	safari.self.addEventListener("message", handleMessage, false);
	safari.self.tab.dispatchMessage("getSettings", null);
}