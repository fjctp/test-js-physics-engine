// server.ts
import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  // Serve files from the current working directory
  return serveDir(req, {
    fsRoot: ".",
    showDirListing: true,
    quiet: true,
  });
});
