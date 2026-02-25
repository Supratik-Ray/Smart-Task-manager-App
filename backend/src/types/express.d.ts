import { UserPayload } from "./auth.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
