import { getBlockedPatterns } from './blockedDomains.js';

// Get blocked URL patterns from centralized config
const blockedUrls = getBlockedPatterns();

// Common redirect URL
const redirectUrl = "https://www.google.com/";

// Function to create a rule for a given pattern
function createRule(id, pattern, redirectTo = redirectUrl) {
  return {
    id: id,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        url: redirectTo
      }
    },
    condition: {
      regexFilter: pattern,
      resourceTypes: ["main_frame"]
    }
  };
}

// Function to update dynamic rules with custom blocklist
function updateRulesWithBlocklist(customBlockList = []) {
  const allPatterns = [...blockedUrls, ...customBlockList];
  const rules = allPatterns.map((pattern, index) => 
    createRule(index + 100, pattern, redirectUrl)
  );

  // Get existing rule IDs to clean up old rules
  chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
    const existingIds = existingRules.map(r => r.id);
    const rulesToRemove = existingIds.filter(id => id >= 100); // Remove old rules (IDs 100+)
    
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rulesToRemove,
      addRules: rules
    });
  });
}

// Default rule to redirect YouTube Shorts
const defaultRule = createRule(1, "https://(www\\.)?youtube\\.com/shorts.*", redirectUrl);

// Initialize extension on install
chrome.runtime.onInstalled.addListener(() => {
  // First, add the default YouTube rule and all blocked URLs
  chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
    const existingIds = existingRules.map(r => r.id);
    
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingIds,
      addRules: [defaultRule, ...blockedUrls.map((pattern, index) => 
        createRule(index + 100, pattern, redirectUrl)
      )]
    });
  });
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockList) {
    updateRulesWithBlocklist(changes.blockList.newValue);
  }
});
