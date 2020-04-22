import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import getTeamFromInvite from "../../middleware/get.team.from.invite";
import { persistUser, persistTeam } from "../../dbase/update.mock.db";
import { PersistedUser } from "../../types/persisted.user.type";
import { PersistedTeam } from "../../types/persisted.team.type";
import {
  teamToBareTeam,
  userToTerseUser,
} from "../../util/types.conversion.helpers";
import * as moment from "moment";
import { TeamInvite } from "../../types/invite.type";

const mapAcceptTeamInvite = (server: Application) => {
  server.post(
    "/api/user/acceptTeamInvite",
    isAuthenticated,
    [body("inviteId").isMongoId()],
    getTeamFromInvite,
    (req: Request, res: Response) => {
      const user: PersistedUser = res.locals.user;
      const team: PersistedTeam = res.locals.team;
      const invite: TeamInvite = res.locals.invite;

      // removing the invite from both targeted user and team
      user.teamInvites = user.teamInvites.filter((el) => invite.id !== el.id);
      team.invitedUsers = team.invitedUsers.filter((el) => el.id !== invite.id);

      // adding targeted user to the team
      user.teams.push(teamToBareTeam(team));
      team.members.push({
        status: "member",
        ...userToTerseUser(user),
        joinDate: moment().toISOString(),
      });

      persistUser(user);
      persistTeam(team);

      return res.answer(200, "Added to team");
    }
  );
};

export default mapAcceptTeamInvite;
