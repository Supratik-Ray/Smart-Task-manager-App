import express from "express";
import {
  getUserInfoController,
  loginController,
  signupController,
} from "./auth.controller.ts";
import { validate } from "../../middlewares/validation.middleware.ts";
import { loginSchema, signupSchema } from "@smart-task-manager/shared";
import { requireAuth } from "../../middlewares/auth.middleware.ts";

const router = express.Router();

router.route("/login").post(validate(loginSchema, "body"), loginController);
router.route("/signup").post(validate(signupSchema, "body"), signupController);
router.route("/me").get(requireAuth, getUserInfoController);

export default router;
