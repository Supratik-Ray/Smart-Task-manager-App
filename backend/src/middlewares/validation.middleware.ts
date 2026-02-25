import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export function validate(schema: z.ZodType, type: "body" | "params" | "query") {
  return (req: Request, res: Response, next: NextFunction) => {
    let data;
    if (type === "body") {
      data = req.body;
    }
    if (type === "params") {
      data = req.params;
    }

    if (type === "query") {
      data = req.query;
    }

    const result = schema.safeParse(data);

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
