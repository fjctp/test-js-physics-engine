// Fullscreen renderer with resize handling
(function initRender() {
  const appEl = document.getElementById('app');
  const W = window.innerWidth;
  const H = window.innerHeight;

  const render = Matter.Render.create({
    element: appEl,
    engine: window.engine,
    options: {
      width: W,
      height: H,
      wireframes: false,
      background: '#10141f',
      pixelRatio: window.devicePixelRatio || 1
    }
  });

  Matter.Render.run(render);

  // Expose
  window.render = render;

  // Keep canvas full-screen on resize
  function onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    render.canvas.width = w;
    render.canvas.height = h;
    render.options.width = w;
    render.options.height = h;

    // Reframe to all bodies (simple way to keep things in view)
    Matter.Render.lookAt(render, Matter.Composite.allBodies(window.world));
  }
  window.addEventListener('resize', onResize);

  // Focus canvas for key input
  render.canvas.setAttribute('tabindex', '0');
  render.canvas.focus();
})();
