import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError";

export class AuthError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
