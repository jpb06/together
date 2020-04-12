import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getOrCreateDaily } from "../../util/daily";

const mapGetDaily = (server: Application) => {
  server.post(
    "/api/daily",
    isAuthenticated,
    [body("teamId").isMongoId(), body("date").isString().toDate()],
    (req: Request, res: Response) => {
      const daily = getOrCreateDaily(req.body.teamId, req.body.date);

      return res.populate(daily);
    }
  );
};

export default mapGetDaily;
