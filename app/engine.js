// Create engine & world; expose globally for other modules.
const engine = Matter.Engine.create();
const world = engine.world;
world.gravity.y = 0.1; // simple gravity for demo

// Export via window (no modules)
window.engine = engine;
window.world = world;

// Also export a runner start helper if needed later.
window.startRunner = function startRunner() {
  const runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);
  window.runner = runner;
};
