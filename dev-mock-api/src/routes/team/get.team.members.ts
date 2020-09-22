import { Application, Request } from "express";
import { body } from "express-validator";

import { getTeams } from "../../dbase/fetch.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";

const mapGetTeamMembers = (server: Application) => {
  server.post(
    "/api/team/members",
    isAuthenticated,
    [body("teamId").isMongoId()],
    (req: Request, res: ApiResponse) => {
      const teams = getTeams();

      const team = teams.find((el) => el.id === req.body.teamId);
      if (!team) {
        return res.answer(404, "Team not found");
      }

      return res.populate(team.members);
    }
  );
};

export default mapGetTeamMembers;
