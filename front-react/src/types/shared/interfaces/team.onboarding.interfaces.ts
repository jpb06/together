import { BareTeam } from "./team.interfaces";
import { TerseUser } from "./user.interfaces";

// Requests from outsiders to join the team
export interface TeamJoinRequest {
  id: string;
  date: string;
  team: BareTeam;
}

export interface UserJoinRequest {
  id: string;
  date: string;
  user: TerseUser;
}

// Invites sent to outsiders by team members to join the team
export interface TeamInvite {
  id: string;
  date: string;
  team: BareTeam;
  referrer: TerseUser;
}

export interface InvitedUser {
  id: string;
  date: string;
  referrer: TerseUser;
  invitee: TerseUser;
}
