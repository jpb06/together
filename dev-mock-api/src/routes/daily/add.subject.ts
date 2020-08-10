import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getUsers } from "../../dbase/fetch.mock.db";
import { getOrCreateDaily } from "../../util/daily";
import { userToTerseUser } from "../../util/types.conversion.helpers";
import { persistDaily } from "../../dbase/update.mock.db";
import { mongoObjectId } from "../../util/objectid";

const mapAddSubject = (server: Application) => {
  server.post(
    "/api/daily/subjects/add",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isISO8601().toDate(),
      body("type").isInt(),
      body("description").isString(),
    ],
    (req: Request, res: Response) => {
      const users = getUsers();

      const creator = users.find((el) => el.email === res.locals.email);
      if (!creator) {
        return res.answer(500, "Unable to retrieve subject creator");
      }

      const daily = getOrCreateDaily(req.body.teamId, req.body.date);
      const subject = {
        id: mongoObjectId(),
        type: req.body.type,
        description: req.body.description,
        creator: userToTerseUser(creator),
      };
      daily.subjects.push(subject);
      persistDaily(daily);

      return res.populate(subject);
    }
  );
};

export default mapAddSubject;
