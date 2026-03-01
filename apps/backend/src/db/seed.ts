import db from "../config/db.ts";
import { TaskPriority, TaskStatus } from "../types/task.types.ts";
import { userTable, taskTable } from "./schema/index.ts";
import { hash } from "bcryptjs";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  await db.delete(taskTable);
  await db.delete(userTable);

  // create user
  const password = await hash("password123", 10);
  const [user] = await db
    .insert(userTable)
    .values({
      name: "Demo User",
      email: "demo@example.com",
      passwordHash: password,
    })
    .returning();

  const priorities: TaskPriority[] = ["LOW", "MEDIUM", "HIGH"];
  const statuses: TaskStatus[] = ["TODO", "IN_PROGRESS", "COMPLETED"];

  const descriptions = [
    "Resolve layout bug",
    "Improve performance",
    "Refactor component",
    "Write tests",
    "Fix API issue",
    "Add animations",
    "Clean code",
    "Update UI",
    "Handle edge cases",
    "Optimize query",
  ];

  const now = new Date();

  const tasks = Array.from({ length: 60 }).map((_, i) => {
    // random day offset from today (-20 → +20)
    const dayOffset = randomInt(-20, 20);

    const dueDate = new Date(now);
    dueDate.setDate(now.getDate() + dayOffset);

    // randomize time of day
    dueDate.setHours(randomInt(0, 23), randomInt(0, 59), randomInt(0, 59), 0);

    // realistic status logic
    let status: TaskStatus;

    if (dayOffset < 0) {
      // past tasks mostly completed
      status =
        Math.random() < 0.7 ? "COMPLETED" : randomItem(["TODO", "IN_PROGRESS"]);
    } else if (dayOffset === 0) {
      // today tasks mixed
      status = randomItem(statuses);
    } else {
      // future tasks mostly todo
      status =
        Math.random() < 0.7 ? "TODO" : randomItem(["IN_PROGRESS", "COMPLETED"]);
    }

    return {
      name: `Task ${i + 1}`,
      description: randomItem(descriptions),
      status,
      priority: randomItem(priorities),
      dueDate,
      userId: user.id,
    };
  });

  await db.insert(taskTable).values(tasks);

  console.log("🌱 Seed complete with realistic data!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
