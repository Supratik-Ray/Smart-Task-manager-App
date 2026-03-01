import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import env from "./env.ts";
import * as schema from "../db/schema/index.ts";

const sql = neon(env.DATABASE_URL);
const db = drizzle({ client: sql, schema, logger: true });

export default db;
