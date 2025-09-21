// Render: create and manage the Matter.js Render and Runner for the UI.

/**
 * Create and start a Matter.Render attached to the `#app` element.
 * The returned object can be used for lookAt/framing.
 * @param {Matter.Engine} engine - The Matter engine to render.
 * @returns {Matter.Render} The created renderer.
 */
export function createRenderer(engine) {
  const appEl = document.getElementById("app");
  const pr = window.devicePixelRatio || 1;

  // Use the DOM element as the render target. We enable non-wireframe mode
  // for a cleaner UI look and set the canvas size to match the window.
  const render = Matter.Render.create({
    element: appEl,
    engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: "#10141f",
      pixelRatio: pr
    }
  });

  Matter.Render.run(render);

  // Resize handler keeps canvas and Render options in sync with window size.
  window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    render.canvas.width = w;
    render.canvas.height = h;
    render.options.width = w;
    render.options.height = h;
  });

  // Make the canvas focusable so keyboard input works when clicked.
  render.canvas.setAttribute('tabindex', '0');
  render.canvas.focus();

  return render;
}

// Start the Matter.js Runner which advances the simulation.
/**
 * Start the Matter.Runner for the provided engine.
 * @param {Matter.Engine} engine
 * @returns {Matter.Runner}
 */
export function startRunner(engine) {
  const runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);
  return runner;
}
