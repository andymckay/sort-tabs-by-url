var {Hotkey} = require("sdk/hotkeys");

var showHotKey = Hotkey({
  combo: "accel-shift-o",
  onPress: function() {
    listTabs();
  }
});

var menuitem = require("menuitems").Menuitem({
  id: "sort-tabs-by-url",
  menuid: "menu_ToolsPopup",
  label: "Sort tabs by URL",
  onCommand: function() {
      listTabs();
  },
  insertafter: "menu_pageInfo"
});

function sortTabs(a, b) {
  return (a.url.split('//')[1] || a.url) > (b.url.split('//')[1] || b.url);
}

function listTabs() {
  var tabs = require("sdk/tabs");
  var t = [], p = 0;
  for each (var tab in tabs) {
    if (tab.isPinned) {
        p++;
    } else {
        t.push(tab);
    }
  }
  t.sort(sortTabs);
  for (var i = 0; i < t.length; i++) {
    t[i].index = i + p;
  }
}
