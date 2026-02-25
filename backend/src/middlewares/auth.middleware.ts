import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/env.ts";
import { AuthError } from "../errors/AuthError.ts";
import { UserPayload } from "../types/auth.types.ts";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  //check if Bearer token exists
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    //check if token is valid
    try {
      const payload = jwt.verify(token, env.JWT_SECRET);
      req.user = payload as UserPayload;
      return next();
    } catch (error) {
      throw new AuthError("Invalid or expired token!");
    }
  }
  //if token doesnt exists
  throw new AuthError("token not found in auth header!");
}
