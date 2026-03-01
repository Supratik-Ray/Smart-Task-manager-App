import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

export function validate<T>(
  schema: z.ZodType<T>,
  type: "body" | "params" | "query",
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data =
      type === "body" ? req.body : type === "params" ? req.params : req.query;

    const result = schema.safeParse(data);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        const field = issue.path.join(".");
        return field ? `${field} ${issue.message}` : issue.message;
      });

      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: errors[0],
        errors,
      });
    }

    if (type === "body") req.body = result.data;
    if (type === "params") req.params = result.data as any;
    if (type === "query") req.query = result.data as any;

    next();
  };
}
