import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getOrCreateDaily } from "../../util/daily";
import { persistDaily } from "../../dbase/update.mock.db";

const mapRemoveFeeling = (server: Application) => {
  server.post(
    "/api/daily/feelings/remove",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isString().toDate(),
      body("id").isMongoId(),
    ],
    (req: Request, res: Response) => {
      const daily = getOrCreateDaily(req.body.teamId, req.body.date);
      daily.feelings = daily.feelings.filter((el) => el.id !== req.body.id);
      persistDaily(daily);

      return res.answer(200, "Feeling deleted");
    }
  );
};

export default mapRemoveFeeling;
