// ==UserScript==
// @author          An_dz
// @version         1.1
// @name            TrueSlackLink
// @description     Remove the Slack tracking in links
// @date            2017 August 16
// @include         https://*.slack.com/*
// @run-at          document-start
// @grant           none
// @license         MIT
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueSlackLinks.user.js
// ==/UserScript==

(function TrueSlackLink() {
	function makeTrueLinks(element) {
		var links = element.querySelectorAll("a[onmouseover], a[onclick]");
		links.forEach(function (link) {
			if (link.hasAttribute("onmouseover")) {
				link.removeAttribute("onmouseover");
			}
			if (link.hasAttribute("onclick")) {
				link.removeAttribute("onclick");
			}
		});
	}

	// mutation observer is asynchronous, the link will load unchanged for a fraction of miliseconds but this should make the page more responsive
	var observer = new MutationObserver(function (changes) {
		changes.forEach(function (chg) {
			chg.addedNodes.forEach(function (element) {
				if (element.parentElement !== null) {
					makeTrueLinks(element.parentElement);
				}
			});
		});
	});

	// starts the mutation observer
	observer.observe(document, {childList: true, subtree: true});
}());
