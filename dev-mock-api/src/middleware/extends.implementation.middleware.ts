import { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../types/api.response.type";

export default function extendsImplementation(
  req: Request,
  res: ApiResponse,
  next: NextFunction
) {
  // ----------------------------------------------------------------------------------------------
  // Response extends
  // ----------------------------------------------------------------------------------------------
  res.populate = function (data: any): ApiResponse {
    if (data === undefined) {
      return res.status(404).json(null);
    } else {
      return res.status(200).json(data);
    }
  };
  res.answer = function (status: number, data: any): ApiResponse {
    return res.status(status).json(data);
  };
  res.terminate = function (status: number, message: string): void {
    res.writeHead(status, { Connection: "close" });
    res.end(message);
  };

  next();
}
