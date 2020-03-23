import * as fs from "fs";
import * as path from "path";

import { users } from "./mock-data";

const data = JSON.stringify({ users });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function(err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
