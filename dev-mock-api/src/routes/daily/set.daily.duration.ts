import { Application, Request } from "express";
import { body } from "express-validator";

import { persistDaily } from "../../dbase/update.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";
import { getOrCreateDaily } from "../../util/daily";

const mapSetDailyDuration = (server: Application) => {
  server.post(
    "/api/daily/setDuration",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isISO8601().toDate(),
      body("duration").isString().isIn(["0-15", "15-20", "20-30", "20+"]),
    ],
    (req: Request, res: ApiResponse) => {
      const daily = getOrCreateDaily(req.body.teamId, req.body.date);
      daily.durationIndicator = req.body.duration;

      persistDaily(daily);

      return res.answer(200, daily.durationIndicator);
    }
  );
};

export default mapSetDailyDuration;
