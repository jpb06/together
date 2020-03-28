import { TeamMember, UserInvite, UserJoinRequest } from "./user.type";

export default interface BareTeam {
  id: string;
  name: string;
}

export interface Team extends BareTeam {
  members: Array<TeamMember>;
  invitedUsers: Array<UserInvite>;
  joinRequests: Array<UserJoinRequest>;
}

export interface TeamWithLastActivity extends Team {
  lastActivity: string;
}
