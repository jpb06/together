import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import getTeamFromInvite from "../../middleware/get.team.from.invite";
import { persistUser, persistTeam } from "../../dbase/update.mock.db";
import { PersistedUser as User } from "../../../../shared/types/interfaces/user.interfaces";
import { Team } from "../../../../shared/types/interfaces/team.interfaces";
import { TeamInvite } from "../../../../shared/types/interfaces/team.onboarding.interfaces";

const mapDeclineTeamInvite = (server: Application) => {
  server.post(
    "/api/user/declineTeamInvite",
    isAuthenticated,
    [body("inviteId").isMongoId()],
    getTeamFromInvite,
    (req: Request, res: Response) => {
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
