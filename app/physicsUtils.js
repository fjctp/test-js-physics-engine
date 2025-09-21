// app/physicsUtils.js
// Common physics helpers + tunable constants.

export const FORCE  = 0.0025;   // linear force magnitude per tick
export const TORQUE = 0.0100;  // torque magnitude (used by applyTorque)

/**
 * Apply a pure torque (moment) by using a vertical force couple at the left/right edges.
 * Positive tau => CCW.
 */
export function applyTorque(body, tau) {
  const { Body, Vector } = Matter;

  // Approximate half-width in world space
  const halfW = Math.max(body.bounds.max.x - body.position.x, 1);
  const rRight = Vector.add(body.position, { x:  halfW, y: 0 });
  const rLeft  = Vector.add(body.position, { x: -halfW, y: 0 });

  // τ = F * r  →  F ≈ τ / r
  const Fy = tau / halfW;

  // CCW: up on right, down on left
  Body.applyForce(body, rRight, { x: 0, y: -Fy });
  Body.applyForce(body, rLeft,  { x: 0, y:  Fy });
}

/**
 * Apply a force specified in the body's local frame.
 * localForce = {x, y} in body axes (+x right, +y down screen if angle = 0).
 */
export function applyForceBody(body, localForce) {
  const worldForce = Matter.Vector.rotate(localForce, body.angle);
  Matter.Body.applyForce(body, body.position, worldForce);
}

/** (Optional) Apply a force already expressed in world frame. */
export function applyForceWorld(body, worldForce) {
  Matter.Body.applyForce(body, body.position, worldForce);
}
