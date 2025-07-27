'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Task } from '@/lib/rbac-db/prisma';
import { createTask, updateTask } from '@/server/tasks';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(200).optional(),
});

interface TaskFormProps {
  task?: Task;
}

const TaskForm = ({ task }: TaskFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (task) {
        await updateTask({
          ...values,
          id: task.id,
          status: 'pending',
          description: values.description ?? null,
        });
      } else {
        await createTask({
          ...values,
          description: values.description ?? null,
        });
      }
      form.reset();
      toast.success(`Task ${task ? 'updated' : 'added'} successfully!`);
      setIsLoading(false);
      router.refresh();
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error(
        `Failed to ${task ? 'update' : 'add'} task. Please try again.`,
      );
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Buy a cat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="I want a friend on my life" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            `${task ? 'Update' : 'Create'} Task`
          )}
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;
