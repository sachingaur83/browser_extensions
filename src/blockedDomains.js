// Single source of truth for blocked domains and patterns
export const blockedDomains = [
  { domain: "youtube.com", pattern: "https://(www\\.)?youtube\\.com/.*" },
  { domain: "youtu.be", pattern: "https://youtu\\.be/.*" },
  { domain: "m.youtube.com", pattern: "https://m\\.youtube\\.com/.*" },
  { domain: "tiktok.com", pattern: "https://(www\\.)?tiktok\\.com/.*" },
  { domain: "open.spotify.com", pattern: "https://open\\.spotify\\.com/.*" },
  { domain: "instagram.com", pattern: "https://(www\\.)?instagram\\.com/(reels/|.*\\/stories\\/)" },
  { domain: "facebook.com", pattern: "https://(www\\.)?facebook\\.com/(watch|reels|feed).*" },
  { domain: "reddit.com", pattern: "https://(www\\.)?reddit\\.com/r/.*/.*" },
  { domain: "twitter.com", pattern: "https://(www\\.)?twitter\\.com/(i/web/)?.*" },
  { domain: "x.com", pattern: "https://x\\.com/.*" },
  { domain: "roblox.com", pattern: "https://(www\\.)?roblox\\.com/.*" }
];

// Generate host permissions from domains
export function getHostPermissions() {
  const permissions = [];
  blockedDomains.forEach(({ domain }) => {
    if (domain.includes(".")) {
      const parts = domain.split(".");
      permissions.push(`*://${domain}/*`);
      if (!domain.startsWith("www.") && !domain.startsWith("open.")) {
        permissions.push(`*://www.${domain}/*`);
      }
    }
  });
  return permissions;
}

// Generate regex patterns from domains
export function getBlockedPatterns() {
  return blockedDomains.map(({ pattern }) => pattern);
}
