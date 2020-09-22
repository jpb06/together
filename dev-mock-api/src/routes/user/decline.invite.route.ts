import { Application, Request } from "express";
import { body } from "express-validator";

import {
    PersistedUser as User, Team, TeamInvite
} from "../../../../front-react/src/stack-shared-code/types";
import { persistTeam, persistUser } from "../../dbase/update.mock.db";
import getTeamFromInvite from "../../middleware/get.team.from.invite";
import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";

const mapDeclineTeamInvite = (server: Application) => {
  server.post(
    "/api/user/declineTeamInvite",
    isAuthenticated,
    [body("inviteId").isMongoId()],
    getTeamFromInvite,
    (req: Request, res: ApiResponse) => {
      const user: User = res.locals.user;
      const team: Team = res.locals.team;
      const invite: TeamInvite = res.locals.invite;

      // removing the invite from both targeted user and team
      user.teamInvites = user.teamInvites.filter((el) => invite.id !== el.id);
      team.invitedUsers = team.invitedUsers.filter((el) => el.id !== invite.id);

      persistUser(res.locals.user);
      persistTeam(res.locals.team);

      return res.answer(200, "Invite declined");
    }
  );
};

export default mapDeclineTeamInvite;
