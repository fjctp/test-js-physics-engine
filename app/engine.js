// app/engine.js
export const engine = Matter.Engine.create();
export const world  = engine.world;
world.gravity.y = 0.1;
