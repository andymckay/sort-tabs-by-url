function sortTabs(a, b) {
  return (a.url.split('//')[1] || a.url) > (b.url.split('//')[1] || b.url);
}

function sort() {
  browser.browserAction.setBadgeText({text: '...'});
  let pinned_length = 0;
  browser.tabs.query(
    {pinned: true, currentWindow: true}
  ).then((pinned) => {
    pinned_length = pinned.length;
    return browser.tabs.query(
      {pinned: false, currentWindow: true}
    )
  }).then((tabs) => {
    tabs.sort(sortTabs);
    return browser.tabs.move(
      tabs.map(function(i) { return i.id;}),
      {index: pinned_length}
    )
  }).then(() => {
    browser.browserAction.setBadgeText({text: ''});
  });
}

browser.browserAction.onClicked.addListener(function(aTab) {
  sort();
});

browser.commands.onCommand.addListener(function(command) {
  sort();
});
