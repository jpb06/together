import { Application, Request } from "express";
import { body } from "express-validator";

import { TeamWithLastActivity } from "../../../../front-react/src/stack-shared-code/types";
import { splittedDateToString } from "../../../../front-react/src/stack-shared-code/util/date.util";
import { getDailies, getTeams } from "../../dbase/fetch.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";
import { splittedDateToMoment } from "../../util/dates";

const mapGetUserTeams = (server: Application) => {
  server.post(
    "/api/user/teams",
    isAuthenticated,
    [
      body("userId").isMongoId(),
      body("fetchLastActivity").customSanitizer((value) => <boolean>value),
    ],
    (req: Request, res: ApiResponse) => {
      const userId: string = req.body.userId;
      const fetchLastActivity = <boolean>req.body.fetchLastActivity;

      const dailies = getDailies();
      const teams = getTeams();

      const userTeams = teams.filter((team) =>
        team.members.some((member) => member.id === userId)
      ) as Array<TeamWithLastActivity>;

      if (fetchLastActivity) {
        const userTeamsDailies = dailies.filter((daily) =>
          userTeams.some((team) => team.id === daily.teamId)
        );
        const sorted = userTeamsDailies.sort(
          (a, b) =>
            splittedDateToMoment(b.year, b.month, b.day).unix() -
            splittedDateToMoment(a.year, a.month, a.day).unix()
        );

        for (const team of userTeams) {
          const teamEvents = sorted.filter((el) => el.teamId === team.id);
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
