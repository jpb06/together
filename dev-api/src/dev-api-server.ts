import * as jsonServer from "json-server";
import * as path from "path";

import mapLoginRoute from "./routes/login.route";

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db", "db.json"));

const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: "node_modules/json-server/public"
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use((req, res, next) => {
  setTimeout(next, 100);
});

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

/* ----------------------------------------------------------------------------------- */
// Declaring custom routes below. Add custom routes before JSON Server router
/* ----------------------------------------------------------------------------------- */

mapLoginRoute(server);

/* ----------------------------------------------------------------------------------- */
// Use default router
server.use(router);

// Start server
const port = 3002;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
