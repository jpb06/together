import { NextFunction, Request, Response } from "express";

export default function ErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("error", err);
  res.answer(err.status ? err.status : 500, `Error: ${err}`);
}
