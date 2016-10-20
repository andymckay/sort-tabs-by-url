function sortTabs(a, b) {
  return (a.url.split('//')[1] || a.url) > (b.url.split('//')[1] || b.url);
}

function sort() {
  chrome.tabs.query({pinned: true, currentWindow: true},
    function(pinned) {
      chrome.tabs.query({pinned: false, currentWindow: true},
        function(tabs) {
          tabs.sort(sortTabs);
          chrome.tabs.move(
            tabs.map(function(i) { return i.id;}),
            {index: pinned.length}
          );
        }
      );
    }
  );
}

chrome.browserAction.onClicked.addListener(function(aTab) {
  sort();
});

chrome.commands.onCommand.addListener(function(command) {
  sort();
});
