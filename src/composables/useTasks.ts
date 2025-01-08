import { reactive, computed } from 'vue'

import { getTasks, createTask, updateTask, deleteTask } from '@/repositories/tasks.repository'

import type { TaskItems, TaskItem } from '@/types/task-item'

interface TasksState {
    tasks: TaskItems,
    tasksTotal: number,
    loading: boolean
}

const state = reactive<TasksState>({
    tasks: [],
    tasksTotal: 0,
    loading: false
})

const useTasks = () => {
    const tasks = computed(() => state.tasks)
    const tasksTotal = computed(() => state.tasksTotal)
    const tasksLoading = computed(() => state.loading)

    const handleGetTasks = async (page: number, limit: number) => {
        try {
            state.loading = true
            const { todos, total } = await getTasks(page, limit)
            state.tasks = todos
            state.tasksTotal = total

            return todos
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            state.loading = false
        }
    }

    const handleCreateTask = async (task: Omit<TaskItem, 'id'>): Promise<TaskItem> => {
        try {
            const newTask = await createTask(task)
            state.tasks = [newTask, ...(state.tasks.slice(0, state.tasks.length - 1))]

            return newTask
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const handleUpdateTaskCompleted = async (task: TaskItem) => {
        try {
            const updatedTask = await updateTask(task)
            state.tasks = state.tasks.map((task) => task.id === updatedTask.id ? updatedTask : task)

            return updatedTask
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const handleDeleteTask = async (task: TaskItem): Promise<void> => {
        try {
            await deleteTask(task.id)
            state.tasks = state.tasks.filter((t) => t.id !== task.id)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    return {
        tasks,
        tasksTotal,
        tasksLoading,
        handleGetTasks,
        handleCreateTask,
        handleUpdateTaskCompleted,
        handleDeleteTask
    }
}

export default useTasks
