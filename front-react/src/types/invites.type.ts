import BareTeam from "./team.type";
import { TerseUser } from "./user.type";

export interface TeamInvite {
  id: string;
  date: Date;
  team: BareTeam;
  referrer: TerseUser;
}

export interface TeamJoinRequest {
  id: string;
  date: Date;
  team: BareTeam;
}
