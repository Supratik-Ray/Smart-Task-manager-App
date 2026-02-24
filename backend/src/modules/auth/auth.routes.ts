import express from "express";
import { loginController, signupController } from "./auth.controller.ts";
import { validate } from "../../middlewares/validation.middleware.ts";
import { loginSchema, signupSchema } from "./auth.validation.ts";

const router = express.Router();

router.route("/login").post(validate(loginSchema), loginController);
router.route("/signup").post(validate(signupSchema), signupController);

export default router;
