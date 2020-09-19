import { Application, Request } from "express";
import { body } from "express-validator";

import { persistDaily } from "../../dbase/update.mock.db";
import isAuthenticated from "../../middleware/is.authenticated";
import { ApiResponse } from "../../types/api.response.type";
import { getOrCreateDaily } from "../../util/daily";

const mapRemoveUnforeseenTicket = (server: Application) => {
  server.post(
    "/api/daily/unforeseen/remove",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isISO8601().toDate(),
      body("ticket").isString().not().isEmpty(),
    ],
    (req: Request, res: ApiResponse) => {
      const daily = getOrCreateDaily(req.body.teamId, req.body.date);
      daily.unforeseenTickets = daily.unforeseenTickets.filter(
        (el) => el.name !== req.body.ticket
      );
      persistDaily(daily);

      return res.answer(200, req.body.ticket);
    }
  );
};

export default mapRemoveUnforeseenTicket;
