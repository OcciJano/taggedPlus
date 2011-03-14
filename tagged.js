/* tagged.js © 2011 Alex de Moure */

if (window.top === window && window.location.host === 'www.tagged.com' && window.location.pathname !== '/index.html') {

	var thePath = window.location.pathname;
	var timer, setting;
	var playPause = false;
	const baseImg = safari.extension.baseURI + 'images/';

	var clickOn = function() {
		var value;
		var pref = event.target.id;

		function turnOn(pref) { $("img#"+pref+'vis').attr('src', baseImg + 'on.png'); }
		function turnOff(pref) { $("img#"+pref+'vis').attr('src', baseImg + 'off.png'); }
		function turnSkin(pref) {
			const theSkins = ['dont','dflt','blue','marb','meta','wood'];
			var s;
			for (s = 0; s < theSkins.length; s++) {$('img#'+ theSkins[s]).css({'border':'3px solid transparent'});}
			$('img#'+pref).css({'border':'3px solid #019934'});
		}

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
			case "frie": value = setting.frie; break;
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

	var boton = function(which) { $(which).click( function() {clickOn();} ); };

	var key = function(theKey) {

		var photoShow = function() {
			$('#next_photo').click();
			timer = setTimeout(function() { photoShow(); }, 3600);
		};

		var profileShow = function() {
			$('#browse_bar_right').click();
			timer = setTimeout(function() { profileShow(); }, 4900);
		};

		var playPhotos = function() {
			if( playPause === true) {
				clearTimeout(timer);
				playPause = false;
			} else {
				playPause = true;
				photoShow();
			}
		};

		var playProfiles = function() {
			if( playPause === true) {
				clearTimeout(timer);
				playPause = false;
			} else {
				playPause = true;
				profileShow();
			}
		};

		if (theKey.target.nodeName === 'BODY' && $('body.masked')[0] === undefined) {
			switch (theKey.keyCode) {
				case 37:	//left
					if (thePath === '/photo_view.html') {$('#prev_photo').click();}
					else if (document.URL.indexOf("mini") > -1) {$('#browse_bar_left').click();}
					break;
				case 39:	//right
					if (thePath === '/photo_view.html') {$('#next_photo').click();}
					else if (document.URL.indexOf("mini") > -1) {$('#browse_bar_right').click();}
					break;
				case 27:	//esc
					clearTimeout(timer);
					playPause = false;
					break;
				case 32:	//space bar
					if (thePath === '/photo_view.html') { playPhotos(); }
					else if (document.URL.indexOf("mini") > -1) { playProfiles(); }
					else if (thePath === '/photo_gallery.html') {
						$(window.location.href='http://www.tagged.com/photo_view.html' + location.search + '#state=0_0').ready(playPhotos());
						playPhotos();
					} else { clearTimeout(timer); playPause = false; }
					break;
				default: break;
			}
		}
	};

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
				$('#newsfeed').addClass('gray');
				$('#column1').addClass('fix');
				$('#column3').addClass('fix');
//				$('.column1 fix').load('http://www.tagged.com/friends.html#tab=1&type=0&filterpg=Online_0 #online_now_friends_thumbs')
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
				$('#newsfeed').removeClass('gray');
				$('#column1').removeClass('fix');
				$('#column3').removeClass('fix');
			}
		}							// navi
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
		}								// brow
		if (thePath === '/home.html') {
			if (setting.foot === true) {
				$('#page_content').css('paddingBottom', '0px');
				$('#footer').removeClass('fix').addClass('bottom');
			} else {
				$('#page_content').css('paddingBottom', '35px');
				$('#footer').removeClass('bottom').addClass('fix');
			}
		}									// foot
		if (setting.keys === true) {
			$(document).keydown(function(theKey) {key(theKey);});
		}									// keys
		if (setting.sett === true && $('#prefs')[0] === undefined) {
			$('body').append('<div id="prefs"></div>');
			$('#prefs').mouseenter(function(){$('#prefs').css('left','0px');}).mouseleave(function(){$('#prefs').css('left','-28px');});
			$('#prefs').css('left', '-28px');
			var p;
			const names =  ['navi','brow','foot','keys'];
			const title =  ['Navigation Bar','Browse Dock','Home Footer','Arrow Keys'];
			var src = ' src="' + baseImg;
			for (p = 0; p < names.length; p++) {
				var pref = names[p];
				var show;
				if (setting[pref] === true) {show = 'on.png';} else if (setting[pref] === false) {show = 'off.png';}
				$('#prefs').append('<img id="' +pref+ 'vis"' +src+show+ '" class="onOff"><img id="' +pref+ '"' +src+pref+ '.png" title="' +title[p]+ '" class="miniIcon"><br />');
				boton('img#'+pref);
			}
		}	// sett
		if (setting.skns === true && $('#skins')[0] === undefined) {
			$('body').append('<div id="skins"></div>');
			$('#skins').mouseenter(function(){$('#skins').css('left','0px');}).mouseleave(function(){$('#skins').css('left','-140px');});
			$('#skins').css('left', '-140px');
			var p;
			const names =  ['dont','dflt','blue','marb','meta','wood'];
			const title =  ['Don’t substitute','Every as Default','Every as Blue',
							'Every as Marble','Every as Metal','Every as Wood'];
			var src = ' src="' + baseImg;
			for (p = 0; p < names.length; p++) {
				var pref = names[p];
				$('#skins').append('<img id="' +pref+ '"' +src+pref+ '.png" title="' +title[p]+ '" class="unSel">');
				if (pref === setting.skin) {
					$('img#'+pref).css({'border':'3px solid #019934'});
				} else {
					$('img#'+pref).css({'border':'3px solid transparent'});
				}
				boton('img#'+pref);
			}
		}	// skns
		if (setting.boxs === true && $('#boxes')[0] === undefined) {
			$('body').append('<div id="boxes"></div>');
			$('#boxes').mouseenter(function(){$('#boxes').css('left','0px');}).mouseleave(function(){$('#boxes').css('left','-28px');});
			$('#boxes').css('left', '-28px');
			var p;
			const names =  ['comt','tag_','vide','ques','gift','phot','frie','grou','jour','news','lwal','rwal'];
			const title =  ['Comments Box','Tags Box','Videos Box','Questions Box',
							'Gift Box','Photos Box','Friends Box','Groups Box','Journals Box',
							'What’s New Box','Left Wall Box','Right Wall Box'];
			var src = ' src="' + baseImg;
			for (p = 0; p < names.length; p++) {
				var pref = names[p];
				var show;
				if (setting[pref] === true) {show = 'on.png';} else if (setting[pref] === false) {show = 'off.png';}
				$('#boxes').append('<img id="' +pref+ 'vis"' +src+show+ '" class="onOff"><img id="' +pref+ '"' +src+pref+ '.png" title="' +title[p]+ '" class="miniIcon"><br />');
				boton('img#'+pref);
			}
		}	// boxs
		if (thePath === "/profile.html" && document.URL.indexOf("mini") < 1) {
			if (setting.comt === true) {
				if ($('#comments')[0] === undefined) {window.location.reload()}
			} else {
				$("#comments").empty().remove();
			}
			if (setting.tag_ === true) {$("#tags").show();} else {$("#tags").hide();}
			if (setting.vide === true) {
				if ($('#videos')[0] === undefined) {window.location.reload()}
			} else {
				$("#videos").empty().remove();
			}
			if (setting.ques === true) {$("#questions").show();} else {$("#questions").hide();}
			if (setting.gift === true) {$("#gifts").show();} else {$("#gifts").hide();}
			if (setting.phot === true) {$("#photos").show();} else {$("#photos").hide();}
			if (setting.frie === true) {$("#friends").show();} else {$("#friends").hide();}
			if (setting.grou === true) {$("#groups").show();} else {$("#groups").hide();}
			if (setting.jour === true) {$("#journals").show();} else {$("#journals").hide();}
			if (setting.news === true) {$("#whatsnew").show();} else {$("#whatsnew").hide();}
			if (setting.lwal === true) {
				if ($('#custom_1')[0] === undefined) {window.location.reload()}
			} else {
				$("#custom_1").empty().remove();
			}
			if (setting.rwal === true) {
				if ($('#custom_2')[0] === undefined) {window.location.reload()}
			} else {
				$("#custom_2").empty().remove();
			}
			$('#page_content').Height(0);
		} // boxes
	}; // handleMessage

	if (thePath === '/profile.html') {
		var used = $(window).height() - 6 - $('#navheader').innerHeight() - $('#footer').innerHeight();//$('#profile_banner').innerHeight() -
		$('#page_content').css('minHeight', used + 'px !important');
	}									// fix height

	safari.self.addEventListener('message', handleMessage, false);
	safari.self.tab.dispatchMessage('getSettings', null);
}