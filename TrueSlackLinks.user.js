// ==UserScript==
// @author          An_dz
// @version         2.1
// @name            TrueSlackLink
// @description     Remove the Slack tracking in links
// @date            2019 March 15
// @include         https://*.slack.com/*
// @run-at          document-start
// @grant           none
// @license         MIT
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueSlackLinks.user.js
// ==/UserScript==

(function TrueSlackLink() {
	// mutation observer is asynchronous, the link will load unchanged for a fraction of miliseconds but this should make the page more responsive
	const observer = new MutationObserver((changes) => {
		changes.forEach((chg) => {
			chg.addedNodes.forEach((element) => {
				// if the added node is not an element, e.g. Text Node
				if (!element.querySelectorAll) {
					return;
				}

				const links = element.querySelectorAll("a[target='_blank'][class='']:not([data-fixed])");

				links.forEach((link) => {
					const newLink = link.cloneNode(true);
					newLink.dataset.fixed = true;
					newLink.href = decodeURIComponent(newLink.href.replace("https://slack-redir.net/link?url=", ""));
					link.parentNode.replaceChild(newLink, link);
				});
			});
		});
	});

	// starts the mutation observer
	observer.observe(document, {childList: true, subtree: true});
}());
