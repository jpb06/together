import { PersistedUser as User } from "../../../shared/types/interfaces/user.interfaces";
import { Team } from "../../../shared/types/interfaces/team.interfaces";
import Daily from "../../../shared/types/interfaces/daily.interfaces";

export default interface Database {
  users: Array<User>;
  teams: Array<Team>;
  dailies: Array<Daily>;
}
