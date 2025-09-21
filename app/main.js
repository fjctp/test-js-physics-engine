// Build the scene (table, box, walls) and apply forces/torque from key input.
(function main() {
  const {
    Bodies, World, Body, Events, Composite, Vector
  } = Matter;

  // Start runner (from engine.js)
  window.startRunner();

  // Dimensions
  const W = window.innerWidth;
  const H = window.innerHeight;

  // --- Table (static) ---
  const tableWidth = Math.min(600, W * 0.8);
  const tableHeight = 20;
  const tableX = W / 2;
  const tableY = H / 2 + 100; // slightly below center

  const table = Bodies.rectangle(tableX, tableY, tableWidth, tableHeight, {
    isStatic: true,
    render: { fillStyle: '#2a2f3a' }
  });

  // --- Square (dynamic) ---
  const boxSize = 80;
  const box = Bodies.rectangle(W / 2, tableY - boxSize - 2, boxSize, boxSize, {
    restitution: 0.1,
    friction: 0.5,
    frictionAir: 0.02,
    render: { fillStyle: '#4aa3ff' }
  });

  // --- Invisible walls (keep in view) ---
  const wallOpts = { isStatic: true, render: { visible: false } };
  const walls = [
    Bodies.rectangle(W / 2, -50, W, 100, wallOpts),      // top
    Bodies.rectangle(W / 2, H + 50, W, 100, wallOpts),   // bottom
    Bodies.rectangle(-50, H / 2, 100, H, wallOpts),      // left
    Bodies.rectangle(W + 50, H / 2, 100, H, wallOpts)    // right
  ];

  World.add(window.world, [table, box, ...walls]);

  // Frame initial view
  Matter.Render.lookAt(window.render, Composite.allBodies(window.world));

  // --- Input forces / torque ---
  const FORCE  = 0.0025;   // linear force per tick
  const TORQUE = 0.0100;  // torque magnitude (applied as a force couple)

  function applyTorque(body, tau) {
    // Approximate lever arm using half-width in world coords
    const halfW = Math.max(body.bounds.max.x - body.position.x, 1);
    const rRight = Vector.add(body.position, { x:  halfW, y: 0 });
    const rLeft  = Vector.add(body.position, { x: -halfW, y: 0 });

    // τ = F * r  →  F ≈ τ / r
    const Fy = tau / halfW;

    // CCW torque: up on right, down on left
    Body.applyForce(body, rRight, { x: 0, y: -Fy });
    Body.applyForce(body, rLeft,  { x: 0, y:  Fy });
  }

  // Apply inputs every tick while keys are held
  Events.on(window.engine, 'beforeUpdate', () => {
    const ks = window.keyState || {};
    // Matter.js screen coords: +y is downward
    if (ks['w']) Body.applyForce(box, box.position, { x: 0, y: -FORCE }); // up
    if (ks['s']) Body.applyForce(box, box.position, { x: 0, y:  FORCE }); // down
    if (ks['a']) Body.applyForce(box, box.position, { x: -FORCE, y: 0 }); // left
    if (ks['d']) Body.applyForce(box, box.position, { x:  FORCE, y: 0 }); // right
    if (ks['q']) applyTorque(box,  TORQUE);  // CCW
    if (ks['e']) applyTorque(box, -TORQUE);  // CW
  });

  // Debug handles if you want to poke in DevTools
  window.box = box;
})();
