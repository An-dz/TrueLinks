// ==UserScript==
// @author          An_dz
// @version         1.3
// @name            TrueTweetLink
// @description     Removes the Twitter tracking in tweet links
// @date            2016 August 16
// @include         https://*twitter.com/*
// @include         http://*twitter.com/*
// @run-at          document-start
// @grant           none
// @downloadURL     https://github.com/An-dz/TrueLinks/raw/master/TrueTweetLinks.user.js
// ==/UserScript==

(function TrueTweetLink(){
	function makeTrueLinks(element) {
		var links = element.querySelectorAll("a[data-expanded-url], a[data-expanded-path], a[href^='https://t.co'][title^='http']");
		// change links
		links.forEach( function (link) {
			// Twitter adds a data- attribute, if it exists we do the changes
			if(link.hasAttribute("data-expanded-url")) {
				link.href = link.getAttribute("data-expanded-url");
			}
			// If using mobile.twitter pic.twitter has a different way
			else if (link.hasAttribute("data-expanded-path")) {
				link.href = link.getAttribute("data-url");
			}
			// if the above attributes do not exist sometimes we can get from the title
			else if (link.hasAttribute("title")) {
				link.href = link.getAttribute("title");
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
