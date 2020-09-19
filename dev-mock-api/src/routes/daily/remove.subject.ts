import { Application, Request } from "express";
import { body } from "express-validator";

import { persistDaily } from "../../dbase/update.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";
import { getOrCreateDaily } from "../../util/daily";

const mapRemoveSubject = (server: Application) => {
  server.post(
    "/api/daily/subjects/remove",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isISO8601().toDate(),
      body("id").isMongoId(),
    ],
    (req: Request, res: ApiResponse) => {
      const daily = getOrCreateDaily(req.body.teamId, req.body.date);
      daily.subjects = daily.subjects.filter((el) => el.id !== req.body.id);
      persistDaily(daily);

      return res.answer(200, req.body.id);
    }
  );
};

export default mapRemoveSubject;
