// app/scene.js
import { world } from "./engine.js";

export let box;

export function setupScene() {
  const { Bodies, World } = Matter;

  const W = window.innerWidth;
  const H = window.innerHeight;

  // Table
  const table = Bodies.rectangle(
    W / 2,
    H / 2 + 100,
    Math.min(600, W * 0.8),
    20,
    { isStatic: true, render: { fillStyle: "#2a2f3a" } }
  );

  // Box
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

  // Walls
  const wallOpts = { isStatic: true, render: { visible: false } };
  const walls = [
    Bodies.rectangle(W / 2, -50, W, 100, wallOpts),
    Bodies.rectangle(W / 2, H + 50, W, 100, wallOpts),
    Bodies.rectangle(-50, H / 2, 100, H, wallOpts),
    Bodies.rectangle(W + 50, H / 2, 100, H, wallOpts),
  ];

  World.add(world, [table, box, ...walls]);
}
