// app/inputActions.js
// Map key state to forces/torques.
// Uses BODY-FRAME controls for W/A/S/D by default.

import { keyState } from "./controls.js";
import { FORCE, TORQUE, applyTorque, applyForceBody } from "./physicsUtils.js";

export function setupInputActions(engine, box) {
  const { Events } = Matter;

  Events.on(engine, "beforeUpdate", () => {
    if (!box) return;

    // Body-frame thrust vectors (local to the box)
    // Note: in Matter's screen coords +y is downward.
    const thrustForward  = { x: 0,        y: -FORCE };
    const thrustBackward = { x: 0,        y:  FORCE };
    const thrustLeft     = { x: -FORCE,   y:  0     };
    const thrustRight    = { x:  FORCE,   y:  0     };

    if (keyState["w"]) applyForceBody(box, thrustForward);
    if (keyState["s"]) applyForceBody(box, thrustBackward);
    if (keyState["a"]) applyForceBody(box, thrustLeft);
    if (keyState["d"]) applyForceBody(box, thrustRight);

    if (keyState["q"]) applyTorque(box,  TORQUE);  // CCW
    if (keyState["e"]) applyTorque(box, -TORQUE);  // CW
  });
}
