import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getTeams } from "../../dbase/fetch.mock.db";

const mapGetTeamMembers = (server: Application) => {
  server.post(
    "/api/team/members",
    isAuthenticated,
    [body("teamId").isMongoId()],
    (req: Request, res: Response) => {
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
