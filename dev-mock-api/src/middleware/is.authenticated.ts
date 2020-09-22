import { NextFunction, Request } from "express";

import { ApiResponse } from "../types/api.response.type";

const getPayloadFromHeaders = (req: Request, res: ApiResponse): string => {
  const authorizationHeaders = req.headers.authorization || "";
  const chunks = authorizationHeaders.split(" ");

  if (chunks.length === 0 || chunks[0] !== "Bearer" || chunks[1].length === 0) {
    return "";
  }

  return chunks[1];
};

export default function isAuthenticated(
  req: Request,
  res: ApiResponse,
  next: NextFunction
) {
  try {
    const token = getPayloadFromHeaders(req, res);
    if (token === "") {
      return res.answer(401, "Not logged in");
    }

    res.locals.email = token;

    next();
  } catch (error) {
    return res.answer(500, error.message);
  }
}
