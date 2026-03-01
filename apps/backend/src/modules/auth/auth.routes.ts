import express from "express";
import { loginController, signupController } from "./auth.controller.ts";
import { validate } from "../../middlewares/validation.middleware.ts";
import { loginSchema, signupSchema } from "@smart-task-manager/shared";

const router = express.Router();

router.route("/login").post(validate(loginSchema, "body"), loginController);
router.route("/signup").post(validate(signupSchema, "body"), signupController);

export default router;
