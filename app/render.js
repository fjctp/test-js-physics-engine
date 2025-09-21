// app/render.js
// Create and run renderer/runner with a concrete engine.

export function createRenderer(engine) {
  const appEl = document.getElementById("app");
  const pr = window.devicePixelRatio || 1;

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

  // Keep canvas full-screen on resize
  window.addEventListener("resize", () => {
    const w = window.innerWidth, h = window.innerHeight;
    render.canvas.width = w;
    render.canvas.height = h;
    render.options.width = w;
    render.options.height = h;
  });

  // Focus for keyboard input
  render.canvas.setAttribute("tabindex", "0");
  render.canvas.focus();

  return render;
}

export function startRunner(engine) {
  const runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);
  return runner;
}
