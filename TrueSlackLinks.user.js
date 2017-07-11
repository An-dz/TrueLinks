// ==UserScript==
// @author          An_dz
// @version         1.0
// @name            TrueSlackLink
// @description     Remove the Slack tracking in links
// @date            2017 July 11
// @include         https://*.slack.com/*
// @run-at          document-start
// @grant           none
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueSlackLinks.user.js
// ==/UserScript==

(function TrueSlackLink() {
	document.addEventListener("DOMNodeInserted", function () {
		var links = document.querySelectorAll("a[onmouseover], a[onclick]");
		links.forEach(function (link) {
			if (link.hasAttribute("onmouseover")) {
				link.removeAttribute("onmouseover");
			}
			if (link.hasAttribute("onclick")) {
				link.removeAttribute("onclick");
			}
		});
	}, false);
}());
