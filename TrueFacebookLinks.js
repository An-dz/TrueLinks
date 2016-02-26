// ==UserScript==
// @author			An_dz
// @version			1.0
// @name			TrueFacebookLink
// @description		Removes the Facebook tracking in links
// @date			2016 February 11
// @include			https://*facebook.com/*
// @include			http://*facebook.com/*
// @run-at			document-start
// @grant			none
// ==/UserScript==

var ttl = function TrueFacebookLink(){
	document.addEventListener('DOMNodeInserted', makeTrueLinks, false);

	function makeTrueLinks(event) {
		var links = document.getElementsByTagName('a'),
			realURL,
			pattern;
		// change links
		for (var i = links.length - 1; i >= 0; i--) {
			if (links[i].hasAttribute("onmousedown")) {
				links[i].removeAttribute('onmousedown');

				// Remove redirection and unescape
				pattern = "http://www.facebook.com/l.php?u=";
				realURL = unescape(links[i].href.replace(pattern,""));
				
				// change the url to the real url
				links[i].href = realURL;
			}
			if (links[i].hasAttribute("onclick")) {
				// Extract real url from facebook's sneaky mouseover event handler
				pattern = /LinkshimAsyncLink.swap\(this\, \"(.*)\"\);/;
				realURL = unescape(pattern.exec(links[i].getAttribute("onmouseover"))[1]);
				realURL = realURL.replace(/\\\//g,"/");
				// For some reason, the % sign gets escaped into unicode like so: \u0025
				// Manually unescaping the url below.
				realURL = realURL.replace(/\\u0025([0-9a-fA-F]{2})/g,"%$1");

				// change the url to the real url
				links[i].href = realURL;

				links[i].removeAttribute("onclick");
				links[i].removeAttribute("onmouseover");
			}
		}
	}
}();