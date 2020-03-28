import { BareTeam } from "./persisted.team.type";

export interface TeamJoinRequest {
  id: string;
  date: string;
  team: BareTeam;
}
