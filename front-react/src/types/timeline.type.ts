import { TeamInvite, TeamJoinRequest } from "./invites.type";
import { UserInvite, TeamMember, UserJoinRequest } from "./user.type";
import Daily from "./daily.type";

import BareTeam from "./team.type";

export enum TimeLineEntryType {
  Daily = "Daily",
  InviteToJoinCurrentTeam = "InviteToJoinCurrentTeam",
  JoinRequestToCurrentTeam = "JoinRequestToCurrentTeam",
  InvitationSentToCurrentUser = "InvitationSentToCurrentUser",
  JoinRequestSentByCurrentUser = "JoinRequestSentByCurrentUser",
  NewTeamMemberNotice = "NewTeamMemberNotice"
}

export type TimeLineEntryData =
  | Daily
  | UserJoinRequest
  | UserInvite
  | TeamMember
  | TeamInvite
  | TeamJoinRequest;

interface TimeLineEntry {
  type: TimeLineEntryType;
  shortTitle: string;
  date: Date;
}

export interface TeamTimeLineEntry extends TimeLineEntry {
  entry: Daily | UserJoinRequest | UserInvite | TeamMember;
}

export interface UserTimeLineEntry extends TimeLineEntry {
  entry: TeamInvite | TeamJoinRequest;
}

export interface TeamTimeLine extends BareTeam {
  events: Array<TeamTimeLineEntry>;
}

export default interface TimeLine {
  currentTeam?: TeamTimeLine;
  userEvents: Array<UserTimeLineEntry>;
}
