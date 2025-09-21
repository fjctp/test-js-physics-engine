// Map keyboard input to forces and torque applied to the box.
// W/A/S/D apply small forces in the box's local frame so forward is 'up'
// relative to the box orientation. Q/E apply a torque (moment) to rotate.

import { keyState } from "./controls.js";
import { applyForceBody, applyTorque, FORCE, TORQUE } from "./physicsUtils.js";

/**
 * Wire keyboard input to forces/torques applied to the box.
 * @param {Matter.Engine} engine
 * @param {Matter.Body} box
 * @returns {void}
 */
export function setupInputActions(engine, box) {
  const { Events } = Matter;

  // Run every tick before the engine updates so forces influence the step.
  Events.on(engine, "beforeUpdate", () => {
    if (!box) return;

    // Forces given in the body's local axes. applyForceBody rotates these
    // into world coordinates before calling Matter.Body.applyForce.
    const thrustForward = { x: 0, y: -FORCE };
    const thrustBackward = { x: 0, y: FORCE };
    const thrustLeft = { x: -FORCE, y: 0 };
    const thrustRight = { x: FORCE, y: 0 };

    if (keyState["w"]) applyForceBody(box, thrustForward);
    if (keyState["s"]) applyForceBody(box, thrustBackward);
    if (keyState["a"]) applyForceBody(box, thrustLeft);
    if (keyState["d"]) applyForceBody(box, thrustRight);

    // Q/E apply a moment (torque). Positive tau = counter-clockwise.
    if (keyState["q"]) applyTorque(box, TORQUE);
    if (keyState["e"]) applyTorque(box, -TORQUE);
  });
}
