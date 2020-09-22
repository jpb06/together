import {
    Daily, PersistedUser as User, Team
} from "../../../front-react/src/stack-shared-code/types";

export default interface Database {
  users: Array<User>;
  teams: Array<Team>;
  dailies: Array<Daily>;
}
