import { PersistedUser } from "./persisted.user.type";
import { PersistedTeam } from "./persisted.team.type";
import Daily from "./daily.type";

export default interface Database {
  users: Array<PersistedUser>;
  teams: Array<PersistedTeam>;
  dailies: Array<Daily>;
}
