import db from "../config/db.ts";
import { TaskPriority, TaskStatus } from "../types/task.types.ts";
import { userTable, taskTable } from "./schema/index.ts";

import { hash } from "bcryptjs";

async function main() {
  // Clean up previous seed
  await db.delete(taskTable);
  await db.delete(userTable);

  // Create a user
  const password = await hash("password123", 10);
  const [user] = await db
    .insert(userTable)
    .values({
      name: "Demo User",
      email: "demo@example.com",
      passwordHash: password,
    })
    .returning();

  // Create some tasks for the user
  const now = new Date();
  // Generate 30 tasks with a mix of statuses, priorities, and due dates (some before, some today, some after)
  const priorities: TaskPriority[] = ["LOW", "MEDIUM", "HIGH"];
  const statuses: TaskStatus[] = ["TODO", "IN_PROGRESS", "COMPLETED"];
  const descriptions = [
    "Resolve padding issue on smaller devices.",
    "Replace placeholder icon with final version.",
    "Implement date selection and marked dates.",
    "Organize folders and create base components.",
    "Install navigation, gesture handler and libs.",
    "Write unit tests for task service.",
    "Refactor authentication logic.",
    "Update README documentation.",
    "Fix bug in calendar sync.",
    "Optimize database queries.",
    "Design analytics dashboard.",
    "Add user profile editing.",
    "Improve error handling.",
    "Set up CI/CD pipeline.",
    "Integrate push notifications.",
    "Polish UI for mobile.",
    "Add dark mode support.",
    "Review code for security.",
    "Update dependencies.",
    "Test on multiple devices.",
    "Add onboarding screens.",
    "Implement search feature.",
    "Fix scroll performance.",
    "Add recurring tasks.",
    "Improve accessibility.",
    "Add calendar export.",
    "Implement reminders.",
    "Add comments to tasks.",
    "Enable multi-user support.",
    "Polish animations.",
  ];

  // Today at midnight
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const tasks = Array.from({ length: 30 }).map((_, i) => {
    // Spread due dates: 10 before today, 10 today, 10 after today
    let dueDate;
    if (i < 10) {
      dueDate = new Date(today.getTime() - (10 - i) * 24 * 60 * 60 * 1000);
    } else if (i < 20) {
      dueDate = new Date(today);
    } else {
      dueDate = new Date(today.getTime() + (i - 19) * 24 * 60 * 60 * 1000);
    }
    return {
      name: `Task ${i + 1}`,
      description: descriptions[i % descriptions.length],
      status: statuses[i % statuses.length],
      priority: priorities[i % priorities.length],
      dueDate,
      userId: user.id,
    };
  });

  await db.insert(taskTable).values(tasks);

  console.log("Seed complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
