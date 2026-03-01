import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError.ts";

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}
