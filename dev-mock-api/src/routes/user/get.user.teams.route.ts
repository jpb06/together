import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getUsers, getTeams, getDailies } from "../../dbase/fetch.mock.db";
import { splittedDateToMoment, splittedDateToString } from "../../util/dates";
import { TeamWithLastActivity } from "../../types/persisted.team.type";

const mapGetUserTeams = (server: Application) => {
  server.post(
    "/api/user/teams",
    isAuthenticated,
    [
      body("userId")
        .isHexadecimal()
        .isLength({ min: 24, max: 24 }),
      body("fetchLastActivity").customSanitizer(value => <boolean>value)
    ],
    (req: Request, res: Response) => {
      const userId: string = req.body.userId;
      const fetchLastActivity = <boolean>req.body.fetchLastActivity;

      const dailies = getDailies();
      const teams = getTeams();

      const userTeams = teams.filter(team =>
        team.members.some(member => member.id === userId)
      ) as Array<TeamWithLastActivity>;
      if (userTeams.length === 0)
        return res.answer(500, "Unable to get user teams");

      if (fetchLastActivity) {
        const userTeamsDailies = dailies.filter(daily =>
          userTeams.some(team => team.id === daily.teamId)
        );
        const sorted = userTeamsDailies.sort(
          (a, b) =>
            splittedDateToMoment(b.year, b.month, b.day).unix() -
            splittedDateToMoment(a.year, a.month, a.day).unix()
        );

        for (const team of userTeams) {
          const teamEvents = sorted.filter(el => el.teamId === team.id);
          team.lastActivity =
            teamEvents.length > 0
              ? splittedDateToString(
                  teamEvents[0].year,
                  teamEvents[0].month,
                  teamEvents[0].day
                )
              : "None";
        }
      }

      return res.populate(userTeams);
    }
  );
};

export default mapGetUserTeams;
