import { Application, Request } from "express";
import { body } from "express-validator";

import {
    userToTerseUser
} from "../../../../front-react/src/stack-shared-code/conversion-helpers/types.conversion.helpers";
import { getUsers } from "../../dbase/fetch.mock.db";
import { persistDaily } from "../../dbase/update.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";
import { getOrCreateDaily } from "../../util/daily";
import { mongoObjectId } from "../../util/objectid";

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
    (req: Request, res: ApiResponse) => {
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
