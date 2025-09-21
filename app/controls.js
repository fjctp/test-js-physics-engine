// app/controls.js
export const keyState = Object.create(null);

export function setupControls() {
  window.addEventListener("keydown", (e) => { keyState[e.key.toLowerCase()] = true; });
  window.addEventListener("keyup",   (e) => { keyState[e.key.toLowerCase()] = false; });
}
