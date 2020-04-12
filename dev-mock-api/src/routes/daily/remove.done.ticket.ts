import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getOrCreateDaily } from "../../util/daily";
import { updateDaily } from "../../dbase/update.mock.db";

const mapRemoveDoneTicket = (server: Application) => {
  server.post(
    "/api/daily/done/remove",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isString().toDate(),
      body("ticket").isString().not().isEmpty(),
    ],
    (req: Request, res: Response) => {
      const daily = getOrCreateDaily(req.body.teamId, req.body.date);
      daily.doneTickets = daily.doneTickets.filter(
        (el) => el.name !== req.body.ticket
      );
      updateDaily(daily);

      return res.answer(200, `${req.body.ticket} deleted`);
    }
  );
};

export default mapRemoveDoneTicket;