import BareTeam from "./team.type";
import { TeamJoinRequest, TeamInvite } from "./invites.type";

export default interface User {
  token: string;
  expirationDate: string;
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  avatarName: string;
  teams: Array<BareTeam>;
  teamInvites: Array<TeamInvite>;
  teamJoinRequests: Array<TeamJoinRequest>;
  // computed client side
  fullName: string;
  initials: string;
}

export interface TerseUser {
  id: string;
  lastName: string;
  firstName: string;
  avatarName: string;
  email: string;
  // computed client side
  fullName?: string;
  initials?: string;
}

export interface TeamMember extends TerseUser {
  status: string;
  joinDate: Date;
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
