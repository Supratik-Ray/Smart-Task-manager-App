import { eq } from "drizzle-orm";
import db from "../../config/db.ts";
import { LoginInput, SignupInput } from "./auth.validation.ts";
import { userTable } from "../../db/schema/user.schema.ts";
import { AuthError } from "../../errors/AuthError.ts";
import bcrypt from "bcryptjs";
import { ApiError } from "../../errors/ApiError.ts";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import env from "../../config/env.ts";

type User = {
  id: string;
  name: string;
  email: string;
};

export async function login(data: LoginInput): Promise<User> {
  //check if user with this email exists
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, data.email),
  });

  if (!user) throw new AuthError("Invalid credentials");

  //check if password match
  const isMatch = await bcrypt.compare(data.password, user.passwordHash);

  if (!isMatch) throw new AuthError("Invalid credentials");

  return { id: user.id, name: user.name, email: user.email };
}

export async function signup(data: SignupInput): Promise<User> {
  //check if email already exists

  const emailExists = await db.query.userTable.findFirst({
    where: eq(userTable.email, data.email),
  });

  if (emailExists) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "user with this email already exists!",
    );
  }

  //create password hash
  const salt = 10;
  const passwordHash = await bcrypt.hash(data.password, salt);

  //save to db
  const [newUser] = await db
    .insert(userTable)
    .values({ name: data.name, email: data.email, passwordHash })
    .returning({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
    });

  return newUser;
}

export function createToken(payload: User) {
  const secret = env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "7d" });
  return token;
}
