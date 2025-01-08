<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useLocalStorage, watchDebounced } from '@vueuse/core';

import CreateTaskForm from '@/components/CreateTaskForm.vue';
import TaskItemsList from '@/components/TaskItemsList.vue';
import TaskItemCard from '@/components/TaskItemCard.vue';

import type { TaskItem } from '@/types/task-item';

import useTasks from '@/composables/useTasks';

const { tasks, tasksTotal, tasksLoading, handleGetTasks, handleCreateTask, handleUpdateTaskCompleted, handleDeleteTask } = useTasks();

const page = ref<number>(1);
const pageSize = useLocalStorage<number>('page-size', 10);

const disabledTasks = reactive<Record<string, boolean>>({});

const onFetchData = async () => {
  handleGetTasks(page.value, pageSize.value);
}

const onCreateTask = async (payload: { todo: string }) => {
  await handleCreateTask({  ...payload, completed: false });
}

const onUpdateTask = async (task: TaskItem) => {
  disabledTasks[task.id] = true;
  await handleUpdateTaskCompleted(task);
  delete disabledTasks[task.id];
}

const onDeleteTask = async (task: TaskItem) => {
  disabledTasks[task.id] = true;
  await handleDeleteTask(task);
  delete disabledTasks[task.id];

  onFetchData();
}

onFetchData()

watchDebounced([page, pageSize], onFetchData, { debounce: 300 });
</script>

<template>
  <v-container>
    <CreateTaskForm
      class="mb-4"
      :on-create="onCreateTask"
    />

    <TaskItemsList
      :items="tasks"
      :loading="tasksLoading"
      class="mb-4"
    >
      <template #default="{ item }">
        <TaskItemCard
          :item="item"
          :disabled="disabledTasks[item.id]"
          @update="onUpdateTask"
          @delete="onDeleteTask"
        />
      </template>
    </TaskItemsList>

    <div class="w-100 d-flex justify-space-between">
      <v-select
        v-model="pageSize"
        :items="[10, 20, 30]"
        label="Page Size"
        variant="outlined"
        density="compact"
        max-width="100"
        hide-details
      />
      <v-pagination
        v-model="page"
        :length="Math.ceil(tasksTotal / pageSize)"
        :total-visible="5"
        density="compact"
      />
    </div>
  </v-container>
</template>
