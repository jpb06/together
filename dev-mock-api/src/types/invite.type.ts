import { BareTeam } from "./persisted.team.type";
import { TerseUser } from "./persisted.user.type";

export interface TeamInvite {
  id: string;
  date: Date;
  team: BareTeam;
  referrer: TerseUser;
}

export interface InvitedUser {
  id: string;
  date: Date;
  referrer: TerseUser;
  invitee: TerseUser;
}
