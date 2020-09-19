import { Application, Request } from "express";
import { body } from "express-validator";
import moment from "moment";

import {
    dailyToTeamTimeLineEntry, invitedUserToTeamTimeLineEntry, teamInviteToUserTimeLineEntry,
    teamJoinRequestToUserTimeLineEntry, teamMemberToTeamTimeLineEntry,
    userJoinRequestToTeamTimeLineEntry
} from "../../../../front-react/src/stack-shared-code/conversion-helpers/types.conversion.helpers";
import { TeamTimeLine, TimeLine } from "../../../../front-react/src/stack-shared-code/types";
import { getDailies, getTeams, getUsers } from "../../dbase/fetch.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";

const mapGetUserTimeline = (server: Application) => {
  server.post(
    "/api/user/timeline",
    isAuthenticated,
    [body("teamId").isMongoId()],
    (req: Request, res: ApiResponse) => {
      const users = getUsers();
      const teams = getTeams();

      const user = users.find((el) => el.email === res.locals.email);
      if (!user) {
        return res.answer(520, "Unable to get the current user");
      }

      // Invitations sent to the caller
      const userTeamInvites = user.teamInvites.map((invite) =>
        teamInviteToUserTimeLineEntry(invite)
      );
      // Requests to join a team sent by the caller
      const userJoinRequests = user.teamJoinRequests.map((request) =>
        teamJoinRequestToUserTimeLineEntry(request)
      );

      const timeline: TimeLine = {
        userEvents: userTeamInvites
          .concat(userJoinRequests)
          .sort(
            (a, b) =>
              moment(b.date, moment.ISO_8601).unix() -
              moment(a.date, moment.ISO_8601).unix()
          ),
      };

      const team = teams.find((el) => el.id === req.body.teamId);
      if (team) {
        const teamTimeLine: TeamTimeLine = {
          id: team.id,
          name: team.name,
          events: [],
        };

        // invitations sent by team members to outsiders
        const teamInvites = team.invitedUsers.map((invite) =>
          invitedUserToTeamTimeLineEntry(invite)
        );
        // Requests by outsiders to join the team
        const teamJoinRequests = team.joinRequests.map((request) =>
          userJoinRequestToTeamTimeLineEntry(request)
        );

        const teamDailies = getDailies().filter((el) => el.teamId === team.id);

        teamTimeLine.events = teamTimeLine.events
          .concat(teamInvites)
          .concat(teamJoinRequests)
          // daily entries
          .concat(teamDailies.map((daily) => dailyToTeamTimeLineEntry(daily)))
          .concat(
            team.members.map((user) => teamMemberToTeamTimeLineEntry(user))
          )
          .sort(
            (a, b) =>
              moment(b.date, moment.ISO_8601).unix() -
              moment(a.date, moment.ISO_8601).unix()
          );

        timeline.currentTeam = teamTimeLine;
      }

      res.populate(timeline);
    }
  );
};

export default mapGetUserTimeline;
