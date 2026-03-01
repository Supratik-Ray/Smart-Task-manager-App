import { Request, Response } from "express";
import { createToken, getUserInfo, login, signup } from "./auth.service";
import { sendResponse } from "../../utils/apiResponse";
import { StatusCodes } from "http-status-codes";

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

export async function getUserInfoController(req: Request, res: Response) {
  const userInfo = await getUserInfo(req.user!.id);
  sendResponse({ res, statusCode: StatusCodes.OK, data: userInfo });
}
