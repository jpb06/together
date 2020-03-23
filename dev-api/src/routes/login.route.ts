import * as mockData from "../db/mock-data";
import { Request, Response } from "express-serve-static-core";
import { Application } from "express";
import { generateRandom } from "./../util/strings";
import { nowPlusMinutes } from "./../util/dates";

const mapLoginRoute = (server: Application) => {
  server.post("/api/login", (req: Request, res: Response) => {
    if (!req.body.login || !req.body.password)
      return res
        .status(400)
        .json({ status: 400, error: "Expecting identifiers" });

    const { users } = mockData;

    const user = users.find(el => el.email === req.body.login);
    if (!user)
      return res.status(401).json({ status: 401, error: "Not authorized" });

    if (user.password !== req.body.password)
      return res.status(401).json({ status: 401, error: "Not authorized" });

    const sessionExpirationDate = nowPlusMinutes(20);
    const token = generateRandom();

    return res.status(200).json({
      status: 200,
      token: token,
      user: {
        id: user.id,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        avatarName: user.avatarName,
        teams: user.teams,
        teamInvites: user.teamInvites,
        teamJoinRequests: user.teamJoinRequests
      },
      expirationDate: sessionExpirationDate.toISOString()
    });
  });
};

export default mapLoginRoute;
