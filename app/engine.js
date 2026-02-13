// Engine: creates and exports the Matter.js Engine and World used by the app.

/**
 * The Matter.js Engine instance used by the app.
 * @type {Matter.Engine}
 */
export const engine = Matter.Engine.create();

/**
 * The shared World owned by the engine.
 * @type {Matter.World}
 */
export const world = engine.world;

// Gravity is small for this demo so the box slides slowly on the table.
world.gravity.y = 0.1;
