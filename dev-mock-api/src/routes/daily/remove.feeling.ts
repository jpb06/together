import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import { body } from "express-validator";

import { persistDaily } from "../../dbase/update.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { getOrCreateDaily } from "../../util/daily";

const mapRemoveFeeling = (server: Application) => {
  server.post(
    "/api/daily/feelings/remove",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isISO8601().toDate(),
      body("id").isMongoId(),
    ],
    (req: Request, res: Response) => {
      const daily = getOrCreateDaily(req.body.teamId, req.body.date);
      daily.feelings = daily.feelings.filter((el) => el.id !== req.body.id);
      persistDaily(daily);

      return res.answer(200, req.body.id);
    }
  );
};

export default mapRemoveFeeling;
