'use server';

import { Task } from '@/lib/rbac-db/prisma';
import prismaRbac from '@/lib/rbac-prisma';

export async function getTasks() {
  try {
    return await prismaRbac.task.findMany();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
}

export async function createTask(
  taskData: Omit<Task, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
) {
  try {
    return await prismaRbac.task.create({
      data: {
        ...taskData,
        status: 'pending',
      },
    });
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
}

export async function updateTask(
  id: string,
  taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
) {
  try {
    return await prismaRbac.task.update({
      where: { id },
      data: taskData,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');
  }
}

export async function deleteTask(id: string) {
  try {
    return await prismaRbac.task.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
}
