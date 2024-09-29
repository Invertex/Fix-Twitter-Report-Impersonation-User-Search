// ==UserScript==
// @name         Fix Twitter Impersonation User Search
// @namespace    Invertex
// @version      0.1
// @description  Fixes Twitter user search so even a "unsearchable" user will show up if their name is put in correctly
// @author       Invertex
// @updateURL    https://github.com/Invertex/Fix-Twitter-Report-Impersonation-User-Search/raw/main/fix_twitter_impersonation_search.user.js
// @downloadURL  https://github.com/Invertex/Fix-Twitter-Report-Impersonation-User-Search/raw/main/fix_twitter_impersonation_search.user.js
// @match        https://twitter.com/*
// @match        https://*.twitter.com/*
// @match        https://x.com/*
// @match        https://*.x.com/*
// @icon         https://i.imgur.com/M9oO8K9.png
// @noframes
// @grant unsafeWindow
// @run-at document-start
// ==/UserScript==

//Intercept the request for user search results so we can modify the search parameters.
// The "report user" feature uses 'ocf_typeahead_search' which for some reason excludes certain types of users. So by replacing with the generic "search_box" option, we get the unfiltered list.
var openOpen = unsafeWindow.XMLHttpRequest.prototype.open;
unsafeWindow.XMLHttpRequest.prototype.open = exportFunction(function(method, url)
{
    url = url.replace('ocf_typeahead_search', 'search_box');
    openOpen.call(this, method, url);
}, unsafeWindow);
