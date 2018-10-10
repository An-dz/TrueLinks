// ==UserScript==
// @author          An_dz
// @version         1.1
// @name            TrueLink
// @description     Removes basic tracking strategies on links
// @date            2018 October 1
// @include         *
// @run-at          document-start
// @grant           none
// @license         MIT
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueLinks.user.js
// ==/UserScript==

(function TrueTweetLink(){
	function makeTrueLinks(element) {
		// only http is checked, other protocols are allowed
		var links = element.querySelectorAll("a[href^='http'][href*='%3A%2F%2F']");
		// change links
		links.forEach(function (link) {
			var match = link.href.match(/https?%3A%2F%2F[^&/]*/);
			if (!!match && !(link.href.indexOf("login") < link.href.indexOf("%3A%2F%2F"))) {
				console.log("TrueLink", match);
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
