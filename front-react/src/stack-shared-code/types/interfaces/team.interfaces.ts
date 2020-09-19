import { TeamMember } from "./team.member.interface";
import { InvitedUser, UserJoinRequest } from "./team.onboarding.interfaces";

export interface BareTeam {
  id: string;
  name: string;
}

export interface Team extends BareTeam {
  members: Array<TeamMember>;
  invitedUsers: Array<InvitedUser>;
  joinRequests: Array<UserJoinRequest>;
}

export interface TeamWithLastActivity extends Team {
  lastActivity: string;
}
