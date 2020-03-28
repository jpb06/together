import { Application } from "express";
import { Request, Response } from "express-serve-static-core";

const mapGetUserTeams = (server: Application) => {
  server.post("/api/user/teams", (req: Request, res: Response) => {});
};

export default mapGetUserTeams;
