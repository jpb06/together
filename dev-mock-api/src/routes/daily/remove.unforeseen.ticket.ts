import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getOrCreateDaily } from "../../util/daily";
import { persistDaily } from "../../dbase/update.mock.db";

const mapRemoveUnforeseenTicket = (server: Application) => {
  server.post(
    "/api/daily/unforeseen/remove",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isISO8601().toDate(),
      body("ticket").isString().not().isEmpty(),
    ],
    (req: Request, res: Response) => {
      const daily = getOrCreateDaily(req.body.teamId, req.body.date);
      daily.unforeseenTickets = daily.unforeseenTickets.filter(
        (el) => el.name !== req.body.ticket
      );
      persistDaily(daily);

      return res.answer(200, `${req.body.ticket} deleted`);
    }
  );
};

export default mapRemoveUnforeseenTicket;
