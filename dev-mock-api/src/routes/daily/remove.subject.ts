import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getOrCreateDaily } from "../../util/daily";
import { updateDaily } from "../../dbase/update.mock.db";

const mapRemoveSubject = (server: Application) => {
  server.post(
    "/api/daily/subjects/remove",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isString().toDate(),
      body("id").isMongoId(),
    ],
    (req: Request, res: Response) => {
      const daily = getOrCreateDaily(req.body.teamId, req.body.date);
      daily.subjects = daily.subjects.filter((el) => el.id !== req.body.id);
      updateDaily(daily);

      return res.answer(200, "Subject deleted");
    }
  );
};

export default mapRemoveSubject;
