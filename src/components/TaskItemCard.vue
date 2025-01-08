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
  (event: 'update', task: TaskItem): void,
  (event: 'delete', task: TaskItem): void,
}>();

const onUpdateCompleted = (completed: boolean | null) => {
  emit('update', {
    ...props.item,
    completed: Boolean(completed),
  });
};

const onDeleteTask = () => {
  emit('delete', props.item);
};
</script>

<template>
  <v-card
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
        @update:model-value="onUpdateCompleted"
      />
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            icon="mdi-dots-vertical"
            variant="text"
            v-bind="props"
          />
        </template>

        <v-list>
          <v-list-item @click="onDeleteTask">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
