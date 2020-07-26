import * as moment from "moment";
import {
  Team,
  BareTeam,
} from "../../../shared/types/interfaces/team.interfaces";
import {
  PersistedUser,
  TerseUser,
} from "../../../shared/types/interfaces/user.interfaces";
import { TeamMember } from "../../../shared/types/interfaces/team.member.interface";
import {
  UserJoinRequest,
  InvitedUser,
  TeamInvite,
  TeamJoinRequest,
} from "../../../shared/types/interfaces/team.onboarding.interfaces";
import {
  UserTimeLineEntry,
  TeamTimeLineEntry,
} from "../../../shared/types/interfaces/timeline.interfaces";
import { TimeLineEntryKind } from "../../../shared/types/enums/timeline.entry.kind.enum";
import Daily from "../../../shared/types/interfaces/daily.interfaces";
import { splittedDateToString, splittedDateToMoment } from "./dates";

export const teamToBareTeam = (team: Team): BareTeam => ({
  id: team.id,
  name: team.name,
});

export const userToTerseUser = (user: PersistedUser): TerseUser => ({
  id: user.id,
  lastName: user.lastName,
  firstName: user.firstName,
  avatarName: user.avatarName,
  email: user.email,
});

export const teamInviteToUserTimeLineEntry = (
  invite: TeamInvite
): UserTimeLineEntry => ({
  type: TimeLineEntryKind.InvitationSentToCurrentUser,
  entry: invite,
  shortTitle: `Invitation - ${moment(invite.date).format("DD/MM/YYYY")}`,
  date: invite.date,
});

export const teamJoinRequestToUserTimeLineEntry = (
  joinRequest: TeamJoinRequest
): UserTimeLineEntry => ({
  type: TimeLineEntryKind.JoinRequestSentByCurrentUser,
  entry: joinRequest,
  shortTitle: `Join request - ${moment(joinRequest.date).format("DD/MM/YYYY")}`,
  date: joinRequest.date,
});

export const invitedUserToTeamTimeLineEntry = (
  invitedUser: InvitedUser
): TeamTimeLineEntry => ({
  type: TimeLineEntryKind.InviteToJoinCurrentTeam,
  entry: invitedUser,
  shortTitle: `Invite - ${moment(invitedUser.date).format("DD/MM/YYYY")}`,
  date: invitedUser.date,
});

export const userJoinRequestToTeamTimeLineEntry = (
  joinRequest: UserJoinRequest
): TeamTimeLineEntry => ({
  type: TimeLineEntryKind.JoinRequestToCurrentTeam,
  entry: joinRequest,
  shortTitle: `Join request - ${moment(joinRequest.date).format("DD/MM/YYYY")}`,
  date: joinRequest.date,
});

export const dailyToTeamTimeLineEntry = (daily: Daily): TeamTimeLineEntry => ({
  type: TimeLineEntryKind.Daily,
  entry: daily,
  shortTitle: `Daily - ${splittedDateToString(
    daily.year,
    daily.month,
    daily.day
  )}`,
  date: splittedDateToString(daily.year, daily.month, daily.day),
});

export const teamMemberToTeamTimeLineEntry = (
  user: TeamMember
): TeamTimeLineEntry => ({
  type: TimeLineEntryKind.NewTeamMemberNotice,
  shortTitle:
    user.status === "creator"
      ? `The adventure begins - ${moment(user.joinDate).format("DD/MM/YYYY")}`
      : `New member - ${moment(user.joinDate).format("DD/MM/YYYY")}`,
  date: user.joinDate,
  entry: user,
});
