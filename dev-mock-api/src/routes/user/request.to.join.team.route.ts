import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { persistUser, persistTeam } from "../../dbase/update.mock.db";
import {
  teamToBareTeam,
  userToTerseUser,
} from "../../util/types.conversion.helpers";
import * as moment from "moment";
import { getUsers, getTeams } from "../../dbase/fetch.mock.db";
import { mongoObjectId } from "../../util/objectid";

const mapRequestToJoinTeam = (server: Application) => {
  server.post(
    "/api/user/requestToJoinTeam",
    isAuthenticated,
    [body("teamName").isString().notEmpty()],
    (req: Request, res: Response) => {
      let users = getUsers();
      let teams = getTeams();

      const user = users.find((el) => el.email === res.locals.email);
      if (!user) return res.answer(520, "Unable to get the source user");

      const team = teams.find((el) => el.name === req.body.teamName);
      if (!team) return res.answer(520, "Unable to locate the selected team");

      const userIsAlreadyInTeam =
        team.joinRequests.find((el) => el.user.id === user.id) ||
        team.members.find((el) => el.id === user.id);

      if (userIsAlreadyInTeam)
        return res.answer(
          520,
          "This user has already either been added to the team or requested to join the team"
        );

      const requestId = mongoObjectId();
      const requestDate = moment().toISOString();

      const joinRequest = {
        id: requestId,
        date: requestDate,
        team: teamToBareTeam(team),
      };
      user.teamJoinRequests.push(joinRequest);
      team.joinRequests.push({
        id: requestId,
        date: requestDate,
        user: userToTerseUser(user),
      });

      persistUser(user);
      persistTeam(team);

      return res.populate(joinRequest);
    }
  );
};

export default mapRequestToJoinTeam;
