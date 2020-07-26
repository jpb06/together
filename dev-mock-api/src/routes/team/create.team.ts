import * as moment from "moment";
import { Request, Response } from "express-serve-static-core";
import { getTeams, getUsers } from "../../dbase/fetch.mock.db";
import { Application } from "express";
import { body } from "express-validator";
import isAuthenticated from "../../middleware/is.authenticated";
import { Team } from "../../../../shared/types/interfaces/team.interfaces";
import { mongoObjectId } from "../../util/objectid";
import { userToTerseUser } from "../../util/types.conversion.helpers";
import { persistTeam, persistUser } from "../../dbase/update.mock.db";

const mapCreateTeam = (server: Application) => {
  server.post(
    "/api/team/create",
    isAuthenticated,
    [body("teamName").isString().notEmpty()],
    (req: Request, res: Response) => {
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
