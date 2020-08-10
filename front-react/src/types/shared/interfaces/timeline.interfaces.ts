import { TimeLineEntryKind } from "../enums/timeline.entry.kind.enum";
import { Daily } from "./daily.interfaces";
import { BareTeam } from "./team.interfaces";
import { TeamMember } from "./team.member.interface";
import {
    InvitedUser, TeamInvite, TeamJoinRequest, UserJoinRequest
} from "./team.onboarding.interfaces";

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

export interface TimeLine {
  currentTeam?: TeamTimeLine;
  userEvents: Array<UserTimeLineEntry>;
}
