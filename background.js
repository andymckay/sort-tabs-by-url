'use strict';
/*global chrome:false */

function sortTabs(a, b) {
  return (a.url.split('//')[1] || a.url) > (b.url.split('//')[1] || b.url);
}

chrome.browserAction.onClicked.addListener(function(aTab) {
  chrome.tabs.query(
    {
      windowId: chrome.windows.WINDOW_ID_CURRENT,
      pinned: false,
    },
    function(tabs){
      tabs.sort(sortTabs);
      chrome.tabs.move(tabs.map(function(i) { return i.id}, 1), {index: 1});
    }
  )
});
