/* global Matter */
(() => {
  const { Engine, Render, Runner, World, Bodies, Body, Events, Composite, Vector } = Matter;

  // --- Sizing ---
  const app = document.getElementById('app');
  const W = window.innerWidth;
  const H = window.innerHeight;

  // --- Engine & world ---
  const engine = Engine.create();
  const world = engine.world;

  // Slight damping so motion doesn't explode
  engine.world.gravity.y = 0.1;

  // --- Renderer ---
  const render = Render.create({
    element: app,
    engine,
    options: {
      width: W,
      height: H,
      wireframes: false,
      background: '#10141f',
      pixelRatio: window.devicePixelRatio || 1
    }
  });
  Render.run(render);

  // --- Runner (game loop) ---
  const runner = Runner.create();
  Runner.run(runner, engine);

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

  World.add(world, [table, box]);

  // --- Walls (keep things on screen) ---
  const wallOpts = { isStatic: true, render: { visible: false } };
  const walls = [
    Bodies.rectangle(W / 2, -50, W, 100, wallOpts),
    Bodies.rectangle(W / 2, H + 50, W, 100, wallOpts),
    Bodies.rectangle(-50, H / 2, 100, H, wallOpts),
    Bodies.rectangle(W + 50, H / 2, 100, H, wallOpts)
  ];
  World.add(world, walls);

  // --- Controls: forces & moment ---
  // Force units in Matter.js are small; we apply a small force each tick while key is held.
  const keyState = Object.create(null);
  const FORCE = 0.0025;     // linear force magnitude per tick
  // const TORQUE = 0.00008;   // torque magnitude (as couple via forces) per tick
  const TORQUE = 0.0100;   // torque magnitude (as couple via forces) per tick

  window.addEventListener('keydown', (e) => { keyState[e.key.toLowerCase()] = true; });
  window.addEventListener('keyup',   (e) => { keyState[e.key.toLowerCase()] = false; });

  // Helper: apply a pure torque (moment) by applying a couple of equal/opposite forces
  function applyTorque(body, tau) {
    // Apply +F at +x edge and -F at -x edge, equal and opposite vertically → net torque
    const halfW = body.bounds.max.x - body.position.x; // approximate half-width
    // Choose lever arm r along body local x-axis
    const rWorldRight = Vector.add(body.position, { x: halfW, y: 0 });
    const rWorldLeft  = Vector.add(body.position, { x: -halfW, y: 0 });

    // F * lever ~ tau → F ≈ tau / halfW ; guard for small lever
    const lever = Math.max(halfW, 1);
    const Fy = tau / lever;

    // Up on right, down on left (for CCW torque)
    Body.applyForce(body, rWorldRight, { x: 0, y: -Fy });
    Body.applyForce(body, rWorldLeft,  { x: 0, y:  Fy });
  }

  // Apply inputs each tick
  Events.on(engine, 'beforeUpdate', () => {
    if (!box) return;

    // Linear forces in world coordinates:
    // Note: +y is downward in Matter.js screen coords.
    if (keyState['w']) Body.applyForce(box, box.position, { x: 0, y: -FORCE }); // up
    if (keyState['s']) Body.applyForce(box, box.position, { x: 0, y:  FORCE }); // down
    if (keyState['a']) Body.applyForce(box, box.position, { x: -FORCE, y: 0 }); // left
    if (keyState['d']) Body.applyForce(box, box.position, { x:  FORCE, y: 0 }); // right

    // Torque: q = CCW, e = CW
    if (keyState['q']) applyTorque(box,  TORQUE);
    if (keyState['e']) applyTorque(box, -TORQUE);
  });

  // --- Resize handling ---
  function onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    render.canvas.width = w;
    render.canvas.height = h;
    render.options.width = w;
    render.options.height = h;
    Render.lookAt(render, Composite.allBodies(world));
  }
  window.addEventListener('resize', onResize);

  // Focus canvas for immediate key input (optional)
  render.canvas.setAttribute('tabindex', '0');
  render.canvas.focus();

  // Expose for quick debugging
  window.engine = engine;
  window.box = box;
})();
