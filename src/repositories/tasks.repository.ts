import { get, post, put, del } from './http';

import type { TaskItem, TaskItems } from '@/types/task-item'

export const getTasks = async (
    page: number,
    limit: number
) => {
    const params = new URLSearchParams({
        limit: limit.toString(),
        skip: ((page - 1) * limit).toString(),
    });
    return get<{
        todos: TaskItems,
        total: number
    }>(`/todos?${params.toString()}`);
};

export const createTask = async (task: Omit<TaskItem, 'id'>) => {
    return post<TaskItem>('/todos/add', { ...task, userId: 1 });
};

export const updateTask = async (task: TaskItem) => {
    return put<TaskItem>(`/todos/${task.id}`, { completed: task.completed });
};

export const deleteTask = async (taskId: TaskItem['id']) => {
    return del<void>(`/todos/${taskId}`);
};
