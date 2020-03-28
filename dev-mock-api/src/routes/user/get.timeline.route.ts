import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getUsers, getTeams, getDailies } from "../../dbase/fetch.mock.db";
import { PersistedUser } from "../../types/persisted.user.type";
import TimeLine, { TeamTimeLine } from "../../types/timeline.type";
import {
  teamInviteToUserTimeLineEntry,
  teamJoinRequestToUserTimeLineEntry,
  invitedUserToTeamTimeLineEntry,
  userJoinRequestToTeamTimeLineEntry,
  dailyToTeamTimeLineEntry,
  teamMemberToTeamTimeLineEntry
} from "../../util/types.conversion.helpers";

const mapGetUserTimeline = (server: Application) => {
  server.post(
    "/api/user/timeline",
    isAuthenticated,
    [
      body("teamId")
        .isHexadecimal()
        .isLength({ min: 24, max: 24 })
    ],
    (req: Request, res: Response) => {
      const users = getUsers();
      const teams = getTeams();

      const user = users.find(el => el.email === res.locals.email) as
        | PersistedUser
        | undefined;
      if (!user) {
        return res.answer(520, "Unable to get the current user");
      }

      let timeline: TimeLine = {
        userEvents: []
      };

      // Invitations sent to the caller
      const userTeamInvites = user.teamInvites.map(invite =>
        teamInviteToUserTimeLineEntry(invite)
      );
      // Requests to join a team sent by the caller
      const userJoinRequests = user.teamJoinRequests.map(request =>
        teamJoinRequestToUserTimeLineEntry(request)
      );

      timeline.userEvents = timeline.userEvents
        .concat(userTeamInvites)
        .concat(userJoinRequests)
        .sort((a, b) => b.date.unix() - a.date.unix());

      const team = teams.find(el => el.id === req.body.teamId);
      if (team) {
        const teamTimeLine: TeamTimeLine = {
          id: team.id,
          name: team.name,
          events: []
        };

        // invitations sent by team members to outsiders
        const teamInvites = team.invitedUsers.map(invite =>
          invitedUserToTeamTimeLineEntry(invite)
        );
        // Requests by outsiders to join the team
        const teamJoinRequests = team.joinRequests.map(request =>
          userJoinRequestToTeamTimeLineEntry(request)
        );

        const teamDailies = getDailies().filter(el => el.teamId === team.id);

        teamTimeLine.events = teamTimeLine.events
          .concat(teamInvites)
          .concat(teamJoinRequests)
          // daily entries
          .concat(teamDailies.map(daily => dailyToTeamTimeLineEntry(daily)))
          .concat(team.members.map(user => teamMemberToTeamTimeLineEntry(user)))
          .sort((a, b) => b.date.unix() - a.date.unix());

        timeline.currentTeam = teamTimeLine;
      }

      res.populate(timeline);
    }
  );
};

export default mapGetUserTimeline;
