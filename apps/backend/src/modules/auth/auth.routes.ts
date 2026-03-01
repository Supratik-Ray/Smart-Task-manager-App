import express from "express";
import {
  getUserInfoController,
  loginController,
  signupController,
} from "./auth.controller";
import { validate } from "../../middlewares/validation.middleware";
import { loginSchema, signupSchema } from "@smart-task-manager/shared";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = express.Router();

router.route("/login").post(validate(loginSchema, "body"), loginController);
router.route("/signup").post(validate(signupSchema, "body"), signupController);
router.route("/me").get(requireAuth, getUserInfoController);

export default router;
