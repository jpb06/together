import { Application, Request } from "express";
import { body } from "express-validator";
import moment from "moment";

import {
    userToTerseUser
} from "../../../../front-react/src/stack-shared-code/conversion-helpers/types.conversion.helpers";
import { Team } from "../../../../front-react/src/stack-shared-code/types";
import { getTeams, getUsers } from "../../dbase/fetch.mock.db";
import { persistTeam, persistUser } from "../../dbase/update.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";
import { mongoObjectId } from "../../util/objectid";

const mapCreateTeam = (server: Application) => {
  server.post(
    "/api/team/create",
    isAuthenticated,
    [body("teamName").isString().notEmpty()],
    (req: Request, res: ApiResponse) => {
      const teams = getTeams();
      const users = getUsers();

      const team = teams.find((el) => el.name === req.body.teamName);
      if (team) {
        return res.answer(400, "Team already exists");
      }

      const user = users.find((el) => el.email === res.locals.email);
      if (!user) {
        return res.answer(
          400,
          `Unable to find team ${req.body.teamName} creator`
        );
      }

      const newTeam: Team = {
        id: mongoObjectId(),
        name: req.body.teamName,
        members: [
          {
            ...userToTerseUser(user),
            status: "creator",
            joinDate: moment().toISOString(),
          },
        ],
        invitedUsers: [],
        joinRequests: [],
      };
      persistTeam(newTeam);

      user.teams.push({ id: newTeam.id, name: newTeam.name });
      persistUser(user);

      res.populate(newTeam.id);
    }
  );
};

export default mapCreateTeam;
