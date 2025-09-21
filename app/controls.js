// Track keyboard state globally
(function initControls() {
  const keyState = Object.create(null);

  window.addEventListener('keydown', e => { keyState[e.key.toLowerCase()] = true; });
  window.addEventListener('keyup',   e => { keyState[e.key.toLowerCase()] = false; });

  window.keyState = keyState;
})();
