import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getOrCreateDaily } from "../../util/daily";
import { persistDaily } from "../../dbase/update.mock.db";

const mapSetDailyDuration = (server: Application) => {
  server.post(
    "/api/daily/setDuration",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isString().toDate(),
      body("duration").isString().isIn(["0-15", "15-20", "20-30", "20+"]),
    ],
    (req: Request, res: Response) => {
      let daily = getOrCreateDaily(req.body.teamId, req.body.date);
      daily.durationIndicator = req.body.duration;

      persistDaily(daily);

      return res.answer(200, `Duration set for ${req.body.date}`);
    }
  );
};

export default mapSetDailyDuration;
