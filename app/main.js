// Main: app entry point, wires modules together and starts the simulation.

import { engine, world } from "./engine.js";
import { createRenderer, startRunner } from "./render.js";
import { setupControls } from "./controls.js";
import { setupScene, box } from "./scene.js";
import { setupInputActions } from "./inputActions.js";

setupControls();
setupScene();

const render = createRenderer(engine);
startRunner(engine);

setupInputActions(engine, box);

// Frame initial view so the renderer centers on all bodies we just created.
Matter.Render.lookAt(render, Matter.Composite.allBodies(world));
