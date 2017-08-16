// ==UserScript==
// @author          An_dz
// @version         1.1
// @name            TrueDisqusLink
// @description     Removes the disqus tracking in links
// @date            2017 August 16
// @include         https://*disqus.com/*
// @run-at          document-start
// @grant           none
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueDisqusLinks.user.js
// ==/UserScript==

(function TrueDisqusLink(){
	function makeTrueLinks(element) {
		var links = element.querySelectorAll("a[href^='https://disq.us/url'], a[href^='http://disq.us/url']");
		// change links
		links.forEach(function (link) {
			// Disqus links contain the original link escaped
			link.href = unescape(link.href.replace(/https?:\/\/disq.us\/url\?url=([^&]+)%3A[^%].*/,"$1"));
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
