import * as express from "express";
import {
  Express,
  Request,
  Response,
  NextFunction,
} from "express-serve-static-core";
import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as cors from "cors";

import extendsImplementation from "./middleware/extends.implementation.middleware.js";
import mapLoginRoute from "./routes/login.route.js";
import mapAcceptTeamInvite from "./routes/user/accept.invite.route.js";
import mapDeclineTeamInvite from "./routes/user/decline.invite.route.js";
import mapGetUserTimeline from "./routes/user/get.timeline.route.js";
import mapGetUserTeams from "./routes/user/get.user.teams.route.js";
import mapGetTeamMembers from "./routes/team/get.team.members.js";
import mapGetDaily from "./routes/daily/get.daily.js";
import mapSetDailyDuration from "./routes/daily/set.daily.duration.js";
import mapRemoveUnforeseenTicket from "./routes/daily/remove.unforeseen.ticket.js";
import mapAddUnforeseenTicket from "./routes/daily/add.unforeseen.ticket.js";
import mapAddDoneTicket from "./routes/daily/add.done.ticket.js";
import mapRemoveDoneTicket from "./routes/daily/remove.done.ticket.js";
import mapAddFeeling from "./routes/daily/add.feeling.js";
import mapRemoveFeeling from "./routes/daily/remove.feeling.js";
import mapAddSubject from "./routes/daily/add.subject.js";
import mapRemoveSubject from "./routes/daily/remove.subject.js";
import ErrorHandler from "./middleware/errors.handler.js";
import NoRouteErrorHandler from "./middleware/no.route.error.handler.js";

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
mapGetTeamMembers(app);

mapGetDaily(app);
mapSetDailyDuration(app);
mapAddUnforeseenTicket(app);
mapRemoveUnforeseenTicket(app);
mapAddDoneTicket(app);
mapRemoveDoneTicket(app);
mapAddFeeling(app);
mapRemoveFeeling(app);
mapAddSubject(app);
mapRemoveSubject(app);

app.use(ErrorHandler);
app.use(NoRouteErrorHandler);

app.set("port", 3002);

var server = app.listen(app.get("port"), "", () => {
  console.log("Mock dev api running on port 3002");
});
