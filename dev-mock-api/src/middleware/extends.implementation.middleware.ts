import { NextFunction, Request, Response } from "express";

export default function extendsImplementation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // ----------------------------------------------------------------------------------------------
  // Response extends
  // ----------------------------------------------------------------------------------------------
  res.populate = function (data: any): Response {
    if (data === undefined) {
      return res.status(404).json(null);
    } else {
      return res.status(200).json(data);
    }
  };
  res.answer = function (status: number, data: any): Response {
    return res.status(status).json(data);
  };
  res.terminate = function (status: number, message: string): void {
    res.writeHead(status, { Connection: "close" });
    res.end(message);
  };

  next();
}
