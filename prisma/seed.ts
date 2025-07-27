// seeding for tasks
import { Prisma, PrismaClient } from '@/lib/rbac-db/prisma';

const prisma = new PrismaClient();

export async function main() {
  const tasks: Prisma.TaskCreateInput[] = [
    {
      title: 'Task 1',
      description: 'Description for Task 1',
      status: 'pending',
    },
    {
      title: 'Task 2',
      description: 'Description for Task 2',
      status: 'in-progress',
    },
    {
      title: 'Task 3',
      description: 'Description for Task 3',
      status: 'completed',
    },
  ];

  for (const task of tasks) {
    await prisma.task.create({ data: task });
  }

  console.log('Tasks seeded successfully.');
}

main();
