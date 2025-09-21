// Scene: constructs the demo scene (table, box, walls) and adds it to the world.

import { world } from "./engine.js";

/**
 * The dynamic box body created in the scene.
 * @type {Matter.Body|undefined}
 */
export let box;

/**
 * Create scene bodies (table, box, walls) and add them to the world.
 * @returns {void}
 */
export function setupScene() {
  const { Bodies, World } = Matter;
  const W = window.innerWidth;
  const H = window.innerHeight;

  // A static rectangle acts as the table surface.
  const table = Bodies.rectangle(
    W / 2,
    H / 2 + 100,
    Math.min(600, W * 0.8),
    20,
    { isStatic: true, render: { fillStyle: "#2a2f3a" } }
  );

  // Dynamic box — friction and small restitution so it behaves like a block.
  const boxSize = 80;
  box = Bodies.rectangle(
    W / 2,
    H / 2 + 100 - (boxSize + 2),
    boxSize,
    boxSize,
    {
      restitution: 0.1,
      friction: 0.5,
      frictionAir: 0.02,
      render: { fillStyle: "#4aa3ff" }
    }
  );

  // Invisible walls outside the viewport prevent objects from drifting away.
  const wallOpts = { isStatic: true, render: { visible: false } };
  const walls = [
    Bodies.rectangle(W / 2, -50, W, 100, wallOpts),
    Bodies.rectangle(W / 2, H + 50, W, 100, wallOpts),
    Bodies.rectangle(-50, H / 2, 100, H, wallOpts),
    Bodies.rectangle(W + 50, H / 2, 100, H, wallOpts),
  ];

  World.add(world, [table, box, ...walls]);
}
