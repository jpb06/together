import { Request, Response, NextFunction } from "express";

export default function NoRouteErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = `No route for request ${req.url} (${req.method})`;

  console.log(message);
  res.status(404).send(message);
}
