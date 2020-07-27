import { Daily, PersistedUser as User, Team } from "../../../shared/types";

export default interface Database {
  users: Array<User>;
  teams: Array<Team>;
  dailies: Array<Daily>;
}
