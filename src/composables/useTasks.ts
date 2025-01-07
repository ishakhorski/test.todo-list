import { reactive, computed } from 'vue'

import { getTasks, updateTask } from '@/repositories/tasks.repository'

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

    const handleGetTasks = async (page: number, limit: number): Promise<TaskItems> => {
        try {
            state.loading = true
            const { todos, total } = await getTasks(page, limit)
            state.tasks = todos
            state.tasksTotal = total

            return todos
        } catch (error) {
            console.error(error)
        } finally {
            state.loading = false
        }
    }

    const handleUpdateTask = async (task: TaskItem): Promise<TaskItem> => {
        try {
            const updatedTask = await updateTask(task)
            state.tasks = state.tasks.map((task) => task.id === updatedTask.id ? updatedTask : task)

            return updatedTask
        } catch (error) {
            console.error(error)
        }
    }

    return { tasks, tasksTotal, tasksLoading, handleGetTasks, handleUpdateTask }
}

export default useTasks
