import * as fs from "fs";
import * as path from "path";

import { users, teams, dailies } from "./data/mock.data";

const data = JSON.stringify({ users, teams, dailies });
const filepath = path.join(__dirname, "data", "db.json");

fs.writeFile(filepath, data, err => {
  err ? console.log(err) : console.log("Mock DB created.");
});
