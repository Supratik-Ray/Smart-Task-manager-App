"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email("Its not a valid email"),
    password: zod_1.z.string(),
});
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "name must be minimum 2 characters long"),
    email: zod_1.z.email("Its not a valid email"),
    password: zod_1.z.string().min(4, "password must be minimum 4 characters long"),
});
