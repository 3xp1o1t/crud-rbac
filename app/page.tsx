import prismaRbac from '@/lib/rbac-prisma';

export default async function Home() {
  const tasks = await prismaRbac.task.findMany();
  return (
    <div>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}
