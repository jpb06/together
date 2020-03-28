import * as express from "express";
import { Express, Response } from "express-serve-static-core";
import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as cors from "cors";

import extendsImplementation from "./middleware/extends.implementation.middleware.js";
import mapLoginRoute from "./routes/login.route.js";
import mapAcceptTeamInvite from "./routes/user/accept.invite.route.js";
import mapDeclineTeamInvite from "./routes/user/decline.invite.route.js";
import mapGetUserTimeline from "./routes/user/get.timeline.route.js";
import mapGetUserTeams from "./routes/user/get.teams.route.js";

let app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(extendsImplementation);
// simulate delay
app.use((req, res, next) => setTimeout(next, 500));

mapLoginRoute(app);
mapAcceptTeamInvite(app);
mapDeclineTeamInvite(app);
mapGetUserTimeline(app);
mapGetUserTeams(app);

app.set("port", 3002);

var server = app.listen(app.get("port"), "", () => {
  console.log("Mock dev api running on port 3002");
});
