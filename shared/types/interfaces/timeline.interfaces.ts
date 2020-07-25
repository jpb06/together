import {
  TeamInvite,
  TeamJoinRequest,
  UserJoinRequest,
  InvitedUser,
} from "./team.onboarding.interfaces";
import Daily from "./daily.interfaces";
import { BareTeam } from "./team.interfaces";
import { TimeLineEntryKind } from "../enums/timeline.entry.kind.enum";
import { TeamMember } from "./team.member.interface";

export type TimeLineEntryData =
  | Daily
  | UserJoinRequest
  | InvitedUser
  | TeamMember
  | TeamInvite
  | TeamJoinRequest;

interface TimeLineEntry {
  type: TimeLineEntryKind;
  shortTitle: string;
  date: string;
}

export interface TeamTimeLineEntry extends TimeLineEntry {
  entry: Daily | UserJoinRequest | InvitedUser | TeamMember;
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
