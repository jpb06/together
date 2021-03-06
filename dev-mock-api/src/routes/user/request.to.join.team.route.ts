import { Application, Request } from "express";
import { body } from "express-validator";
import moment from "moment";

import {
    teamToBareTeam, userToTerseUser
} from "../../../../front-react/src/stack-shared-code/conversion-helpers/types.conversion.helpers";
import { Team } from "../../../../front-react/src/stack-shared-code/types";
import { getTeams, getUsers } from "../../dbase/fetch.mock.db";
import { persistTeam, persistUser } from "../../dbase/update.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";
import { mongoObjectId } from "../../util/objectid";

const isUserAlreadyInTeam = (team: Team, userId: string) =>
  team.joinRequests.find((el) => el.user.id === userId) !== undefined ||
  team.members.find((el) => el.id === userId) !== undefined;

const mapRequestToJoinTeam = (server: Application) => {
  server.post(
    "/api/user/requestToJoinTeam",
    isAuthenticated,
    [body("teamName").isString().notEmpty()],
    (req: Request, res: ApiResponse) => {
      let users = getUsers();
      let teams = getTeams();

      const user = users.find((el) => el.email === res.locals.email);
      if (!user) return res.answer(520, "Unable to get the source user");

      const team = teams.find((el) => el.name === req.body.teamName);
      if (!team) return res.answer(520, "Unable to locate the selected team");

      if (isUserAlreadyInTeam(team, user.id))
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
