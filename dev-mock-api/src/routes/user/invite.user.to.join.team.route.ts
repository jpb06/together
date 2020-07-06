import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { persistUser, persistTeam } from "../../dbase/update.mock.db";
import {
  teamToBareTeam,
  userToTerseUser,
} from "../../util/types.conversion.helpers";
import * as moment from "moment";
import { getUsers, getTeams } from "../../dbase/fetch.mock.db";
import { mongoObjectId } from "../../util/objectid";

const mapInviteUserToJoinTeam = (server: Application) => {
  server.post(
    "/api/user/invite",
    isAuthenticated,
    [body("teamId").isMongoId(), body("email").isEmail()],
    (req: Request, res: Response) => {
      let users = getUsers();
      let teams = getTeams();

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

      const userHasRequestedToJoinTeam = team.joinRequests.find(
        (el) => el.user.id === invitee.id
      );
      if (userHasRequestedToJoinTeam)
        return res.answer(
          520,
          "This user has already requested to join the team"
        );

      const isInviteeAlreadyInTeam =
        team.invitedUsers.find((el) => el.invitee.id === invitee.id) ||
        team.members.find((el) => el.id === invitee.id);
      if (isInviteeAlreadyInTeam)
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
