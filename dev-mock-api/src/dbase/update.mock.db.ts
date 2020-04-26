import * as path from "path";
import * as fs from "fs";
import { PersistedUser } from "../types/persisted.user.type";
import { PersistedTeam } from "../types/persisted.team.type";
import { getUsers, getTeams, getDailies } from "./fetch.mock.db";
import Daily from "../types/daily.type";

export function persist(
  users?: Array<PersistedUser>,
  teams?: Array<PersistedTeam>,
  dailies?: Array<Daily>
) {
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
}

export function persistUser(user: PersistedUser) {
  let alteredUsers: Array<PersistedUser> = getUsers();

  const persistedUser = alteredUsers.find((el) => el.id);
  if (persistedUser) {
    alteredUsers = alteredUsers.map((el) => (el.id === user.id ? user : el));
  } else {
    alteredUsers.push(user);
  }

  persist(alteredUsers);
}

export function persistTeam(team: PersistedTeam) {
  let alteredTeams: Array<PersistedTeam> = getTeams();

  const persistedTeam = alteredTeams.find((el) => el.id);
  if (persistedTeam) {
    alteredTeams = alteredTeams.map((el) => (el.id === team.id ? team : el));
  } else {
    alteredTeams.push(team);
  }

  persist(undefined, alteredTeams);
}

export function persistDaily(daily: Daily) {
  let alteredDailies: Array<Daily> = getDailies();

  const persistedDaily = alteredDailies.find((el) => el.id);
  if (persistedDaily) {
    alteredDailies = alteredDailies.map((el) =>
      el.id === daily.id ? daily : el
    );
  } else {
    alteredDailies.push(daily);
  }

  persist(undefined, undefined, alteredDailies);
}
