import { BareTeam } from "./team.interfaces";
import { TeamInvite, TeamJoinRequest } from "./team.onboarding.interfaces";

export interface NewUser {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

export interface PersistedUser extends TerseUser {
  password: string;
  teams: Array<BareTeam>;
  teamInvites: Array<TeamInvite>;
  teamJoinRequests: Array<TeamJoinRequest>;
}

export interface LoggedUser extends TerseUser {
  teams: Array<BareTeam>;
  teamInvites: Array<TeamInvite>;
  teamJoinRequests: Array<TeamJoinRequest>;
}

export interface User extends LoggedUser {
  // computed client side
  fullName: string;
  initials: string;
}
