import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { DialogTitle } from '@radix-ui/react-dialog';
import { PencilIcon } from 'lucide-react';
import DeleteTaskButton from './delete-task-button';
import TaskForm from './forms/tasks-form';
import { Button } from './ui/button';

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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{task.description || ''}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>
              {new Date(task.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(task.updatedAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <PencilIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Edit Task</DialogTitle>
                  <DialogHeader>
                    <TaskForm task={task} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <DeleteTaskButton taskId={task.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
