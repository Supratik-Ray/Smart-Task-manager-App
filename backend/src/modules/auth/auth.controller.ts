import { Request, Response } from "express";
import { createToken, login, signup } from "./auth.service.ts";
import { sendResponse } from "../../utils/apiResponse.ts";

export async function loginController(req: Request, res: Response) {
  const user = await login(req.body);
  const token = createToken({ id: user.id });
  sendResponse({
    res,
    statusCode: 200,
    message: "Successfully logged in!",
    data: { user, token },
  });
}

export async function signupController(req: Request, res: Response) {
  const newUser = await signup(req.body);
  const token = createToken({ id: newUser.id });
  sendResponse({
    res,
    statusCode: 201,
    message: "Successfully created user!",
    data: { user: newUser, token },
  });
}
