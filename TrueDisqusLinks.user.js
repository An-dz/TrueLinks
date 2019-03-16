// ==UserScript==
// @author          An_dz
// @version         1.2
// @name            TrueDisqusLink
// @description     Removes the disqus tracking in links
// @date            2019 March 15
// @include         https://*disqus.com/*
// @run-at          document-start
// @grant           none
// @license         MIT
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueDisqusLinks.user.js
// ==/UserScript==

(function TrueDisqusLink(){
	// mutation observer is asynchronous, the link will load unchanged for a fraction of miliseconds but this should make the page more responsive
	const observer = new MutationObserver((changes) => {
		changes.forEach((chg) => {
			chg.addedNodes.forEach((element) => {
				if (!element.querySelectorAll) {
					return;
				}

				const links = element.querySelectorAll("a[href^='https://disq.us/url'], a[href^='http://disq.us/url']");
				// change links
				links.forEach((link) => {
					// Disqus links contain the original link escaped
					link.href = link.title;
				});
			});
		});
	});

	// starts the mutation observer
	observer.observe(document, {childList: true, subtree: true});
}());
