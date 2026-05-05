// Remove all YouTube Shorts elements and redirect if on shorts page
function removeShorts() {
  // Remove reel shelf renderers
  document.querySelectorAll("ytd-reel-shelf-renderer").forEach((element) => {
    element.remove();
  });

  // Remove shorts links
  document.querySelectorAll('a[href^="/shorts"]').forEach((element) => {
    element.remove();
  });

  // Remove reel item renderers
  document.querySelectorAll("ytd-reel-item-renderer").forEach((element) => {
    element.remove();
  });

  // Redirect if currently on shorts page
  if (window.location.pathname.startsWith("/shorts")) {
    window.location.href = "/";
  }
}

// Hide YouTube Shorts elements with CSS
function hideShorts() {
  document.querySelectorAll("ytd-reel-shelf-renderer").forEach((element) => {
    element.style.display = "none";
  });

  document.querySelectorAll('a[href^="/shorts"]').forEach((element) => {
    element.style.display = "none";
  });

  document.querySelectorAll("ytd-reel-item-renderer").forEach((element) => {
    element.style.display = "none";
  });
}

// Mute YouTube Shorts videos
function muteShorts() {
  document.querySelectorAll("ytd-reel-video-renderer video").forEach((video) => {
    video.muted = true;
    video.volume = 0;
    video.addEventListener("volumechange", () => {
      video.muted = true;
      video.volume = 0;
    });
  });

  document.querySelectorAll("ytd-reel-video-renderer .ytp-volume-panel").forEach((element) => {
    element.style.display = "none";
  });
}

// Run on DOM load
document.addEventListener("DOMContentLoaded", () => {
  hideShorts();
  muteShorts();
  removeShorts();
});

// Observe DOM changes and reapply
new MutationObserver(() => {
  hideShorts();
  muteShorts();
  removeShorts();
}).observe(document.body, {
  childList: true,
  subtree: true
});
