import { Request, Response, NextFunction } from "express";

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
      return res.status(404).json({
        status: 404,
        data: null,
      });
    } else {
      return res.status(200).json({
        status: 200,
        data,
      });
    }
  };
  res.answer = function (status: number, message: string): Response {
    return res.status(status).json({
      status,
      message,
    });
  };
  res.terminate = function (status: number, message: string): void {
    res.writeHead(status, { Connection: "close" });
    res.end(message);
  };

  next();
}
