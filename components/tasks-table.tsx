import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getTasks } from '@/server/tasks';

export const TaskTable = async () => {
  const tasks = await getTasks();
  return (
    <Table>
      <TableCaption>A list of your recent tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{task.description || 'No description'}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>
              {new Date(task.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(task.updatedAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
