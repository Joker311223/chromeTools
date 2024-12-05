chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 如果跳链里面有跳转到魔术toStackMoshuSql的，直接跳转已经打开的魔术sql标签
  if (changeInfo.url && changeInfo.url.includes('toStackTab')) {
    switchToBITab(tabId, tab.url);
  }
});

function getPrefixPath(url) {
  const urlObj = new URL(url);
  const toStackTab = urlObj.searchParams.get('toStackTab');
  const pathSegments = urlObj.pathname.split('/').filter(segment => segment);

  if (toStackTab) {
    const level = parseInt(toStackTab, 10);
    const maxLevel = Math.min(level, pathSegments.length);
    return `${urlObj.origin}/${pathSegments.slice(0, maxLevel).join('/')}`;
  }
  return `${urlObj.origin}/${pathSegments.join('/')}`;
}

function switchToBITab(curTabId, curTabUrl) {
  chrome.tabs.query({}, (tabs) => {
    for (let tab of tabs) {
      const prefixPath = getPrefixPath(curTabUrl);
      if (prefixPath && tab.url && tab.url.includes(prefixPath) && curTabId != tab.id) {
        chrome.tabs.remove(curTabId);
        chrome.tabs.update(tab.id, { active: true });
        break;
      }
    }
  });
}
