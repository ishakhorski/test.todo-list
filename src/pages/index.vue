<script lang="ts" setup>
import { reactive, ref } from 'vue';

import TaskItemsList from '@/components/TaskItemsList.vue';
import TaskItemCard from '@/components/TaskItemCard.vue';

import type { TaskItem } from '@/types/task-item';

import useTasks from '@/composables/useTasks';

const { tasks, tasksLoading, handleGetTasks, handleUpdateTask } = useTasks();

const page = ref(1);
const pageSize = ref(10);

const disabledTasks = reactive<Record<string, boolean>>({});

const onFetchData = async () => {
  handleGetTasks(page.value, pageSize.value);
}

const onUpdateTask = (task: TaskItem) => {
  disabledTasks[task.id] = true;
  handleUpdateTask(task);
  delete disabledTasks[task.id];
}

onFetchData()
</script>

<template>
  <v-container>
    <TaskItemsList
      :items="tasks"
      :loading="tasksLoading"
    >
      <template #default="{ item }">
        <TaskItemCard
          :item="item"
          :disabled="disabledTasks[item.id]"
          @update="onUpdateTask"
        />
      </template>
    </TaskItemsList>
  </v-container>
</template>
