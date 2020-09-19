import { NextFunction, Request } from "express";

import { ApiResponse } from "../types/api.response.type";

export default function NoRouteErrorHandler(
  err: any,
  req: Request,
  res: ApiResponse,
  next: NextFunction
) {
  const message = `No route for request ${req.url} (${req.method})`;

  console.log(message);
  res.status(404).send(message);
}
