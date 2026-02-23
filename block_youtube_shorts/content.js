function removeShorts() {
  // Remove Shorts shelf on homepage
  document.querySelectorAll('ytd-reel-shelf-renderer').forEach(el => {
    el.remove();
  });

  // Remove Shorts in sidebar navigation
  document.querySelectorAll('a[href^="/shorts"]').forEach(el => {
    el.remove();
  });

  // Remove Shorts in search results
  document.querySelectorAll('ytd-reel-item-renderer').forEach(el => {
    el.remove();
  });

  // If user tries to open a Shorts video directly, redirect to homepage
  if (window.location.pathname.startsWith("/shorts")) {
    window.location.href = "/";
  }
}

function hideShorts() {
  // Hide Shorts shelf on homepage
  document.querySelectorAll('ytd-reel-shelf-renderer').forEach(el => {
    el.style.display = "none";
  });

  // Hide Shorts in sidebar
  document.querySelectorAll('a[href^="/shorts"]').forEach(el => {
    el.style.display = "none";
  });

  // Hide Shorts in search results
  document.querySelectorAll('ytd-reel-item-renderer').forEach(el => {
    el.style.display = "none";
  });
}

function muteAndDisableShorts() {
  // Target Shorts video elements
  document.querySelectorAll('ytd-reel-video-renderer video').forEach(video => {
    video.muted = true;
    video.volume = 0;

    // Prevent unmuting
    video.addEventListener('volumechange', () => {
      video.muted = true;
      video.volume = 0;
    });
  });

  // Hide mute/volume controls in Shorts player
  document.querySelectorAll('ytd-reel-video-renderer .ytp-volume-panel').forEach(panel => {
    panel.style.display = "none";
  });
}

// Run once when page loads
document.addEventListener("DOMContentLoaded", () => {
  hideShorts();
  muteAndDisableShorts();
  removeShorts();
});

// Run again when YouTube dynamically loads new content
const observer = new MutationObserver(() => {
  hideShorts();
  muteAndDisableShorts();
  removeShorts();
});
observer.observe(document.body, { childList: true, subtree: true });
