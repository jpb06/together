import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import { body } from "express-validator";

import { getUsers } from "../../dbase/fetch.mock.db";
import { persistDaily } from "../../dbase/update.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { getOrCreateDaily } from "../../util/daily";
import { mongoObjectId } from "../../util/objectid";
import { userToTerseUser } from "../../util/types.conversion.helpers";

const mapAddFeeling = (server: Application) => {
  server.post(
    "/api/daily/feelings/add",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isISO8601().toDate(),
      body("type").isInt(),
      body("comment").isString(),
    ],
    (req: Request, res: Response) => {
      const users = getUsers();

      const creator = users.find((el) => el.email === res.locals.email);
      if (!creator) {
        return res.answer(500, "Unable to retrieve feeling creator");
      }

      const daily = getOrCreateDaily(req.body.teamId, req.body.date);
      const feeling = {
        id: mongoObjectId(),
        type: req.body.type,
        comment: req.body.comment,
        creator: userToTerseUser(creator),
      };
      daily.feelings.push(feeling);
      persistDaily(daily);

      return res.populate(feeling);
    }
  );
};

export default mapAddFeeling;
