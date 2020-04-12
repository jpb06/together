import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getUsers } from "../../dbase/fetch.mock.db";
import { PersistedUser } from "../../types/persisted.user.type";
import { getOrCreateDaily } from "../../util/daily";
import { userToTerseUser } from "../../util/types.conversion.helpers";
import { updateDaily } from "../../dbase/update.mock.db";
import { mongoObjectId } from "../../util/objectid";

const mapAddSubject = (server: Application) => {
  server.post(
    "/api/daily/subjects/add",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isString().toDate(),
      body("type").isInt(),
      body("description").isString(),
    ],
    (req: Request, res: Response) => {
      let users = getUsers();

      const creator = users.find((el) => el.email === res.locals.email) as
        | PersistedUser
        | undefined;

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
      updateDaily(daily);

      return res.populate(subject);
    }
  );
};

export default mapAddSubject;
