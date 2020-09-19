import { Application, Request } from "express";
import { body } from "express-validator";
import moment from "moment";

import {
    teamToBareTeam, userToTerseUser
} from "../../../../front-react/src/stack-shared-code/conversion-helpers/types.conversion.helpers";
import { Team } from "../../../../front-react/src/stack-shared-code/types";
import { getTeams, getUsers } from "../../dbase/fetch.mock.db";
import { persistTeam, persistUser } from "../../dbase/update.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";
import { mongoObjectId } from "../../util/objectid";

const hasUserRequestedToJoinTeam = (team: Team, inviteeId: string) =>
  team.joinRequests.find((el) => el.user.id === inviteeId) !== undefined;

const isInviteeAlreadyInTeam = (team: Team, inviteeId: string) =>
  team.invitedUsers.find((el) => el.invitee.id === inviteeId) !== undefined ||
  team.members.find((el) => el.id === inviteeId) !== undefined;

const mapInviteUserToJoinTeam = (server: Application) => {
  server.post(
    "/api/user/invite",
    isAuthenticated,
    [body("teamId").isMongoId(), body("email").isEmail()],
    (req: Request, res: ApiResponse) => {
      const users = getUsers();
      const teams = getTeams();

      const referrer = users.find((el) => el.email === res.locals.email);
      if (!referrer)
        return res.answer(520, "Unable to get the invite referrer user");
      const invitee = users.find((el) => el.email === req.body.email);
      if (!invitee)
        return res.answer(
          520,
          "We could not find any user matching this email. Mind checking again the address for any typo?"
        );
      const team = teams.find((el) => el.id === req.body.teamId);
      if (!team) return res.answer(520, "Unable to locate the selected team");

      if (hasUserRequestedToJoinTeam(team, invitee.id))
        return res.answer(
          520,
          "This user has already requested to join the team"
        );
      if (isInviteeAlreadyInTeam(team, invitee.id))
        return res.answer(520, "This user has already been added to the team");

      const requestId = mongoObjectId();
      const requestDate = moment().toDate();
      const terseReferrer = userToTerseUser(referrer);
      const terseInvitee = userToTerseUser(invitee);

      team.invitedUsers.push({
        id: requestId,
        date: requestDate.toISOString(),
        referrer: terseReferrer,
        invitee: terseInvitee,
      });
      invitee.teamInvites.push({
        id: requestId,
        date: requestDate.toISOString(),
        referrer: terseReferrer,
        team: teamToBareTeam(team),
      });

      persistUser(invitee);
      persistTeam(team);

      return res.populate(terseInvitee);
    }
  );
};

export default mapInviteUserToJoinTeam;
