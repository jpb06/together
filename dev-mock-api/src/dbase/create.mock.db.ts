import fs from "fs";
import path from "path";

import { dailies } from "./data/dailies.mock.data";
import { teams } from "./data/teams.mock.data";
import { users } from "./data/users.mock.data";

const data = JSON.stringify({ users, teams, dailies });
const filepath = path.join(__dirname, "data", "db.json");

fs.writeFile(filepath, data, (err: any) => {
  err ? console.log(err) : console.log("Mock DB created.");
});
