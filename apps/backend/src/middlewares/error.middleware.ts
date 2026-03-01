import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError.ts";
import { StatusCodes } from "http-status-codes";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error);

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Some error occured! Please try again later",
  });
}
