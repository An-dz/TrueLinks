// ==UserScript==
// @author			An_dz
// @version			1.2.1
// @name			TrueFacebookLink
// @description		Remove the Facebook tracking in links
// @date			2016 August 16
// @include			https://*.facebook.com/*
// @include			http://*.facebook.com/*
// @run-at			document-start
// @grant			none
// @downloadURL		https://github.com/An-dz/TrueLinks/raw/master/TrueFacebookLinks.user.js
// ==/UserScript==

var ttl = function TrueFacebookLink(){
	document.addEventListener('DOMNodeInserted', makeTrueLinks, false);

	function makeTrueLinks(event) {
		var links = document.getElementsByTagName('a');
		// change links
		for (var i = links.length - 1; i >= 0; i--) {
			// Facebook either has JS attributes attached to the element or event attached to it, we check it to perform the fastest solution
			// If attributes just delete them
			if (links[i].hasAttribute("onmousedown")) {
				links[i].removeAttribute('onmousedown');

				// Remove facebook redirection.
				var facebookRedirectString = "http://www.facebook.com/l.php?u=";
				var realHref = unescape(links[i].href.replace(facebookRedirectString,""));

				// set the href tag to the original URL as it should be.
				links[i].href = realHref;
			}
			else if (links[i].hasAttribute("onclick")) {
				// Extract real url from facebook's sneaky mouseover event handler.
				var refPattern = /LinkshimAsyncLink.swap\(this\, \"(.*)\".*/;
				if (links[i].hasAttribute("onmouseover")) {
					var realHref = unescape(refPattern.exec(links[i].getAttribute("onmouseover"))[1]);
					realHref = realHref.replace(/\\\//g,"/");
					// For some reason, the % sign gets escaped into unicode like so: \u0025
					// Manually unescaping the url below.
					realHref = realHref.replace(/\\u0025([0-9a-fA-F]{2})/g,"%$1");
					// set the href tag to the original URL as it should be.
					links[i].href = realHref;

					links[i].removeAttribute("onclick");
					links[i].removeAttribute("onmouseover");
				}
			}
			else if (links[i].href.search("http://l.facebook") == 0) {
				// Remove facebook redirection.
				var facebookRedirectString = "http://l.facebook.com/l.php?u=";
				var realHref = unescape(links[i].href.replace(facebookRedirectString,""));

				// set the href tag to the original URL as it should be.
				links[i].href = realHref;
			}
		}
	}
}();