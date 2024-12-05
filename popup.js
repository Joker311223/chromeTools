document.getElementById('switchButton').addEventListener('click', () => {
  switchToBITab();
});

function switchToBITab() {
  chrome.tabs.query({}, (tabs) => {
    for (let tab of tabs) {
      if (tab.url && tab.url.includes('https://bi.sankuai.com/sql')) {
        chrome.tabs.update(tab.id, { active: true });
        break;
      }
    }
  });
}
