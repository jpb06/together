import { NextFunction, Request } from "express";

import { ApiResponse } from "../types/api.response.type";

export default function ErrorHandler(
  err: any,
  req: Request,
  res: ApiResponse,
  next: NextFunction
) {
  console.log("error", err);
  res.answer(err.status ? err.status : 500, `Error: ${err}`);
}
