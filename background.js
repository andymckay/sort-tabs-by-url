function getKey(s) {
  return (s.split('//')[1] || s).split('.').slice(-2).join('.')
}

function sortTabs(a, b) {
  return (getKey(a.url)) > (getKey(b.url));
}

function sortTabsInverted(a, b) {
  return sortTabs(b, a);
}

function sort(aToZ) {
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
    if (aToZ) {
      tabs.sort(sortTabs);
    } else {
      tabs.sort(sortTabsInverted);
    }
    return browser.tabs.move(
      tabs.map(function(i) { return i.id;}),
      {index: pinned_length}
    )
  }).then(() => {
    browser.browserAction.setBadgeText({text: ''});
  });
}

browser.browserAction.onClicked.addListener(function(aTab) {
  sort(true);
});

browser.commands.onCommand.addListener(function(command) {
  sort(true);
});

browser.menus.onClicked.addListener(function(menu) {
  if (menu.menuItemId === "sort-tabs-inverted") {
    sort(false);
  } else {
    sort(true);
  }
});

browser.menus.create({
  id: "sort-tabs",
  title: "A-Z",
  contexts: ["tools_menu", "browser_action"],
  icons: {
   16: "icon-16-context-menu.png",
  },
});

browser.menus.create({
  id: "sort-tabs-inverted",
  title: "Z-A",
  contexts: ["tools_menu", "browser_action"],
  icons: {
   16: "icon-16-context-menu-inverted.png",
  },
});
