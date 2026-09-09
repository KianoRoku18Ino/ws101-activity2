/* ============================================================
   common.js
   WS101 Activity 2 | Karl Ian Ranay Galarido

   The only script every one of my five pages loads. It only does one
   job — the music toggle — because that's the only behavior I
   actually want shared across pages. Each task's real logic lives in
   that page's own separate .js file instead of being lumped in here,
   since the instructor wants A/B/C kept apart, not just the HTML.
   ============================================================ */

/**
 * toggleMusic
 * Plays or pauses my background-music track and swaps the toggle
 * button's icon/label to match. I never added an autoplay attribute
 * to the <audio> tag on purpose — nothing plays until someone
 * actually clicks this button, which is also the only way browsers
 * let audio start playing in the first place.
 * @param {void}
 * @returns {void}
 */
function toggleMusic() {
  const audio = document.getElementById("bgMusic");
  const button = document.getElementById("musicToggle");
  const icon = button.querySelector(".music-icon");

  if (audio.paused) {
    audio.play().catch(() => {
      // play() can still fail even after a real click — I'm catching
      // that quietly instead of letting it throw, since the only way
      // I've seen it fail here is a missing audio file, not anything
      // the person clicking the button did wrong
    });
    button.setAttribute("aria-pressed", "true");
    icon.textContent = "🔊";
  } else {
    audio.pause();
    button.setAttribute("aria-pressed", "false");
    icon.textContent = "🔈";
  }
}

// every page has its own #musicToggle button and #bgMusic element, so
// this same listener setup works no matter which page loaded it
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("musicToggle").addEventListener("click", toggleMusic);
});
