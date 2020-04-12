import { Request, Response, NextFunction } from "express";

export default function ErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("error", err);
  res.status(500).send(`Error: ${err}`);
}
