// ==UserScript==
// @author			An_dz
// @version			1.1
// @name			TrueTweetLink
// @description		Removes the Twitter tracking in tweet links
// @date			2016 September 15
// @include			https://*twitter.com/*
// @include			http://*twitter.com/*
// @run-at			document-start
// @grant			none
// @downloadURL		https://github.com/An-dz/TrueLinks/raw/master/TrueTweetLinks.user.js
// ==/UserScript==

(function TrueTweetLink(){
	document.addEventListener('DOMNodeInserted', makeTrueLinks, false);

	function makeTrueLinks(event) {
		var links = document.getElementsByTagName('a');
		// change links
		for (var i = links.length - 1; i >= 0; i--) {
			// Twitter adds a data- attribute, if it exists we do the changes
			if(links[i].hasAttribute('data-expanded-url')) {
				links[i].href = links[i].getAttribute('data-expanded-url');
			}
			// If using mobile.twitter pic.twitter has a different way
			if (links[i].hasAttribute('data-expanded-path')) {
				links[i].href = links[i].getAttribute('data-url');
			}
		}
	}
})();
