// ==UserScript==
// @author          An_dz
// @version         1.0
// @name            TrueDisqusLink
// @description     Removes the disqus tracking in links
// @date            2017 July 11
// @include         https://*disqus.com/*
// @run-at          document-start
// @grant           none
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueDisqusLinks.user.js
// ==/UserScript==

(function TrueDisqusLink(){
	document.addEventListener("DOMNodeInserted", function () {
		var links = document.querySelectorAll("a[href^='https://disq.us/url'], a[href^='http://disq.us/url']");
		// change links
		links.forEach(function (link) {
			// Disqus links contain the original link escaped
			link.href = unescape(link.href.replace(/https?:\/\/disq.us\/url\?url=([^&]+)%3A[^%].*/,"$1"));
		});
	}, false);
}());
