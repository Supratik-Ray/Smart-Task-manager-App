import { Response } from "express";

type SendResponse<T> = {
  res: Response;
  statusCode: number;
  message?: string;
  data?: T;
};

export function sendResponse<T>({
  res,
  statusCode,
  message,
  data,
}: SendResponse<T>) {
  res.status(statusCode).json({
    success: true,
    ...(message ? { message } : {}),
    ...(data ? { data } : {}),
  });
}
