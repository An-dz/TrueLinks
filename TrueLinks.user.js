// ==UserScript==
// @author          An_dz
// @version         1.0
// @name            TrueLink
// @description     Removes basic tracking strategies on links
// @date            2018 July 18
// @include         *
// @run-at          document-start
// @grant           none
// @license         MIT
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueLinks.user.js
// ==/UserScript==

(function TrueTweetLink(){
	function makeTrueLinks(element) {
		var links = element.querySelectorAll("a[href*='%3A%2F%2F']");
		// change links
		links.forEach( function (link) {
			var match = link.href.match(/https?%3A%2F%2F[^&/]*/);
			if (!!match) {
				console.log(match);
				link.href = unescape(match[0]);
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
