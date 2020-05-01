import { Request, Response } from "express-serve-static-core";
import { Application } from "express";
import { validationResult, body } from "express-validator";
import { getUsers } from "../../dbase/fetch.mock.db";
import { mongoObjectId } from "../../util/objectid";
import { persist } from "../../dbase/update.mock.db";

const mapCreateUserRoute = (server: Application) => {
  server.post(
    "/api/user/create",
    [
      body("firstName").isString().notEmpty(),
      body("lastName").isString().notEmpty(),
      body("email").isEmail(),
      body("password").isString().notEmpty(),
    ],
    (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ status: 400, error: errors.array() });

      const users = getUsers();

      const user = users.find((el) => el.email === req.body.email);
      if (user)
        return res
          .status(401)
          .json({ status: 401, error: "Mail already used" });

      const newUser = {
        id: mongoObjectId(),
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatarName: "",
        teams: [],
        teamInvites: [],
        teamJoinRequests: [],
      };

      users.push(newUser);
      persist(users);

      return res.populate({
        id: newUser.id,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatarName: "",
      });
    }
  );
};

export default mapCreateUserRoute;
