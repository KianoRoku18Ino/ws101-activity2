/* ============================================================
   common.js
   Loaded by every page (index + all four task pages). The only
   behavior every page shares is the background-music toggle — each
   task page's own math/logic lives in its own separate script file.
   ============================================================ */

/**
 * toggleMusic
 * Plays or pauses the background-music track and swaps the toggle
 * button's icon/label to reflect the new state.
 * @param {void}
 * @returns {void}
 */
function toggleMusic() {
  const audio = document.getElementById("bgMusic");
  const button = document.getElementById("musicToggle");
  const icon = button.querySelector(".music-icon");

  if (audio.paused) {
    audio.play().catch(() => {
      // fail quietly if playback can't start for any reason
    });
    button.setAttribute("aria-pressed", "true");
    icon.textContent = "🔊";
  } else {
    audio.pause();
    button.setAttribute("aria-pressed", "false");
    icon.textContent = "🔈";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("musicToggle").addEventListener("click", toggleMusic);
});
