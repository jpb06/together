import { Application, Request } from "express";
import { body } from "express-validator";

import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";
import { getOrCreateDaily } from "../../util/daily";

const mapGetDaily = (server: Application) => {
  server.post(
    "/api/daily",
    isAuthenticated,
    [body("teamId").isMongoId(), body("date").isISO8601().toDate()],
    (req: Request, res: ApiResponse) => {
      const daily = getOrCreateDaily(req.body.teamId, req.body.date);

      return res.populate(daily);
    }
  );
};

export default mapGetDaily;
