// ==UserScript==
// @author          An_dz
// @version         1.2
// @name            TrueTweetLink
// @description     Removes the Twitter tracking in tweet links
// @date            2016 July 11
// @include         https://*twitter.com/*
// @include         http://*twitter.com/*
// @run-at          document-start
// @grant           none
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueTweetLinks.user.js
// ==/UserScript==

(function TrueTweetLink(){
	document.addEventListener("DOMNodeInserted", function () {
		var links = document.querySelectorAll("a[data-expanded-url], a[data-expanded-path]");
		// change links
		links.forEach( function (link) {
			// Twitter adds a data- attribute, if it exists we do the changes
			if(link.hasAttribute("data-expanded-url")) {
				link.href = link.getAttribute("data-expanded-url");
			}
			// If using mobile.twitter pic.twitter has a different way
			if (link.hasAttribute("data-expanded-path")) {
				link.href = link.getAttribute("data-url");
			}
		});
	}, false);
}());
