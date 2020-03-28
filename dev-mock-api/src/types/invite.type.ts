import { BareTeam } from "./persisted.team.type";
import { TerseUser } from "./persisted.user.type";

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
