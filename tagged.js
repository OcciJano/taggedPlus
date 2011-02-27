/* tagged.js © 2011 Alex de Moure */

if (window.top === window && window.location.host === 'www.tagged.com') {

	var setting;
	var thePath = window.location.pathname;

	var clickOn = function() {
		var value;
		var pref = event.target.id;
		var baseImg = safari.extension.baseURI + 'images/';

		function turnOff(pref) { $("img#"+pref+'vis').attr('src', baseImg + 'off.png'); }
		function turnOn(pref) { $("img#"+pref+'vis').attr('src', baseImg + 'on.png'); }
		function turnSkin(pref) {
			var theSkins = ['dont','dflt','blue','marb','meta','wood'];
			var s;
			for (s = 0; s < theSkins.length; s++) { $("img#"+ theSkins[s] +'vis').attr('src', baseImg + 'off.png');}
			$("img#"+pref+'vis').attr('src', baseImg + 'on.png');
		}//$("#"+pref) 'src', baseImg + pref + '0.png'

		switch (pref) {
			case "navi": value = setting.navi; break;
			case "brow": value = setting.brow; break;
			case "foot": value = setting.foot; break;
			case "keys": value = setting.keys; break;
			case "skin": value = setting.skin; break;
			case "comt": value = setting.comt; break;
			case "tag_": value = setting.tag_; break;
			case "vide": value = setting.vide; break;
			case "ques": value = setting.ques; break;
			case "gift": value = setting.gift; break;
			case "phot": value = setting.phot; break;
			case "grou": value = setting.grou; break;
			case "jour": value = setting.jour; break;
			case "news": value = setting.news; break;
			case "lwal": value = setting.lwal; break;
			case "rwal": value = setting.rwal; break;
			default: break;
		}

		if (value === true) { turnOff(pref); }
		else if (value === false) { turnOn(pref); }
		else { turnSkin(pref); }
		safari.self.tab.dispatchMessage("setSetting", pref);
	};

	var key = function(theKey) {
		if (theKey.target.nodeName === 'BODY' && $('body.masked')[0] === undefined) {
			if (theKey.keyCode === 37) {
				if (thePath === '/photo_view.html') {$('#prev_photo').click();}
				else {$('#browse_bar_left').click();}
			} else if (theKey.keyCode === 39) {
				if (thePath === '/photo_view.html') {$('#next_photo').click();}
				else {$('#browse_bar_right').click();}
			}
		}
	};//id="preview_photos_mask"

	var handleMessage = function(event) {

		setting = event.message;

		if (setting.navi === true) {
			$('#ad_unit_0_div').hide();
			$('#ad_unit_1_div').hide();
			$('#ad_unit_2_div').hide();
			$('#topad').hide();
			$('#inner_container').addClass('menu');
			$('#navheader').addClass('fix');
			if (thePath === '/home.html') {
				if ($('#column1')[0] === undefined) {$('div.column1').wrapInner('<div id="column1" class="column1" />');}
				if ($('#column3')[0] === undefined) {$('div.column3').wrapInner('<div id="column3" class="column3" />');}
				$('.column2').addClass('gray');
				$('#column1').addClass('fix');
				$('#column3').addClass('fix');
			}
		} else {
			$('#ad_unit_0_div').show();
			$('#ad_unit_1_div').show();
			$('#ad_unit_2_div').show();
			$('#topad').show();
			$('#navheader').removeClass('fix');
			$('#inner_container').removeClass('menu');
			if (thePath === '/home.html') {
				$('.column2').removeClass('gray');
				$('#column1').removeClass('fix');
				$('#column3').removeClass('fix');
			}
		} // generar updt
		if ($('#browse_bar')[0] !== null) {
			var bar = $('#browse_bar_hc')[0];
			if (setting.brow === true) {
				$('#browse_bar_hc').removeClass('menuOn menuOff').addClass('fix');
				$(bar).mouseenter(function() {$(bar).css('bottom','-2px');}).mouseleave(function() {$(bar).css('bottom','-46px');});
				$('#browse_bar_actions').css('display','none');
				$('#browse_bar_title').css('display','none');
			} else {
				$('#browse_bar_hc').removeClass('fix');
				if (setting.navi === true) {
					$('#browse_bar_hc').removeClass('menuOff').addClass('menuOn');
				} else {
					$('#browse_bar_hc').removeClass('menuOn').addClass('menuOff');
				}
				$(bar).mouseenter(function() {$(bar).css('top', '65px');}).mouseleave(function() {$(bar).css('top', '26px');});
				$('#browse_bar_actions').css('display','block').css('margin-right','10px');
				$('#browse_bar_title').css('display','block');
			}
		} // setting.Brow generar updt
		if (thePath === '/home.html') {
			if (setting.foot === true) {
				$('#page_content').css('paddingBottom', '0px');
				$('#footer').removeClass('fix').addClass('bottom');
			} else {
				$('#page_content').css('paddingBottom', '35px');
				$('#footer').removeClass('bottom').addClass('fix');
			}
		} // setting.Foot
		if (setting.keys === true) {$(document).keydown(function(theKey) {key(theKey);});}
		if (setting.setd === true && $('#prefs')[0] === undefined) {
			$('body').append('<div id="prefs"></div>');
			$('#prefs').mouseenter(function(){$('#prefs').css('left','-1px');}).mouseleave(function(){$('#prefs').css('left','-20px');});
			$('#prefs').css('left', '-20px');
			var p;
			var thePrefs = ['navi','brow','foot','keys','dont','dflt','blue','marb','meta',
							'wood','comt','tag_','vide','ques','gift','phot','grou','jour',
							'news','lwal','rwal'];
			var theTitle = ['Navigation Bar','Browse Dock','Home Footer','Arrow Keys',
							'Don’t substitute','Every as Default','Every as Blue',
							'Every as Marble','Every as Metal','Every as Wood',
							'Comments Box','Tags Box','Videos Box','Questions Box',
							'Gift Box','Photos Box','Groups Box','Journals Box',
							'What’s New Box','Left Wall Box','Right Wall Box'];
			var src = ' src="' + safari.extension.baseURI + 'images/';
			for (p = 0; p < thePrefs.length; p++) {
				var pref = thePrefs[p];
				var visible;
				if (setting[pref] === true) {visible = 'on.png';} else if (setting[pref] === false) {visible = 'off.png';}
				else if (pref === setting.skin) {visible = 'on.png';} else {visible = 'off.png';}
				$('#prefs').append('<img id="' +pref+ '"' +src+pref+ '.png" title="' +theTitle[p]+ '" class="miniIcon"><img id="' +pref+ 'vis"' +src+visible+ '" class="onOff">');
				$('img#'+pref).click( function() {clickOn();} );
			}
			$('#dont').before('<img id="dash"' + src +'dashes.png">');
			$('#comt').before('<img id="dash"' + src +'dashes.png">');
		}
		if (thePath === "/profile.html" && document.URL.indexOf("mini") < 1) {
			if (setting.comt === true) {$("#comments").show();} else {$("#comments").hide();}
			if (setting.tag_ === true) {$("#tags").show();} else {$("#tags").hide();}
			if (setting.vide === true) {$("#videos").show();} else {$("#videos").hide();}
			if (setting.ques === true) {$("#questions").show();} else {$("#questions").hide();}
			if (setting.gift === true) {$("#gifts").show();} else {$("#gifts").hide();}
			if (setting.phot === true) {$("#photos").show();} else {$("#photos").hide();}
			if (setting.grou === true) {$("#groups").show();} else {$("#groups").hide();}
			if (setting.jour === true) {$("#journals").show();} else {$("#journals").hide();}
			if (setting.news === true) {$("#whatsnew").show();} else {$("#whatsnew").hide();}
			if (setting.lwal === true) {$("#custom_1").show();} else {$("#custom_1").hide();}
			if (setting.rwal === true) {$("#custom_2").show();} else {$("#custom_2").hide();}
			$('#page_content').Heigh(0);
		} // setting.boxes
	}; // fin handleMessage

	if (thePath === '/profile.html') {
		var used = $(window).height() - 6 - $('#navheader').innerHeight() - $('#footer').innerHeight();//$('#profile_banner').innerHeight() -
		$('#page_content').css('minHeight', used + 'px !important');
	} // fix view height

	safari.self.addEventListener('message', handleMessage, false);
	safari.self.tab.dispatchMessage('getSettings', null);
}