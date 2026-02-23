function updateBlockRules(blockList) {
  const rules = blockList.map((pattern, index) => ({
    id: index + 100, // avoid collision with Shorts rule
    priority: 1,
    action: {
      type: "redirect",
      redirect: { url: "https://www.youtube.com/" }
    },
    condition: {
      regexFilter: pattern,
      resourceTypes: ["main_frame"]
    }
  }));

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(r => r.id),
    addRules: rules
  });
}

// Default Shorts blocking rule
const shortsRule = {
  id: 1,
  priority: 1,
  action: {
    type: "redirect",
    redirect: { url: "https://www.youtube.com/" }
  },
  condition: {
    regexFilter: "https://(www\\.)?youtube\\.com/shorts.*",
    resourceTypes: ["main_frame"]
  }
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [shortsRule]
  });

  // Load user blocklist
  chrome.storage.sync.get({ blockList: [] }, (data) => {
    updateBlockRules(data.blockList);
  });
});

// Listen for changes in blocklist
chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockList) {
    updateBlockRules(changes.blockList.newValue);
  }
});
