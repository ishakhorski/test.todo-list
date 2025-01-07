<script setup lang="ts">
import type { TaskItem } from '@/types/task-item';

const props = withDefaults(
  defineProps<{
    item: TaskItem,
    disabled: boolean,
  }>(),
  { 
    disabled: false,
  }
)

const emit = defineEmits<{
  (event: 'update', task: TaskItem): void
}>();

const updateCompleted = (completed: boolean | null) => {
  emit('update', {
    ...props.item,
    completed: Boolean(completed),
  });
};
</script>

<template>
  <v-card
    density="compact"
    :loading="props.disabled"
    class="task-item"
    :class="{ 'task-item--completed': props.item.completed }"
  >
    <v-card-text class="task-item__text">
      {{ props.item.todo }}
    </v-card-text>
    <v-card-actions class="task-item__actions">
      <v-checkbox
        :model-value="props.item.completed"
        :disabled="props.disabled"
        hide-details
        @update:model-value="updateCompleted"
      />
    </v-card-actions>
  </v-card>
</template>

<style lang="scss">
.v-card.task-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .task-item__text {
    flex: 1;
  }
}
.v-card.task-item--completed {
  .task-item__text {
    text-decoration: line-through;
  }
}
</style>
