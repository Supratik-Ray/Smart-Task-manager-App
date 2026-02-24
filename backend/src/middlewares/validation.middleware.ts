import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      let errorObj: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        errorObj[issue.path[0] as string] = issue.message;
      });

      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Validation error!",
        error: errorObj,
      });
    }

    req.body = result.data;

    next();
  };
}
