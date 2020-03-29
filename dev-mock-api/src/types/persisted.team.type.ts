import { TeamMember, UserInvite, UserJoinRequest } from "./persisted.user.type";

export interface BareTeam {
  id: string;
  name: string;
}

export interface PersistedTeam extends BareTeam {
  members: Array<TeamMember>;
  invitedUsers: Array<UserInvite>;
  joinRequests: Array<UserJoinRequest>;
}

export interface TeamWithLastActivity extends PersistedTeam {
  lastActivity: string;
}
