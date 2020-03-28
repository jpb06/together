import { PersistedTeam, BareTeam } from "../types/persisted.team.type";
import {
  PersistedUser,
  TerseUser,
  UserJoinRequest,
  UserInvite,
  TeamMember
} from "../types/persisted.user.type";
import { TeamInvite } from "../types/invite.type";
import {
  UserTimeLineEntry,
  TimeLineEntryType,
  TeamTimeLineEntry
} from "../types/timeline.type";
import * as moment from "moment";
import { TeamJoinRequest } from "../types/join.request.type";
import Daily from "../types/daily.type";
import { splittedDateToString, splittedDateToMoment } from "./dates";

export function teamToBareTeam(team: PersistedTeam): BareTeam {
  return {
    id: team.id,
    name: team.name
  };
}

export function userToTerseUser(user: PersistedUser): TerseUser {
  return {
    id: user.id,
    lastName: user.lastName,
    firstName: user.firstName,
    avatarName: user.avatarName,
    email: user.email
  };
}

export function teamInviteToUserTimeLineEntry(
  invite: TeamInvite
): UserTimeLineEntry {
  return {
    type: TimeLineEntryType.InvitationSentToCurrentUser,
    entry: invite,
    shortTitle: `Invitation - ${moment(invite.date).format("DD/MM/YYYY")}`,
    date: moment(invite.date)
  };
}

export function teamJoinRequestToUserTimeLineEntry(
  joinRequest: TeamJoinRequest
): UserTimeLineEntry {
  return {
    type: TimeLineEntryType.JoinRequestSentByCurrentUser,
    entry: joinRequest,
    shortTitle: `Join request - ${moment(joinRequest.date).format(
      "DD/MM/YYYY"
    )}`,
    date: moment(joinRequest.date)
  };
}

export function invitedUserToTeamTimeLineEntry(
  invitedUser: UserInvite
): TeamTimeLineEntry {
  return {
    type: TimeLineEntryType.InviteToJoinCurrentTeam,
    entry: invitedUser,
    shortTitle: `Invite - ${moment(invitedUser.date).format("DD/MM/YYYY")}`,
    date: moment(invitedUser.date)
  };
}

export function userJoinRequestToTeamTimeLineEntry(
  joinRequest: UserJoinRequest
): TeamTimeLineEntry {
  return {
    type: TimeLineEntryType.JoinRequestToCurrentTeam,
    entry: joinRequest,
    shortTitle: `Join request - ${moment(joinRequest.date).format(
      "DD/MM/YYYY"
    )}`,
    date: moment(joinRequest.date)
  };
}

export function dailyToTeamTimeLineEntry(daily: Daily): TeamTimeLineEntry {
  return {
    type: TimeLineEntryType.Daily,
    entry: daily,
    shortTitle: `Daily - ${splittedDateToString(
      daily.year,
      daily.month,
      daily.day
    )}`,
    date: splittedDateToMoment(daily.year, daily.month, daily.day)
  };
}

export function teamMemberToTeamTimeLineEntry(
  user: TeamMember
): TeamTimeLineEntry {
  return {
    type: TimeLineEntryType.NewTeamMemberNotice,
    shortTitle:
      user.status === "creator"
        ? `The adventure begins - ${moment(user.joinDate).format("DD/MM/YYYY")}`
        : `New member - ${moment(user.joinDate).format("DD/MM/YYYY")}`,
    date: moment(user.joinDate),
    entry: user
  };
}
