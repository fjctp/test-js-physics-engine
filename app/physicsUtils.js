// PhysicsUtils: force/torque constants and helper functions for applying them.

/**
 * Linear force magnitude applied per tick when movement keys are held.
 * @type {number}
 */
export const FORCE = 0.0025;

/**
 * Torque magnitude used by applyTorque.
 * @type {number}
 */
export const TORQUE = 0.0100;

// Apply a pure torque (moment) by applying opposite vertical forces at the
// left and right edges of the body. We approximate the lever arm using the
// body's half-width in world coordinates.
/**
 * Apply a pure moment (torque) to a body by applying a vertical force
 * couple at the left and right edges. Positive `tau` produces counter-clockwise
 * rotation.
 * @param {Matter.Body} body
 * @param {number} tau
 * @returns {void}
 */
export function applyTorque(body, tau) {
  const { Body, Vector } = Matter;
  const halfW = Math.max(body.bounds.max.x - body.position.x, 1);
  const rRight = Vector.add(body.position, { x: halfW, y: 0 });
  const rLeft = Vector.add(body.position, { x: -halfW, y: 0 });
  const Fy = tau / halfW;
  // Apply vertical forces to create a couple (one up, one down).
  Body.applyForce(body, rRight, { x: 0, y: -Fy });
  Body.applyForce(body, rLeft, { x: 0, y: Fy });
}

// Apply a force specified in the body's local frame. We rotate the local
// vector by the body's angle to get the world-space force before applying it.
/**
 * Apply a force given in the body's local frame (rotated by body.angle).
 * @param {Matter.Body} body
 * @param {{x:number,y:number}} localForce
 * @returns {void}
 */
export function applyForceBody(body, localForce) {
  const worldForce = Matter.Vector.rotate(localForce, body.angle);
  Matter.Body.applyForce(body, body.position, worldForce);
}

// Apply a force already expressed in world coordinates.
/** Apply a world-space force to a body. */
export function applyForceWorld(body, worldForce) {
  Matter.Body.applyForce(body, body.position, worldForce);
}
