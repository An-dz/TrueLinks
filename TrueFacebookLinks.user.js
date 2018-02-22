// ==UserScript==
// @author          An_dz
// @version         1.7
// @name            TrueFacebookLink
// @description     Remove the Facebook tracking in links
// @date            2017 August 16
// @include         https://*.facebook.com/*
// @include         http://*.facebook.com/*
// @run-at          document-start
// @grant           none
// @license         MIT
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueFacebookLinks.user.js
// ==/UserScript==

(function TrueFacebookLink(){
	function changeLink(link) {
		var realHref;
		var facebookRedirectString;
		// Facebook either has JS attributes attached to the element or event attached to it, we check it to perform the fastest solution
		// If attributes just delete them
		if (link.hasAttribute("onmousedown")) {
			link.removeAttribute("onmousedown");

			// Remove facebook redirection.
			facebookRedirectString = /https?:\/\/www\.facebook\.com\/l\.php\?u=/;
			realHref = unescape(link.href.replace(facebookRedirectString, ""));

			// set the href tag to the original URL as it should be.
			link.href = realHref;
		}
		else if (link.hasAttribute("onclick")) {
			// Extract real url from facebook's sneaky mouseover event handler.
			var refPattern = /LinkshimAsyncLink.swap\(this,\s"(.*)".*/;
			if (link.hasAttribute("onmouseover")) {
				realHref = unescape(refPattern.exec(link.getAttribute("onmouseover"))[1]);
				realHref = realHref.replace(/\\\//g, "/");
				// For some reason, the % sign gets escaped into unicode like so: \u0025
				// Manually unescaping the url below.
				realHref = realHref.replace(/\\u0025([0-9a-fA-F]{2})/g, "%$1");
				// set the href tag to the original URL as it should be.
				link.href = realHref;

				link.removeAttribute("onclick");
				link.removeAttribute("onmouseover");
			}
		}
		else if (link.href.search(/:\/\/l\.facebook/) > 0) {
			// Remove facebook redirection.
			facebookRedirectString = /https?:\/\/l\.facebook\.com\/l\.php\?u=/;
			realHref = link.href.replace(facebookRedirectString, "");
			realHref = unescape(realHref.substring(0, realHref.search("&")));

			// set the href tag to the original URL as it should be.
			link.href = realHref;
		}
	}

	function makeTrueLinks(element) {
		// we limit to only check links that really have tracking
		var links = element.querySelectorAll("a[onmousedown], a[onclick], a[href^='https://l.facebook.com'], a[href^='http://l.facebook.com']");
		links.forEach(function (link) {
			changeLink(link);
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
