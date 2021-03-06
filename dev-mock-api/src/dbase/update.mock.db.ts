import fs from "fs";
import path from "path";

import {
    Daily, PersistedUser as User, Team
} from "../../../front-react/src/stack-shared-code/types";
import { getDailies, getTeams, getUsers } from "./fetch.mock.db";

export const persist = (
  users?: Array<User>,
  teams?: Array<Team>,
  dailies?: Array<Daily>
) => {
  const persistedUsers = users || getUsers();
  const persistedTeams = teams || getTeams();
  const persistedDailies = dailies || getDailies();

  const data = JSON.stringify({
    persistedUsers,
    persistedTeams,
    persistedDailies,
  });
  const filepath = path.join(__dirname, "data", "db.json");

  const updatedData: Array<string> = [];
  if (users) updatedData.push("Users");
  if (teams) updatedData.push("Teams");
  if (dailies) updatedData.push("Dailies");

  fs.writeFile(filepath, data, (err) => {
    err
      ? console.log("err", err)
      : console.log(`Mock DB updated : (${updatedData.join(", ")}).`);
  });
};

export const persistUser = (user: User) => {
  let alteredUsers: Array<User> = getUsers();

  const persistedUser = alteredUsers.find((el) => el.id === user.id);
  if (persistedUser) {
    alteredUsers = alteredUsers.map((el) => (el.id === user.id ? user : el));
  } else {
    alteredUsers.push(user);
  }

  persist(alteredUsers);
};

export const persistTeam = (team: Team) => {
  let alteredTeams: Array<Team> = getTeams();

  const persistedTeam = alteredTeams.find((el) => el.id === team.id);
  if (persistedTeam) {
    alteredTeams = alteredTeams.map((el) => (el.id === team.id ? team : el));
  } else {
    alteredTeams.push(team);
  }

  persist(undefined, alteredTeams);
};

export const persistDaily = (daily: Daily) => {
  let alteredDailies: Array<Daily> = getDailies();

  const persistedDaily = alteredDailies.find((el) => el.id === daily.id);
  if (persistedDaily) {
    alteredDailies = alteredDailies.map((el) =>
      el.id === daily.id ? daily : el
    );
  } else {
    alteredDailies.push(daily);
  }

  persist(undefined, undefined, alteredDailies);
};
