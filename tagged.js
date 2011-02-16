if (window.top === window && window.location.host == "www.tagged.com") {

	function teclas(evento) {
		if (evento.target.nodeName == "BODY") {
			if (evento.keyCode === 37) {
				if (window.location.pathname == "/photo_view.html") {window.location="javascript:tagged.photos.view.prevPhoto();"}
				else {window.location="javascript:tagged.header.browsebar.scrollLeft();"}
			}
			else if (evento.keyCode === 39) {
				if (window.location.pathname == "/photo_view.html") {window.location="javascript:tagged.photos.view.nextPhoto();"}
				else {window.location="javascript:tagged.header.browsebar.scrollRight();"}
			}
		}
	}

	var handleMessage = function(event) {
		var Setting = event.message;
		if (document.getElementById("browse_bar") === null) {} else {
			if (Setting.Brow == true) {
				$("#browse_bar_hc").removeClass('menuOn menuOff').addClass("flota");
				var Barra = document.getElementById("browse_bar_hc");
				Barra.setAttribute('onmouseover','document.getElementById("browse_bar_hc").style.bottom = "-2px"');
				Barra.setAttribute('onmouseout' ,'document.getElementById("browse_bar_hc").style.bottom = "-46px"');
				document.getElementById("browse_bar_actions").style.display = "none";
				document.getElementById("browse_bar_title").style.display = "none";
			} else {
				$("#browse_bar_hc").removeClass("flota");
				if (Setting.Navi == true) {
					$("#browse_bar_hc").removeClass("menuOff").addClass("menuOn");
				} else {
					$("#browse_bar_hc").removeClass("menuOn").addClass("menuOff");
				};
				var Barra = document.getElementById("browse_bar_hc");
				Barra.setAttribute('onmouseover','document.getElementById("browse_bar_hc").style.top = "65px"');
				Barra.setAttribute('onmouseout' ,'document.getElementById("browse_bar_hc").style.top = "26px"');
				document.getElementById("browse_bar_actions").style.display = "block";
				document.getElementById("browse_bar_title").style.display = "block";
			}
		}//Setting.Brow
		if (Setting.Navi == true) {
			$("#ad_unit_0_div").hide();
			$("#ad_unit_1_div").hide();
			$("#ad_unit_2_div").hide();
			$("#inner_container").addClass("menu");
			$("#navheader").addClass("flota");
			if (window.location.pathname == "/home.html") {
				if (document.getElementById("column1") == null) {$('div.column1').wrapInner('<div id="column1" class="column1" />')}
				if (document.getElementById("column3") == null) {$('div.column3').wrapInner('<div id="column3" class="column3" />')}
				$("#column1").addClass("fija");
				$("#column3").addClass("fija");
			}
		} else {
			$("#ad_unit_0_div").show();
			$("#ad_unit_1_div").show();
			$("#ad_unit_2_div").show();
			$("#navheader").removeClass("flota");
			$("#inner_container").removeClass("menu");
			if (window.location.pathname == "/home.html") {
				$("#column1").removeClass("fija");
				$("#column3").removeClass("fija");
			}
		}
		if (window.location.pathname == "/home.html") {
			if (Setting.Foot == true) {
				document.getElementById("page_content").style.paddingBottom = "0px";
				$("#footer").removeClass("fijo").addClass("fondo");
			} else {
				document.getElementById("page_content").style.paddingBottom = "35px";
				$("#footer").removeClass("fondo").addClass("fijo");
			}
		}//Setting.Foot
		if (Setting.Keys == true) {
			$(function() {
				$(document).keydown(function(evento) { teclas(evento) })
			})
		}
	}; // fin handleMessage

	if (window.location.pathname == "/profile.html") {//Setting.Skin != "" &&
		eli = $(document).height() - 6 - $('#navheader').innerHeight() - $('#profile_banner').innerHeight() - $('#footer').innerHeight();
		document.getElementById("page_content").style.minHeight = eli + "px !important;";
	}

	safari.self.addEventListener("message", handleMessage, false);
	safari.self.tab.dispatchMessage("getSettings", null);
}