import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError.ts";

export class AuthError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
