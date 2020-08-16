import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import { body, validationResult } from "express-validator";

import { getUsers } from "../../dbase/fetch.mock.db";
import { nowPlusMinutes } from "../../util/dates";

const mapLoginRoute = (server: Application) => {
  server.post(
    "/api/login",
    [body("login").isEmail(), body("password").isString().notEmpty()],
    (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ status: 400, error: errors.array() });

      const users = getUsers();

      const user = users.find((el) => el.email === req.body.login);
      if (!user || user.password !== req.body.password)
        return res.status(401).json({ status: 401, error: "Not authorized" });

      const sessionExpirationDate = nowPlusMinutes(20);
      const token = user.email;

      return res.populate({
        token: token,
        user: {
          id: user.id,
          email: user.email,
          lastName: user.lastName,
          firstName: user.firstName,
          avatarName: user.avatarName,
          teams: user.teams,
          teamInvites: user.teamInvites,
          teamJoinRequests: user.teamJoinRequests,
        },
        expirationDate: sessionExpirationDate.toISOString(),
      });
    }
  );
};

export default mapLoginRoute;
