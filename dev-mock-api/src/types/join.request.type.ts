import { BareTeam } from "./persisted.team.type";

export interface TeamJoinRequest {
  id: string;
  date: Date;
  team: BareTeam;
}
