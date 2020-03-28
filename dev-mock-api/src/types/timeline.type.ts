import { BareTeam } from "./persisted.team.type";
import { TeamInvite, InvitedUser } from "./invite.type";
import { TeamJoinRequest } from "./join.request.type";
import Daily from "./daily.type";
import { UserJoinRequest, TeamMember, UserInvite } from "./persisted.user.type";
import { Moment } from "moment";

export enum TimeLineEntryType {
  Daily = "Daily",
  InviteToJoinCurrentTeam = "InviteToJoinCurrentTeam",
  JoinRequestToCurrentTeam = "JoinRequestToCurrentTeam",
  InvitationSentToCurrentUser = "InvitationSentToCurrentUser",
  JoinRequestSentByCurrentUser = "JoinRequestSentByCurrentUser",
  NewTeamMemberNotice = "NewTeamMemberNotice"
}

interface TimeLineEntry {
  type: TimeLineEntryType;
  shortTitle: string;
  date: Moment;
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
