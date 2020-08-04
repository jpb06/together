import { Daily, PersistedUser as User, Team } from "../../../front-react/src/types/shared";

export default interface Database {
  users: Array<User>;
  teams: Array<Team>;
  dailies: Array<Daily>;
}
