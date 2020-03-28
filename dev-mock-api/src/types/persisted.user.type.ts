import { BareTeam } from "./persisted.team.type";
import { TeamInvite } from "./invite.type";
import { TeamJoinRequest } from "./join.request.type";

export interface TerseUser {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  avatarName: string;
}

export interface TeamMember extends TerseUser {
  status: string;
  joinDate: string;
}

export interface UserInvite {
  id: string;
  date: Date;
  referrer: TerseUser;
  invitee: TerseUser;
}

export interface UserJoinRequest {
  id: string;
  date: Date;
  user: TerseUser;
}

export interface PersistedUser extends TerseUser {
  password: string;
  teams: Array<BareTeam>;
  teamInvites: Array<TeamInvite>;
  teamJoinRequests: Array<TeamJoinRequest>;
}
