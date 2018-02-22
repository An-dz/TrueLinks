// ==UserScript==
// @author          An_dz
// @version         1.2
// @name            TrueSlackLink
// @description     Remove the Slack tracking in links
// @date            2018 February 22
// @include         https://*.slack.com/*
// @run-at          document-start
// @grant           none
// @license         MIT
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueSlackLinks.user.js
// ==/UserScript==

(function TrueSlackLink() {
	function makeTrueLinks(element) {
		var links = element.querySelectorAll("a[role='link']");
		links.forEach(function (link) {
			var url = link.href.replace("https://slack-redir.net/link?url=", "");

			if (link.href.length === url.length) {
				return;
			}

			link.href = unescape(url);
			var newLink = link.cloneNode(true);
			link.parentNode.replaceChild(newLink, link);
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
