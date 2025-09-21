// Controls: keyboard state tracking for the app.

/**
 * Keyboard state map. Keys are lower-case and map to boolean pressed state.
 * Example: `keyState['w'] === true` when W is held.
 * @type {{[key:string]: boolean}}
 */
export const keyState = Object.create(null);

/**
 * Install DOM listeners to update `keyState`.
 * Call this once during app initialization.
 * @returns {void}
 */
export function setupControls() {
  // Normalize to lower-case keys to simplify checks (e.g., 'W' -> 'w').
  window.addEventListener("keydown", (e) => {
    keyState[e.key.toLowerCase()] = true;
  });
  window.addEventListener("keyup", (e) => {
    keyState[e.key.toLowerCase()] = false;
  });
}
